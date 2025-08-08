import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlowNode } from '../FlowBuilder';
import { 
  MessageSquare, 
  Brain, 
  FileText, 
  Zap, 
  X, 
  Settings,
  Play,
  Pause
} from 'lucide-react';

interface NodeComponentProps {
  node: FlowNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onDelete: () => void;
}

const nodeTypeConfig = {
  input: {
    icon: MessageSquare,
    color: 'bg-mangaba-green',
    borderColor: 'border-mangaba-green',
    label: 'Input'
  },
  llm: {
    icon: Brain,
    color: 'bg-mangaba-gold',
    borderColor: 'border-mangaba-gold',
    label: 'LLM'
  },
  output: {
    icon: FileText,
    color: 'bg-mangaba-orange',
    borderColor: 'border-mangaba-orange',
    label: 'Output'
  },
  tool: {
    icon: Zap,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Tool'
  }
};

export const NodeComponent = ({ 
  node, 
  isSelected, 
  onMouseDown, 
  onDelete 
}: NodeComponentProps) => {
  const config = nodeTypeConfig[node.type];
  const IconComponent = config.icon;

  return (
    <div
      className="absolute cursor-move"
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: 'translate(0, 0)'
      }}
      onMouseDown={onMouseDown}
    >
      <Card 
        className={`
          w-64 p-4 transition-all duration-200 hover:shadow-node
          ${isSelected 
            ? `ring-2 ring-primary shadow-float scale-105 ${config.borderColor}` 
            : 'border-border'
          }
        `}
      >
        {/* Node Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
              <IconComponent className="h-4 w-4 text-white" />
            </div>
            <div>
              <Badge variant="secondary" className="text-xs">
                {config.label}
              </Badge>
            </div>
          </div>
          
          {isSelected && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Open settings
                }}
              >
                <Settings className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Node Content */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-card-foreground">
            {node.data.label}
          </h4>
          {node.data.description && (
            <p className="text-xs text-muted-foreground">
              {node.data.description}
            </p>
          )}
        </div>

        {/* Connection Points */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 bg-white border-2 border-mangaba-gold rounded-full shadow-sm"></div>
        </div>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 bg-white border-2 border-mangaba-gold rounded-full shadow-sm"></div>
        </div>

        {/* Status Indicator */}
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-mangaba-green rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};