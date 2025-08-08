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
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Entrada',
    category: 'Principal'
  },
  llm: {
    icon: Brain,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Gemini LLM',
    category: 'IA'
  },
  output: {
    icon: FileText,
    color: 'bg-destructive',
    borderColor: 'border-destructive',
    label: 'Saída',
    category: 'Principal'
  },
  tool: {
    icon: Zap,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Ferramenta',
    category: 'Ferramentas'
  },
  
  // Analysis types
  sentiment: {
    icon: BarChart3,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Análise de Sentimento',
    category: 'Análise'
  },
  'entity-extraction': {
    icon: Search,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Extração de Entidades',
    category: 'Análise'
  },
  'keyword-extraction': {
    icon: Zap,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Extração de Palavras-chave',
    category: 'Análise'
  },
  'text-classification': {
    icon: FileText,
    color: 'bg-destructive',
    borderColor: 'border-destructive',
    label: 'Classificação de Texto',
    category: 'Análise'
  },
  
  // Generation types
  'blog-writer': {
    icon: FileText,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Escritor de Blog',
    category: 'Geração'
  },
  'email-composer': {
    icon: Mail,
    color: 'bg-destructive',
    borderColor: 'border-destructive',
    label: 'Compositor de Email',
    category: 'Geração'
  },
  'social-media': {
    icon: MessageSquare,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Mídia Social',
    category: 'Geração'
  },
  'summary-generator': {
    icon: FileText,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Resumidor',
    category: 'Geração'
  },
  
  // Language types
  translator: {
    icon: Languages,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Tradutor',
    category: 'Linguagem'
  },
  'grammar-checker': {
    icon: Shield,
    color: 'bg-destructive',
    borderColor: 'border-destructive',
    label: 'Corretor Gramatical',
    category: 'Linguagem'
  },
  'style-enhancer': {
    icon: Sparkles,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Melhorador de Estilo',
    category: 'Linguagem'
  },
  
  // Code types
  'code-generator': {
    icon: Code,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Gerador de Código',
    category: 'Desenvolvimento'
  },
  'code-reviewer': {
    icon: Search,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Revisor de Código',
    category: 'Desenvolvimento'
  },
  'bug-finder': {
    icon: Shield,
    color: 'bg-destructive',
    borderColor: 'border-destructive',
    label: 'Detector de Bugs',
    category: 'Desenvolvimento'
  },
  documentation: {
    icon: FileText,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Documentador',
    category: 'Desenvolvimento'
  },
  
  // Conversation types
  chatbot: {
    icon: Bot,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Chatbot',
    category: 'Conversa'
  },
  'customer-support': {
    icon: MessageSquare,
    color: 'bg-destructive',
    borderColor: 'border-destructive',
    label: 'Suporte ao Cliente',
    category: 'Conversa'
  },
  'sales-assistant': {
    icon: BarChart3,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Assistente de Vendas',
    category: 'Conversa'
  },
  
  // Tool types
  'web-search': {
    icon: Search,
    color: 'bg-accent',
    borderColor: 'border-accent',
    label: 'Busca na Web',
    category: 'Ferramentas'
  },
  database: {
    icon: Database,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Banco de Dados',
    category: 'Ferramentas'
  },
  'api-call': {
    icon: Globe,
    color: 'bg-primary',
    borderColor: 'border-primary',
    label: 'Chamada de API',
    category: 'Ferramentas'
  },
  calculator: {
    icon: Calculator,
    color: 'bg-destructive',
    borderColor: 'border-destructive',
    label: 'Calculadora',
    category: 'Ferramentas'
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
        className="w-3 h-3 !bg-primary !border-2 !border-white"
      />
      
      <Card 
        className={`
          w-64 p-4 cursor-pointer transition-all duration-200
          ${data.isSelected 
            ? `ring-2 ring-primary shadow-lg scale-105 ${config.borderColor}` 
            : 'border-border hover:shadow-md'
          }
          bg-card hover:bg-card/80
        `}
        onClick={data.onSelect}
      >
        {/* Node Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${config.color} rounded-xl flex items-center justify-center shadow-sm`}>
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
                className="h-6 w-6 p-0 hover:bg-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Settings clicked for:', data.nodeType);
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
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Quick Action Button (for selected nodes) */}
        {data.isSelected && (
          <div className="mt-3 pt-3 border-t border-border">
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Test node clicked for:', data.nodeType);
              }}
            >
              <Play className="h-3 w-3 mr-1" />
              Testar Nó
            </Button>
          </div>
        )}
      </Card>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 !bg-primary !border-2 !border-white"
      />
    </>
  );
});