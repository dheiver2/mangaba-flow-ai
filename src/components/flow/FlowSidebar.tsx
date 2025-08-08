import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Brain, 
  FileText, 
  Zap, 
  Search,
  Database,
  Globe,
  Code,
  Image
} from 'lucide-react';
import { useState } from 'react';

interface FlowSidebarProps {
  isOpen: boolean;
  onAddNode: (type: 'input' | 'llm' | 'output' | 'tool') => void;
}

const nodeTypes = [
  {
    type: 'input' as const,
    label: 'Text Input',
    description: 'Capture user input text',
    icon: MessageSquare,
    category: 'Input',
    color: 'bg-mangaba-green'
  },
  {
    type: 'llm' as const,
    label: 'LLM Chain',
    description: 'Large Language Model processing',
    icon: Brain,
    category: 'Models',
    color: 'bg-mangaba-gold'
  },
  {
    type: 'output' as const,
    label: 'Text Output',
    description: 'Display or return text results',
    icon: FileText,
    category: 'Output',
    color: 'bg-mangaba-orange'
  },
  {
    type: 'tool' as const,
    label: 'Web Search',
    description: 'Search the web for information',
    icon: Search,
    category: 'Tools',
    color: 'bg-mangaba-yellow'
  },
  {
    type: 'tool' as const,
    label: 'Database',
    description: 'Connect to databases',
    icon: Database,
    category: 'Tools',
    color: 'bg-mangaba-earth'
  },
  {
    type: 'tool' as const,
    label: 'API Call',
    description: 'Make HTTP API requests',
    icon: Globe,
    category: 'Tools',
    color: 'bg-mangaba-green'
  }
];

export const FlowSidebar = ({ isOpen, onAddNode }: FlowSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = nodeTypes.filter(node =>
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(filteredNodes.map(node => node.category)));

  if (!isOpen) return null;

  return (
    <aside className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground mb-3">
          Flow Components
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {categories.map(category => (
          <div key={category}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-sidebar-foreground">
                {category}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {filteredNodes.filter(node => node.category === category).length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {filteredNodes
                .filter(node => node.category === category)
                .map((node, index) => {
                  const IconComponent = node.icon;
                  return (
                    <Card
                      key={`${node.type}-${index}`}
                      className="p-3 cursor-pointer hover:shadow-node transition-all duration-200 hover:scale-[1.02] border-sidebar-border"
                      onClick={() => onAddNode(node.type)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 ${node.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-card-foreground mb-1">
                            {node.label}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {node.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};