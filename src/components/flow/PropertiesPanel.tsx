import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FlowNode } from '../FlowBuilder';
import { Settings, Info, Code } from 'lucide-react';

interface PropertiesPanelProps {
  selectedNode: FlowNode | null;
  onNodeUpdate: (nodeId: string, updates: Partial<FlowNode>) => void;
}

export const PropertiesPanel = ({ selectedNode, onNodeUpdate }: PropertiesPanelProps) => {
  if (!selectedNode) {
    return (
      <aside className="w-80 bg-card border-l border-border flex flex-col">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Properties
          </h3>
          <p className="text-sm text-muted-foreground">
            Select a node to edit its properties and configuration.
          </p>
        </div>
      </aside>
    );
  }

  const updateNodeData = (field: string, value: any) => {
    onNodeUpdate(selectedNode.id, {
      data: {
        ...selectedNode.data,
        [field]: value
      }
    });
  };

  const updateNodeConfig = (field: string, value: any) => {
    onNodeUpdate(selectedNode.id, {
      data: {
        ...selectedNode.data,
        config: {
          ...selectedNode.data.config,
          [field]: value
        }
      }
    });
  };

  return (
    <aside className="w-80 bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-mangaba rounded-lg flex items-center justify-center">
            <Settings className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Properties</h2>
            <Badge variant="outline" className="text-xs">
              {selectedNode.type.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Properties */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Basic Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="node-label" className="text-sm font-medium">
                Label
              </Label>
              <Input
                id="node-label"
                value={selectedNode.data.label}
                onChange={(e) => updateNodeData('label', e.target.value)}
                placeholder="Enter node label"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="node-description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="node-description"
                value={selectedNode.data.description || ''}
                onChange={(e) => updateNodeData('description', e.target.value)}
                placeholder="Enter node description"
                className="mt-1 resize-none"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Node-specific Configuration */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Code className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Configuration</h3>
          </div>

          <div className="space-y-4">
            {selectedNode.type === 'llm' && (
              <>
                <div>
                  <Label htmlFor="model" className="text-sm font-medium">
                    Model
                  </Label>
                  <Input
                    id="model"
                    value={selectedNode.data.config?.model || 'gpt-3.5-turbo'}
                    onChange={(e) => updateNodeConfig('model', e.target.value)}
                    placeholder="e.g., gpt-3.5-turbo"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="temperature" className="text-sm font-medium">
                    Temperature
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={selectedNode.data.config?.temperature || 0.7}
                    onChange={(e) => updateNodeConfig('temperature', parseFloat(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prompt" className="text-sm font-medium">
                    System Prompt
                  </Label>
                  <Textarea
                    id="prompt"
                    value={selectedNode.data.config?.prompt || ''}
                    onChange={(e) => updateNodeConfig('prompt', e.target.value)}
                    placeholder="Enter system prompt"
                    className="mt-1 resize-none"
                    rows={4}
                  />
                </div>
              </>
            )}

            {selectedNode.type === 'input' && (
              <>
                <div>
                  <Label htmlFor="input-type" className="text-sm font-medium">
                    Input Type
                  </Label>
                  <Input
                    id="input-type"
                    value={selectedNode.data.config?.inputType || 'text'}
                    onChange={(e) => updateNodeConfig('inputType', e.target.value)}
                    placeholder="text, file, image, etc."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="placeholder" className="text-sm font-medium">
                    Placeholder
                  </Label>
                  <Input
                    id="placeholder"
                    value={selectedNode.data.config?.placeholder || ''}
                    onChange={(e) => updateNodeConfig('placeholder', e.target.value)}
                    placeholder="Enter placeholder text"
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {selectedNode.type === 'tool' && (
              <>
                <div>
                  <Label htmlFor="tool-type" className="text-sm font-medium">
                    Tool Type
                  </Label>
                  <Input
                    id="tool-type"
                    value={selectedNode.data.config?.toolType || 'web-search'}
                    onChange={(e) => updateNodeConfig('toolType', e.target.value)}
                    placeholder="web-search, database, api, etc."
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // TODO: Test node functionality
            }}
          >
            Test Node
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // TODO: Duplicate node
            }}
          >
            Duplicate Node
          </Button>
        </div>
      </div>
    </aside>
  );
};