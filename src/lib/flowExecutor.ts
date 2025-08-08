import { FlowNode, FlowConnection } from '@/components/FlowBuilder';
import { GeminiService, ToolService } from './apiServices';

export interface FlowExecution {
  id: string;
  flowId: string;
  status: 'running' | 'completed' | 'error';
  input: any;
  output?: any;
  error?: string;
  createdAt: string;
}

export interface FlowExecutionStep {
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  input?: any;
  output?: any;
  error?: string;
}

export class FlowExecutor {
  private nodes: FlowNode[];
  private connections: FlowConnection[];
  private execution: FlowExecution;
  private steps: Map<string, FlowExecutionStep> = new Map();
  private onStatusUpdate?: (steps: FlowExecutionStep[]) => void;

  constructor(
    nodes: FlowNode[], 
    connections: FlowConnection[], 
    input: any,
    onStatusUpdate?: (steps: FlowExecutionStep[]) => void
  ) {
    this.nodes = nodes;
    this.connections = connections;
    this.onStatusUpdate = onStatusUpdate;
    this.execution = {
      id: `exec_${Date.now()}`,
      flowId: `flow_${Date.now()}`,
      status: 'running',
      input,
      createdAt: new Date().toISOString()
    };

    // Initialize steps
    this.nodes.forEach(node => {
      this.steps.set(node.id, {
        nodeId: node.id,
        status: 'pending'
      });
    });
  }

  async execute(): Promise<FlowExecution> {
    try {
      // Find input nodes (nodes with no incoming connections)
      const inputNodes = this.nodes.filter(node => 
        !this.connections.some(conn => conn.target === node.id)
      );

      if (inputNodes.length === 0) {
        throw new Error('No input nodes found');
      }

      // Start execution from input nodes
      for (const inputNode of inputNodes) {
        await this.executeNode(inputNode, this.execution.input);
      }

      this.execution.status = 'completed';
      return this.execution;

    } catch (error) {
      this.execution.status = 'error';
      this.execution.error = error instanceof Error ? error.message : 'Unknown error';
      return this.execution;
    }
  }

  private async executeNode(node: FlowNode, input: any): Promise<any> {
    const step = this.steps.get(node.id);
    if (!step) return null;

    try {
      step.status = 'running';
      step.input = input;
      this.updateStatus();

      let output: any;

      switch (node.type) {
        case 'input':
          output = await this.executeInputNode(node, input);
          break;
        case 'llm':
          output = await this.executeLLMNode(node, input);
          break;
        case 'output':
          output = await this.executeOutputNode(node, input);
          break;
        case 'tool':
          output = await this.executeToolNode(node, input);
          break;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }

      step.status = 'completed';
      step.output = output;
      this.updateStatus();

      // Execute connected nodes
      const connectedNodes = this.getConnectedNodes(node.id);
      for (const connectedNode of connectedNodes) {
        await this.executeNode(connectedNode, output);
      }

      return output;

    } catch (error) {
      step.status = 'error';
      step.error = error instanceof Error ? error.message : 'Unknown error';
      this.updateStatus();
      throw error;
    }
  }

  private async executeInputNode(node: FlowNode, input: any): Promise<any> {
    // For input nodes, just pass through the input
    await this.delay(500); // Simulate processing time
    return input;
  }

  private async executeLLMNode(node: FlowNode, input: any): Promise<any> {
    try {
      const response = await GeminiService.processText(
        typeof input === 'string' ? input : JSON.stringify(input),
        node.data.config || {}
      );

      return response;
    } catch (error) {
      console.error('LLM Node Error:', error);
      throw new Error(`Failed to process with Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async executeOutputNode(node: FlowNode, input: any): Promise<any> {
    // For output nodes, format and return the input
    await this.delay(200);
    const output = {
      result: input,
      timestamp: new Date().toISOString(),
      nodeId: node.id
    };
    
    // Set final execution output
    this.execution.output = output;
    return output;
  }

  private async executeToolNode(node: FlowNode, input: any): Promise<any> {
    const toolType = node.data.config?.toolType || 'web-search';
    
    try {
      let result: any;

      switch (toolType) {
        case 'web-search':
          result = await ToolService.executeWebSearch(typeof input === 'string' ? input : JSON.stringify(input));
          break;
        case 'database':
          result = await ToolService.executeDatabaseQuery(typeof input === 'string' ? input : JSON.stringify(input));
          break;
        case 'api':
          result = await ToolService.executeApiCall(typeof input === 'string' ? input : JSON.stringify(input), node.data.config);
          break;
        default:
          throw new Error(`Unknown tool type: ${toolType}`);
      }

      return result;
    } catch (error) {
      console.error('Tool Node Error:', error);
      throw new Error(`Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getConnectedNodes(nodeId: string): FlowNode[] {
    const connectedNodeIds = this.connections
      .filter(conn => conn.source === nodeId)
      .map(conn => conn.target);
    
    return this.nodes.filter(node => connectedNodeIds.includes(node.id));
  }

  private updateStatus() {
    if (this.onStatusUpdate) {
      this.onStatusUpdate(Array.from(this.steps.values()));
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}