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
    console.log(`Executing node: ${node.id} (${node.type})`);
    
    // Update step status
    const step = this.steps.get(node.id)!;
    step.status = 'running';
    step.input = input;
    this.updateStatus();

    try {
      let result: any;

      switch (node.type) {
        case 'input':
          result = await this.executeInputNode(node, input);
          break;
        case 'llm':
        case 'sentiment':
        case 'entity-extraction':
        case 'keyword-extraction':
        case 'text-classification':
        case 'blog-writer':
        case 'email-composer':
        case 'social-media':
        case 'summary-generator':
        case 'translator':
        case 'grammar-checker':
        case 'style-enhancer':
        case 'code-generator':
        case 'code-reviewer':
        case 'bug-finder':
        case 'documentation':
        case 'chatbot':
        case 'customer-support':
        case 'sales-assistant':
          result = await this.executeLLMNode(node, input);
          break;
        case 'output':
          result = await this.executeOutputNode(node, input);
          break;
        case 'tool':
        case 'web-search':
        case 'database':
        case 'api-call':
        case 'calculator':
          result = await this.executeToolNode(node, input);
          break;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }

      step.status = 'completed';
      step.output = result;
      this.updateStatus();

      // Execute connected nodes
      const connectedNodes = this.getConnectedNodes(node.id);
      for (const connectedNode of connectedNodes) {
        await this.executeNode(connectedNode, result);
      }

      return result;

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
    // Configure prompt based on node type
    let prompt = 'You are a helpful AI assistant. Process the following input and provide a useful response.';
    
    switch (node.type) {
      case 'sentiment':
        prompt = 'Analyze the sentiment of the following text. Return only the sentiment (positive, negative, or neutral) with a confidence score.';
        break;
      case 'entity-extraction':
        prompt = 'Extract all named entities (people, places, organizations, etc.) from the following text. Return them in a structured format.';
        break;
      case 'keyword-extraction':
        prompt = 'Extract the most important keywords and phrases from the following text. Return them ranked by importance.';
        break;
      case 'text-classification':
        prompt = 'Classify the following text into appropriate categories. Provide the category and confidence level.';
        break;
      case 'blog-writer':
        prompt = 'Write a comprehensive blog post about the following topic. Include an engaging title, introduction, main content, and conclusion.';
        break;
      case 'email-composer':
        prompt = 'Compose a professional email about the following topic. Include appropriate subject line, greeting, body, and closing.';
        break;
      case 'social-media':
        prompt = 'Create engaging social media posts about the following topic. Include hashtags and call-to-action.';
        break;
      case 'summary-generator':
        prompt = 'Create a concise summary of the following text. Capture the key points and main ideas.';
        break;
      case 'translator':
        prompt = 'Translate the following text to the target language. Maintain the original meaning and tone.';
        break;
      case 'grammar-checker':
        prompt = 'Check and correct any grammar, spelling, or punctuation errors in the following text.';
        break;
      case 'style-enhancer':
        prompt = 'Improve the writing style and tone of the following text. Make it more engaging and professional.';
        break;
      case 'code-generator':
        prompt = 'Generate clean, well-documented code based on the following requirements. Include comments and best practices.';
        break;
      case 'code-reviewer':
        prompt = 'Review the following code and provide suggestions for improvement. Focus on best practices, performance, and readability.';
        break;
      case 'bug-finder':
        prompt = 'Analyze the following code for potential bugs, errors, or security issues. Provide detailed explanations.';
        break;
      case 'documentation':
        prompt = 'Generate comprehensive documentation for the following code or feature. Include usage examples.';
        break;
      case 'chatbot':
        prompt = 'You are a helpful chatbot. Respond to the following user message in a friendly and informative manner.';
        break;
      case 'customer-support':
        prompt = 'You are a customer support agent. Provide helpful and professional assistance for the following customer inquiry.';
        break;
      case 'sales-assistant':
        prompt = 'You are a sales assistant. Help the customer with their inquiry and guide them towards a positive outcome.';
        break;
    }

    const config = {
      prompt,
      temperature: node.data.config?.temperature || 0.7,
      maxTokens: node.data.config?.maxTokens || 1024,
      ...node.data.config
    };

    const result = await GeminiService.processText(typeof input === 'string' ? input : JSON.stringify(input), config);
    return result;
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
    let toolType = 'web-search';
    
    // Determine tool type from node type or config
    switch (node.type) {
      case 'web-search':
        toolType = 'web-search';
        break;
      case 'database':
        toolType = 'database';
        break;
      case 'api-call':
        toolType = 'api';
        break;
      case 'calculator':
        toolType = 'calculator';
        break;
      case 'tool':
        toolType = node.data.config?.toolType || 'web-search';
        break;
    }
    
    try {
      let result: any;
      const inputString = typeof input === 'string' ? input : JSON.stringify(input);

      switch (toolType) {
        case 'web-search':
          result = await ToolService.executeWebSearch(inputString);
          break;
        case 'database':
          result = await ToolService.executeDatabaseQuery(inputString);
          break;
        case 'api':
          result = await ToolService.executeApiCall(inputString, node.data.config);
          break;
        case 'calculator':
          // Simple calculator implementation
          try {
            const expression = inputString.replace(/[^0-9+\-*/().]/g, '');
            result = {
              expression: inputString,
              calculation: expression,
              result: eval(expression),
              timestamp: new Date().toISOString()
            };
          } catch {
            result = {
              expression: inputString,
              error: 'Invalid mathematical expression',
              timestamp: new Date().toISOString()
            };
          }
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