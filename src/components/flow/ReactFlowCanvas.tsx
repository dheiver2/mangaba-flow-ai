import { useState, useCallback } from 'react';
import { 
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FlowNode, FlowConnection } from '../FlowBuilder';
import { AdvancedNodeComponent } from './AdvancedNodeComponent';
import { Button } from '@/components/ui/button';
import { Plus, Zap } from 'lucide-react';

interface ReactFlowCanvasProps {
  nodes: FlowNode[];
  connections: FlowConnection[];
  selectedNode: FlowNode | null;
  onNodeSelect: (node: FlowNode | null) => void;
  onNodeUpdate: (nodeId: string, updates: Partial<FlowNode>) => void;
  onNodeDelete: (nodeId: string) => void;
  onAddNode: (type: FlowNode['type'], position?: { x: number; y: number }) => void;
  onConnectionsChange: (connections: FlowConnection[]) => void;
}

const nodeTypes = {
  // Core types
  'input': AdvancedNodeComponent,
  'llm': AdvancedNodeComponent,
  'output': AdvancedNodeComponent,
  'tool': AdvancedNodeComponent,
  
  // Analysis types
  'sentiment': AdvancedNodeComponent,
  'entity-extraction': AdvancedNodeComponent,
  'keyword-extraction': AdvancedNodeComponent,
  'text-classification': AdvancedNodeComponent,
  
  // Generation types
  'blog-writer': AdvancedNodeComponent,
  'email-composer': AdvancedNodeComponent,
  'social-media': AdvancedNodeComponent,
  'summary-generator': AdvancedNodeComponent,
  
  // Language types
  'translator': AdvancedNodeComponent,
  'grammar-checker': AdvancedNodeComponent,
  'style-enhancer': AdvancedNodeComponent,
  
  // Code types
  'code-generator': AdvancedNodeComponent,
  'code-reviewer': AdvancedNodeComponent,
  'bug-finder': AdvancedNodeComponent,
  'documentation': AdvancedNodeComponent,
  
  // Conversation types
  'chatbot': AdvancedNodeComponent,
  'customer-support': AdvancedNodeComponent,
  'sales-assistant': AdvancedNodeComponent,
  
  // Tool types
  'web-search': AdvancedNodeComponent,
  'database': AdvancedNodeComponent,
  'api-call': AdvancedNodeComponent,
  'calculator': AdvancedNodeComponent
};

export const ReactFlowCanvas = ({
  nodes,
  connections,
  selectedNode,
  onNodeSelect,
  onNodeUpdate,
  onNodeDelete,
  onAddNode,
  onConnectionsChange
}: ReactFlowCanvasProps) => {
  // Convert our node format to ReactFlow format
  const reactFlowNodes: Node[] = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      ...node.data,
      onSelect: () => onNodeSelect(node),
      onDelete: () => onNodeDelete(node.id),
      onUpdate: (updates: any) => onNodeUpdate(node.id, updates),
      isSelected: selectedNode?.id === node.id,
      nodeType: node.type
    },
    selected: selectedNode?.id === node.id
  }));

  // Convert our connections to ReactFlow edges
  const reactFlowEdges: Edge[] = connections.map((conn) => ({
    id: conn.id,
    source: conn.source,
    target: conn.target,
    sourceHandle: conn.sourceHandle,
    targetHandle: conn.targetHandle,
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'hsl(var(--mangaba-gold))',
      strokeWidth: 2
    }
  }));

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(reactFlowNodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(reactFlowEdges);

  // Update ReactFlow nodes when our nodes change
  useState(() => {
    setRfNodes(reactFlowNodes);
  });

  // Update ReactFlow edges when our connections change  
  useState(() => {
    setRfEdges(reactFlowEdges);
  });

  const onConnect = useCallback((params: Connection) => {
    const newConnection: FlowConnection = {
      id: `${params.source}-${params.target}-${Date.now()}`,
      source: params.source!,
      target: params.target!,
      sourceHandle: params.sourceHandle || undefined,
      targetHandle: params.targetHandle || undefined
    };
    
    onConnectionsChange([...connections, newConnection]);
  }, [connections, onConnectionsChange]);

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    
    // Handle position changes
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        onNodeUpdate(change.id, { position: change.position });
      }
    });
  }, [onNodesChange, onNodeUpdate]);

  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    onEdgesChange(changes);
    
    // Handle edge deletions
    const deletedEdges = changes.filter(change => change.type === 'remove');
    if (deletedEdges.length > 0) {
      const remainingConnections = connections.filter(conn => 
        !deletedEdges.some(deleted => deleted.id === conn.id)
      );
      onConnectionsChange(remainingConnections);
    }
  }, [onEdgesChange, connections, onConnectionsChange]);

  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    // Only deselect if clicking on the canvas background
    if ((event.target as Element).classList.contains('react-flow__pane')) {
      onNodeSelect(null);
    }
  }, [onNodeSelect]);

  const handleCanvasDoubleClick = useCallback((event: React.MouseEvent) => {
    const rect = (event.currentTarget as Element).getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left - 100,
      y: event.clientY - rect.top - 40
    };
    onAddNode('llm', position);
  }, [onAddNode]);

  return (
    <div className="flex-1 relative overflow-hidden bg-gradient-canvas">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onPaneClick={handleCanvasClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        style={{ backgroundColor: 'transparent' }}
        minZoom={0.1}
        maxZoom={2}
      >
        <Background 
          gap={20} 
          size={1}
          color="hsl(var(--mangaba-gold) / 0.2)"
        />
        <Controls 
          className="react-flow__controls-mangaba"
          style={{
            background: 'hsl(var(--mangaba-cream))',
            border: '1px solid hsl(var(--mangaba-gold) / 0.3)',
            borderRadius: '12px'
          }}
        />
        <MiniMap 
          className="react-flow__minimap-mangaba"
          style={{
            background: 'hsl(var(--mangaba-cream))',
            border: '1px solid hsl(var(--mangaba-gold) / 0.3)',
            borderRadius: '12px'
          }}
          nodeColor={(node) => {
            const nodeTypeColors: Record<string, string> = {
              'input': 'hsl(var(--mangaba-green))',
              'llm': 'hsl(var(--mangaba-gold))',
              'output': 'hsl(var(--mangaba-orange))',
              'tool': 'hsl(var(--mangaba-yellow))',
              'sentiment': 'hsl(var(--mangaba-yellow))',
              'entity-extraction': 'hsl(var(--mangaba-lime))',
              'keyword-extraction': 'hsl(var(--mangaba-amber))',
              'text-classification': 'hsl(var(--mangaba-coral))',
              'blog-writer': 'hsl(var(--mangaba-green))',
              'email-composer': 'hsl(var(--mangaba-orange))',
              'social-media': 'hsl(var(--mangaba-yellow))',
              'summary-generator': 'hsl(var(--mangaba-earth))',
              'translator': 'hsl(var(--mangaba-green))',
              'grammar-checker': 'hsl(var(--mangaba-orange))',
              'style-enhancer': 'hsl(var(--mangaba-yellow))',
              'code-generator': 'hsl(var(--mangaba-earth))',
              'code-reviewer': 'hsl(var(--mangaba-green))',
              'bug-finder': 'hsl(var(--mangaba-orange))',
              'documentation': 'hsl(var(--mangaba-yellow))',
              'chatbot': 'hsl(var(--mangaba-green))',
              'customer-support': 'hsl(var(--mangaba-orange))',
              'sales-assistant': 'hsl(var(--mangaba-yellow))',
              'web-search': 'hsl(var(--mangaba-yellow))',
              'database': 'hsl(var(--mangaba-earth))',
              'api-call': 'hsl(var(--mangaba-green))',
              'calculator': 'hsl(var(--mangaba-orange))'
            };
            return nodeTypeColors[node.type || 'default'] || 'hsl(var(--mangaba-gold))';
          }}
        />

        {/* Empty state */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center max-w-md p-8">
              <div className="w-16 h-16 bg-gradient-mangaba-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Welcome to Mangaba AI Flow
              </h3>
              <p className="text-muted-foreground mb-6">
                Start building your AI workflow by adding components from the sidebar or double-clicking on the canvas.
              </p>
              <Button 
                onClick={() => onAddNode('input')}
                className="bg-gradient-mangaba-primary hover:shadow-mangaba transition-all duration-300 pointer-events-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Node
              </Button>
            </div>
          </div>
        )}
      </ReactFlow>
    </div>
  );
};