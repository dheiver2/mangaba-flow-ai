import { useState } from 'react';
import { FlowSidebar } from './flow/FlowSidebarAdvanced';
import { ReactFlowCanvas } from './flow/ReactFlowCanvas';
import { FlowHeader } from './flow/FlowHeader';
import { PropertiesPanel } from './flow/PropertiesPanel';
import { FlowExecutor, FlowExecutionStep } from '@/lib/flowExecutor';
import { ApiKeyManager } from '@/lib/apiServices';
import { useToast } from '@/hooks/use-toast';

export interface FlowNode {
  id: string;
  type: string; // Made more flexible to support all the new node types
  data: {
    label: string;
    description?: string;
    config?: Record<string, any>;
  };
  position: { x: number; y: number };
}

export interface FlowConnection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export const FlowBuilder = () => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [connections, setConnections] = useState<FlowConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<FlowExecutionStep[]>([]);
  const { toast } = useToast();

  const addNode = (type: string, position?: { x: number; y: number }) => {
    const defaultPosition = position || { 
      x: Math.random() * 400 + 200, 
      y: Math.random() * 300 + 100 
    };

    const newNode: FlowNode = {
      id: `${type}-${Date.now()}`,
      type,
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        description: `A ${type} component for your AI flow`,
        config: {}
      },
      position: defaultPosition
    };

    setNodes(prev => [...prev, newNode]);
  };

  const updateNode = (nodeId: string, updates: Partial<FlowNode>) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => 
      conn.source !== nodeId && conn.target !== nodeId
    ));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const runFlow = async (input: string = "Hello, world!") => {
    if (nodes.length === 0) {
      toast({
        title: "No nodes to execute",
        description: "Add some nodes to your flow first",
        variant: "destructive"
      });
      return;
    }

    // Check if API key is configured for AI nodes
    const hasAINodes = nodes.some(node => 
      ['llm', 'sentiment', 'entity-extraction', 'keyword-extraction', 'text-classification',
       'blog-writer', 'email-composer', 'social-media', 'summary-generator', 'translator',
       'grammar-checker', 'style-enhancer', 'code-generator', 'code-reviewer', 'bug-finder',
       'documentation', 'chatbot', 'customer-support', 'sales-assistant'].includes(node.type)
    );

    if (hasAINodes && !ApiKeyManager.hasGeminiKey()) {
      toast({
        title: "API Key Required",
        description: "Please configure your Gemini API key in settings to run AI components",
        variant: "destructive"
      });
      return;
    }

    setIsExecuting(true);
    setExecutionSteps([]);
    
    try {
      const executor = new FlowExecutor(nodes, connections, input, setExecutionSteps);
      const result = await executor.execute();
      
      if (result.status === 'error') {
        toast({
          title: "Flow execution failed", 
          description: result.error || "Unknown error occurred",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Flow executed successfully",
          description: `Result: ${typeof result.output === 'string' ? result.output.substring(0, 100) + '...' : JSON.stringify(result.output)}`,
        });
      }
    } catch (error) {
      console.error('Flow execution error:', error);
      toast({
        title: "Flow execution failed", 
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const loadTemplate = (template: any) => {
    console.log('Loading template:', template);
    
    // Clear existing nodes and connections
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
    
    // Add template nodes and connections with proper IDs
    setTimeout(() => {
      const timestamp = Date.now();
      
      // Create new nodes with unique IDs but preserve original IDs for connections
      const templateNodes = template.nodes.map((node: any, index: number) => {
        const newId = `${node.type}-${timestamp}-${index}`;
        return {
          ...node,
          id: newId,
          // Store original ID for connection mapping
          originalId: node.id
        };
      });
      
      // Create connections using the new node IDs
      const templateConnections = template.connections.map((conn: any, index: number) => {
        const sourceNode = templateNodes.find((n: any) => n.originalId === conn.source);
        const targetNode = templateNodes.find((n: any) => n.originalId === conn.target);
        
        if (!sourceNode || !targetNode) {
          console.warn('Connection mapping failed:', conn, 'Available nodes:', templateNodes.map(n => ({ id: n.id, originalId: n.originalId })));
          return null;
        }
        
        return {
          ...conn,
          id: `conn-${timestamp}-${index}`,
          source: sourceNode.id,
          target: targetNode.id
        };
      }).filter(Boolean); // Remove null connections
      
      console.log('Created nodes:', templateNodes);
      console.log('Created connections:', templateConnections);
      
      setNodes(templateNodes);
      setConnections(templateConnections);
    }, 100);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-canvas">
      <FlowHeader 
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        onRunFlow={runFlow}
        isExecuting={isExecuting}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <FlowSidebar 
          isOpen={sidebarOpen}
          onAddNode={addNode}
          onLoadTemplate={loadTemplate}
        />
        
        <ReactFlowCanvas
          nodes={nodes}
          connections={connections}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
          onNodeUpdate={updateNode}
          onNodeDelete={deleteNode}
          onAddNode={addNode}
          onConnectionsChange={setConnections}
        />
        
        <PropertiesPanel
          selectedNode={selectedNode}
          onNodeUpdate={updateNode}
        />
      </div>
    </div>
  );
};