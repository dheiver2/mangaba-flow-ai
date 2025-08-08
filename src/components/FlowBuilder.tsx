import { useState } from 'react';
import { FlowSidebar } from './flow/FlowSidebar';
import { FlowCanvas } from './flow/FlowCanvas';
import { FlowHeader } from './flow/FlowHeader';
import { PropertiesPanel } from './flow/PropertiesPanel';

export interface FlowNode {
  id: string;
  type: 'input' | 'llm' | 'output' | 'tool';
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

  const addNode = (type: FlowNode['type'], position?: { x: number; y: number }) => {
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

  return (
    <div className="h-screen flex flex-col bg-gradient-canvas">
      <FlowHeader 
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <FlowSidebar 
          isOpen={sidebarOpen}
          onAddNode={addNode}
        />
        
        <FlowCanvas
          nodes={nodes}
          connections={connections}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
          onNodeUpdate={updateNode}
          onNodeDelete={deleteNode}
          onAddNode={addNode}
        />
        
        <PropertiesPanel
          selectedNode={selectedNode}
          onNodeUpdate={updateNode}
        />
      </div>
    </div>
  );
};