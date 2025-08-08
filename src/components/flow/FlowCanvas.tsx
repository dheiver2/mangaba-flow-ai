import { useRef, useState, useCallback } from 'react';
import { FlowNode, FlowConnection } from '../FlowBuilder';
import { NodeComponent } from './NodeComponent';
import { Button } from '@/components/ui/button';
import { Plus, Zap } from 'lucide-react';

interface FlowCanvasProps {
  nodes: FlowNode[];
  connections: FlowConnection[];
  selectedNode: FlowNode | null;
  onNodeSelect: (node: FlowNode | null) => void;
  onNodeUpdate: (nodeId: string, updates: Partial<FlowNode>) => void;
  onNodeDelete: (nodeId: string) => void;
  onAddNode: (type: FlowNode['type'], position?: { x: number; y: number }) => void;
}

export const FlowCanvas = ({
  nodes,
  connections,
  selectedNode,
  onNodeSelect,
  onNodeUpdate,
  onNodeDelete,
  onAddNode
}: FlowCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    nodeId: string | null;
    offset: { x: number; y: number };
  }>({
    isDragging: false,
    nodeId: null,
    offset: { x: 0, y: 0 }
  });

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onNodeSelect(null);
    }
  }, [onNodeSelect]);

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, node: FlowNode) => {
    e.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const offset = {
        x: e.clientX - rect.left - node.position.x,
        y: e.clientY - rect.top - node.position.y
      };
      setDragState({
        isDragging: true,
        nodeId: node.id,
        offset
      });
    }
    onNodeSelect(node);
  }, [onNodeSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragState.isDragging && dragState.nodeId) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newPosition = {
          x: e.clientX - rect.left - dragState.offset.x,
          y: e.clientY - rect.top - dragState.offset.y
        };
        onNodeUpdate(dragState.nodeId, { position: newPosition });
      }
    }
  }, [dragState, onNodeUpdate]);

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      nodeId: null,
      offset: { x: 0, y: 0 }
    });
  }, []);

  const handleCanvasDoubleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const position = {
        x: e.clientX - rect.left - 100,
        y: e.clientY - rect.top - 40
      };
      onAddNode('llm', position);
    }
  }, [onAddNode]);

  return (
    <div className="flex-1 relative overflow-hidden">
      <div
        ref={canvasRef}
        className="w-full h-full bg-gradient-canvas relative cursor-grab"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleCanvasDoubleClick}
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {/* Canvas Instructions */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md p-8">
              <div className="w-16 h-16 bg-gradient-mangaba rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Welcome to Mangaba AI Flow
              </h3>
              <p className="text-muted-foreground mb-6">
                Start building your AI flow by adding components from the sidebar or double-clicking on the canvas.
              </p>
              <Button 
                onClick={() => onAddNode('input')}
                className="bg-gradient-mangaba hover:shadow-mangaba transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Node
              </Button>
            </div>
          </div>
        )}

        {/* Render Nodes */}
        {nodes.map(node => (
          <NodeComponent
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            onMouseDown={(e) => handleNodeMouseDown(e, node)}
            onDelete={() => onNodeDelete(node.id)}
          />
        ))}

        {/* Canvas Grid Background Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </div>
  );
};