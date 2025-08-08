import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Languages,
  BarChart3,
  Mail,
  Bot,
  Palette,
  Calculator,
  Shield,
  Sparkles,
  X,
  Settings,
  Play
} from 'lucide-react';

const nodeTypeConfig = {
  // Core types
  input: {
    icon: MessageSquare,
    color: 'bg-mangaba-green',
    borderColor: 'border-mangaba-green',
    label: 'Input',
    category: 'Core'
  },
  llm: {
    icon: Brain,
    color: 'bg-mangaba-gold',
    borderColor: 'border-mangaba-gold',
    label: 'Gemini LLM',
    category: 'AI'
  },
  output: {
    icon: FileText,
    color: 'bg-mangaba-orange',
    borderColor: 'border-mangaba-orange',
    label: 'Output',
    category: 'Core'
  },
  tool: {
    icon: Zap,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Tool',
    category: 'Tools'
  },
  
  // Analysis types
  sentiment: {
    icon: BarChart3,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Sentiment Analysis',
    category: 'Analysis'
  },
  'entity-extraction': {
    icon: Search,
    color: 'bg-mangaba-lime',
    borderColor: 'border-mangaba-lime',
    label: 'Entity Extraction',
    category: 'Analysis'
  },
  'keyword-extraction': {
    icon: Zap,
    color: 'bg-mangaba-amber',
    borderColor: 'border-mangaba-amber',
    label: 'Keyword Extraction',
    category: 'Analysis'
  },
  'text-classification': {
    icon: FileText,
    color: 'bg-mangaba-coral',
    borderColor: 'border-mangaba-coral',
    label: 'Text Classification',
    category: 'Analysis'
  },
  
  // Generation types
  'blog-writer': {
    icon: FileText,
    color: 'bg-mangaba-green',
    borderColor: 'border-mangaba-green',
    label: 'Blog Writer',
    category: 'Generation'
  },
  'email-composer': {
    icon: Mail,
    color: 'bg-mangaba-orange',
    borderColor: 'border-mangaba-orange',
    label: 'Email Composer',
    category: 'Generation'
  },
  'social-media': {
    icon: MessageSquare,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Social Media',
    category: 'Generation'
  },
  'summary-generator': {
    icon: FileText,
    color: 'bg-mangaba-earth',
    borderColor: 'border-mangaba-earth',
    label: 'Summarizer',
    category: 'Generation'
  },
  
  // Language types
  translator: {
    icon: Languages,
    color: 'bg-mangaba-green',
    borderColor: 'border-mangaba-green',
    label: 'Translator',
    category: 'Language'
  },
  'grammar-checker': {
    icon: Shield,
    color: 'bg-mangaba-orange',
    borderColor: 'border-mangaba-orange',
    label: 'Grammar Checker',
    category: 'Language'
  },
  'style-enhancer': {
    icon: Sparkles,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Style Enhancer',
    category: 'Language'
  },
  
  // Code types
  'code-generator': {
    icon: Code,
    color: 'bg-mangaba-earth',
    borderColor: 'border-mangaba-earth',
    label: 'Code Generator',
    category: 'Development'
  },
  'code-reviewer': {
    icon: Search,
    color: 'bg-mangaba-green',
    borderColor: 'border-mangaba-green',
    label: 'Code Reviewer',
    category: 'Development'
  },
  'bug-finder': {
    icon: Shield,
    color: 'bg-mangaba-orange',
    borderColor: 'border-mangaba-orange',
    label: 'Bug Detector',
    category: 'Development'
  },
  documentation: {
    icon: FileText,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Documenter',
    category: 'Development'
  },
  
  // Conversation types
  chatbot: {
    icon: Bot,
    color: 'bg-mangaba-green',
    borderColor: 'border-mangaba-green',
    label: 'Chatbot',
    category: 'Conversation'
  },
  'customer-support': {
    icon: MessageSquare,
    color: 'bg-mangaba-orange',
    borderColor: 'border-mangaba-orange',
    label: 'Customer Support',
    category: 'Conversation'
  },
  'sales-assistant': {
    icon: BarChart3,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Sales Assistant',
    category: 'Conversation'
  },
  
  // Tool types
  'web-search': {
    icon: Search,
    color: 'bg-mangaba-yellow',
    borderColor: 'border-mangaba-yellow',
    label: 'Web Search',
    category: 'Tools'
  },
  database: {
    icon: Database,
    color: 'bg-mangaba-earth',
    borderColor: 'border-mangaba-earth',
    label: 'Database',
    category: 'Tools'
  },
  'api-call': {
    icon: Globe,
    color: 'bg-mangaba-green',
    borderColor: 'border-mangaba-green',
    label: 'API Call',
    category: 'Tools'
  },
  calculator: {
    icon: Calculator,
    color: 'bg-mangaba-orange',
    borderColor: 'border-mangaba-orange',
    label: 'Calculator',
    category: 'Tools'
  }
};

interface AdvancedNodeComponentProps {
  data: {
    label: string;
    description?: string;
    config?: Record<string, any>;
    onSelect: () => void;
    onDelete: () => void;
    onUpdate: (updates: any) => void;
    isSelected: boolean;
    nodeType: string;
  };
}

export const AdvancedNodeComponent = memo(({ data }: AdvancedNodeComponentProps) => {
  const config = nodeTypeConfig[data.nodeType as keyof typeof nodeTypeConfig] || nodeTypeConfig.llm;
  const IconComponent = config.icon;

  return (
    <>
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 !bg-mangaba-gold !border-2 !border-white"
      />
      
      <Card 
        className={`
          w-64 p-4 cursor-pointer node-pulse
          ${data.isSelected 
            ? `ring-2 ring-mangaba-gold shadow-glow scale-105 ${config.borderColor}` 
            : 'border-mangaba-gold/20 hover:shadow-node'
          }
          transition-all duration-200 bg-gradient-card
        `}
        onClick={data.onSelect}
      >
        {/* Node Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${config.color} rounded-xl flex items-center justify-center shadow-sm animate-pulse-glow`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <div>
              <Badge variant="secondary" className="text-xs font-medium">
                {config.category}
              </Badge>
            </div>
          </div>
          
          {data.isSelected && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-mangaba-gold/20"
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
                className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/20"
                onClick={(e) => {
                  e.stopPropagation();
                  data.onDelete();
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Node Content */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-card-foreground">
            {data.label || config.label}
          </h4>
          {data.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {data.description}
            </p>
          )}
        </div>

        {/* Status Indicator */}
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-mangaba-green rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Quick Action Button (for selected nodes) */}
        {data.isSelected && (
          <div className="mt-3 pt-3 border-t border-mangaba-gold/20">
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs border-mangaba-gold/30 hover:bg-mangaba-gold/10"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Quick test/run this node
              }}
            >
              <Play className="h-3 w-3 mr-1" />
              Test Node
            </Button>
          </div>
        )}
      </Card>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 !bg-mangaba-gold !border-2 !border-white"
      />
    </>
  );
});