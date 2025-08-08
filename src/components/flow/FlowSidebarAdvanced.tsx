import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  FileImage,
  Bot,
  Palette,
  Calculator,
  Shield,
  Workflow,
  Sparkles,
  Clock
} from 'lucide-react';
import { useState } from 'react';

interface ComponentCategory {
  id: string;
  name: string;
  icon: any;
  components: ComponentItem[];
}

interface ComponentItem {
  type: string;
  label: string;
  description: string;
  icon: any;
  category: string;
  color: string;
  config?: Record<string, any>;
  tags: string[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  tags: string[];
  nodes: any[];
  connections: any[];
}

const advancedComponents: ComponentCategory[] = [
  {
    id: 'core',
    name: 'Core Components',
    icon: Zap,
    components: [
      {
        type: 'input',
        label: 'Text Input',
        description: 'Capture user text input',
        icon: MessageSquare,
        category: 'Input',
        color: 'bg-mangaba-green',
        tags: ['basic', 'input', 'text']
      },
      {
        type: 'llm',
        label: 'Gemini LLM',
        description: 'Google Gemini language model',
        icon: Brain,
        category: 'AI',
        color: 'bg-mangaba-gold',
        tags: ['ai', 'gemini', 'llm']
      },
      {
        type: 'output',
        label: 'Text Output',
        description: 'Display or return results',
        icon: FileText,
        category: 'Output',
        color: 'bg-mangaba-orange',
        tags: ['basic', 'output', 'display']
      }
    ]
  },
  {
    id: 'analysis',
    name: 'Text Analysis',
    icon: BarChart3,
    components: [
      {
        type: 'sentiment',
        label: 'Sentiment Analysis',
        description: 'Analyze emotional tone of text',
        icon: BarChart3,
        category: 'Analysis',
        color: 'bg-mangaba-yellow',
        config: { analysisType: 'sentiment' },
        tags: ['analysis', 'sentiment', 'emotion']
      },
      {
        type: 'entity-extraction',
        label: 'Entity Extraction',
        description: 'Extract names, places, organizations',
        icon: Search,
        category: 'Analysis',
        color: 'bg-mangaba-lime',
        config: { analysisType: 'entities' },
        tags: ['analysis', 'entities', 'extraction']
      },
      {
        type: 'keyword-extraction',
        label: 'Keyword Extraction',
        description: 'Extract important keywords and phrases',
        icon: Zap,
        category: 'Analysis',
        color: 'bg-mangaba-amber',
        config: { analysisType: 'keywords' },
        tags: ['analysis', 'keywords', 'seo']
      },
      {
        type: 'text-classification',
        label: 'Text Classification',
        description: 'Classify text into categories',
        icon: FileText,
        category: 'Analysis',
        color: 'bg-mangaba-coral',
        config: { analysisType: 'classification' },
        tags: ['analysis', 'classification', 'category']
      }
    ]
  },
  {
    id: 'generation',
    name: 'Content Generation',
    icon: Palette,
    components: [
      {
        type: 'blog-writer',
        label: 'Blog Writer',
        description: 'Generate engaging blog posts',
        icon: FileText,
        category: 'Generation',
        color: 'bg-mangaba-green',
        config: { contentType: 'blog' },
        tags: ['content', 'blog', 'writing']
      },
      {
        type: 'email-composer',
        label: 'Email Composer',
        description: 'Create professional emails',
        icon: Mail,
        category: 'Generation',
        color: 'bg-mangaba-orange',
        config: { contentType: 'email' },
        tags: ['email', 'professional', 'communication']
      },
      {
        type: 'social-media',
        label: 'Social Media Post',
        description: 'Generate engaging social content',
        icon: MessageSquare,
        category: 'Generation',
        color: 'bg-mangaba-yellow',
        config: { contentType: 'social' },
        tags: ['social', 'media', 'engagement']
      },
      {
        type: 'summary-generator',
        label: 'Text Summarizer',
        description: 'Create concise summaries',
        icon: FileText,
        category: 'Generation',
        color: 'bg-mangaba-earth',
        config: { contentType: 'summary' },
        tags: ['summary', 'condensed', 'brief']
      }
    ]
  },
  {
    id: 'language',
    name: 'Language Processing',
    icon: Languages,
    components: [
      {
        type: 'translator',
        label: 'Language Translator',
        description: 'Translate between languages',
        icon: Languages,
        category: 'Language',
        color: 'bg-mangaba-green',
        config: { serviceType: 'translation' },
        tags: ['translation', 'multilingual', 'language']
      },
      {
        type: 'grammar-checker',
        label: 'Grammar Checker',
        description: 'Check and fix grammar',
        icon: Shield,
        category: 'Language',
        color: 'bg-mangaba-orange',
        config: { serviceType: 'grammar' },
        tags: ['grammar', 'correction', 'writing']
      },
      {
        type: 'style-enhancer',
        label: 'Style Enhancer',
        description: 'Improve writing style and tone',
        icon: Sparkles,
        category: 'Language',
        color: 'bg-mangaba-yellow',
        config: { serviceType: 'style' },
        tags: ['style', 'tone', 'enhancement']
      }
    ]
  },
  {
    id: 'code',
    name: 'Code & Development',
    icon: Code,
    components: [
      {
        type: 'code-generator',
        label: 'Code Generator',
        description: 'Generate code in multiple languages',
        icon: Code,
        category: 'Development',
        color: 'bg-mangaba-earth',
        config: { codeType: 'generation' },
        tags: ['code', 'programming', 'generation']
      },
      {
        type: 'code-reviewer',
        label: 'Code Reviewer',
        description: 'Review and suggest improvements',
        icon: Search,
        category: 'Development',
        color: 'bg-mangaba-green',
        config: { codeType: 'review' },
        tags: ['code', 'review', 'quality']
      },
      {
        type: 'bug-finder',
        label: 'Bug Detector',
        description: 'Find and fix bugs in code',
        icon: Shield,
        category: 'Development',
        color: 'bg-mangaba-orange',
        config: { codeType: 'debug' },
        tags: ['debugging', 'bugs', 'fixes']
      },
      {
        type: 'documentation',
        label: 'Code Documenter',
        description: 'Generate code documentation',
        icon: FileText,
        category: 'Development',
        color: 'bg-mangaba-yellow',
        config: { codeType: 'documentation' },
        tags: ['documentation', 'comments', 'explanation']
      }
    ]
  },
  {
    id: 'conversation',
    name: 'Conversational AI',
    icon: Bot,
    components: [
      {
        type: 'chatbot',
        label: 'Chatbot',
        description: 'Interactive conversational agent',
        icon: Bot,
        category: 'Conversation',
        color: 'bg-mangaba-green',
        config: { botType: 'general' },
        tags: ['chatbot', 'conversation', 'interactive']
      },
      {
        type: 'customer-support',
        label: 'Customer Support Bot',
        description: 'Specialized customer service agent',
        icon: MessageSquare,
        category: 'Conversation',
        color: 'bg-mangaba-orange',
        config: { botType: 'support' },
        tags: ['support', 'customer', 'service']
      },
      {
        type: 'sales-assistant',
        label: 'Sales Assistant',
        description: 'AI-powered sales representative',
        icon: BarChart3,
        category: 'Conversation',
        color: 'bg-mangaba-yellow',
        config: { botType: 'sales' },
        tags: ['sales', 'assistant', 'conversion']
      }
    ]
  },
  {
    id: 'tools',
    name: 'External Tools',
    icon: Workflow,
    components: [
      {
        type: 'web-search',
        label: 'Web Search',
        description: 'Search the internet for information',
        icon: Search,
        category: 'Tools',
        color: 'bg-mangaba-yellow',
        config: { toolType: 'web-search' },
        tags: ['search', 'web', 'information']
      },
      {
        type: 'database',
        label: 'Database Query',
        description: 'Connect and query databases',
        icon: Database,
        category: 'Tools',
        color: 'bg-mangaba-earth',
        config: { toolType: 'database' },
        tags: ['database', 'query', 'data']
      },
      {
        type: 'api-call',
        label: 'API Integration',
        description: 'Make HTTP API requests',
        icon: Globe,
        category: 'Tools',
        color: 'bg-mangaba-green',
        config: { toolType: 'api' },
        tags: ['api', 'integration', 'http']
      },
      {
        type: 'calculator',
        label: 'Calculator',
        description: 'Perform mathematical calculations',
        icon: Calculator,
        category: 'Tools',
        color: 'bg-mangaba-orange',
        config: { toolType: 'calculator' },
        tags: ['math', 'calculation', 'numbers']
      }
    ]
  }
];

const flowTemplates: Template[] = [
  {
    id: 'customer-support',
    name: 'Customer Support Chatbot',
    description: 'Complete customer service workflow with sentiment analysis and automated responses',
    icon: Bot,
    color: 'bg-mangaba-green',
    difficulty: 'Beginner',
    estimatedTime: '5 min',
    tags: ['customer service', 'chatbot', 'automation'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: 'Customer Message', description: 'Capture customer input' }
      },
      {
        id: 'sentiment-1',
        type: 'sentiment',
        position: { x: 400, y: 100 },
        data: { label: 'Analyze Sentiment', description: 'Analyze customer emotion' }
      },
      {
        id: 'llm-1',
        type: 'llm',
        position: { x: 700, y: 100 },
        data: { label: 'Generate Response', description: 'Create helpful response' }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 1000, y: 100 },
        data: { label: 'Customer Response', description: 'Send response to customer' }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'sentiment-1' },
      { id: 'e2', source: 'sentiment-1', target: 'llm-1' },
      { id: 'e3', source: 'llm-1', target: 'output-1' }
    ]
  },
  {
    id: 'content-creation',
    name: 'Content Creation Pipeline',
    description: 'Generate blog posts, social media content, and marketing copy',
    icon: Palette,
    color: 'bg-mangaba-orange',
    difficulty: 'Intermediate',
    estimatedTime: '10 min',
    tags: ['content', 'marketing', 'writing'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: 'Content Topic', description: 'Input your topic or keywords' }
      },
      {
        id: 'blog-1',
        type: 'blog-writer',
        position: { x: 400, y: 50 },
        data: { label: 'Blog Post', description: 'Generate blog content' }
      },
      {
        id: 'social-1',
        type: 'social-media',
        position: { x: 400, y: 150 },
        data: { label: 'Social Media', description: 'Create social posts' }
      },
      {
        id: 'email-1',
        type: 'email-composer',
        position: { x: 400, y: 250 },
        data: { label: 'Email Content', description: 'Generate marketing emails' }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'blog-1' },
      { id: 'e2', source: 'input-1', target: 'social-1' },
      { id: 'e3', source: 'input-1', target: 'email-1' }
    ]
  },
  {
    id: 'data-analysis',
    name: 'Text Analysis Dashboard',
    description: 'Comprehensive text analysis with sentiment, entities, and insights',
    icon: BarChart3,
    color: 'bg-mangaba-yellow',
    difficulty: 'Intermediate',
    estimatedTime: '8 min',
    tags: ['analysis', 'data', 'insights'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { label: 'Text Input', description: 'Text to analyze' }
      },
      {
        id: 'sentiment-1',
        type: 'sentiment',
        position: { x: 400, y: 50 },
        data: { label: 'Sentiment', description: 'Analyze emotional tone' }
      },
      {
        id: 'entity-1',
        type: 'entity-extraction',
        position: { x: 400, y: 150 },
        data: { label: 'Entities', description: 'Extract entities' }
      },
      {
        id: 'keyword-1',
        type: 'keyword-extraction',
        position: { x: 400, y: 250 },
        data: { label: 'Keywords', description: 'Extract keywords' }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 700, y: 150 },
        data: { label: 'Analysis Report', description: 'Comprehensive analysis results' }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'sentiment-1' },
      { id: 'e2', source: 'input-1', target: 'entity-1' },
      { id: 'e3', source: 'input-1', target: 'keyword-1' },
      { id: 'e4', source: 'sentiment-1', target: 'output-1' },
      { id: 'e5', source: 'entity-1', target: 'output-1' },
      { id: 'e6', source: 'keyword-1', target: 'output-1' }
    ]
  },
  {
    id: 'translation-service',
    name: 'Multi-Language Translator',
    description: 'Professional translation service with quality checks',
    icon: Languages,
    color: 'bg-mangaba-earth',
    difficulty: 'Beginner',
    estimatedTime: '3 min',
    tags: ['translation', 'multilingual', 'communication'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: 'Source Text', description: 'Text to translate' }
      },
      {
        id: 'translator-1',
        type: 'translator',
        position: { x: 400, y: 100 },
        data: { label: 'Translator', description: 'Translate to target language' }
      },
      {
        id: 'grammar-1',
        type: 'grammar-checker',
        position: { x: 700, y: 100 },
        data: { label: 'Quality Check', description: 'Check translation quality' }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 1000, y: 100 },
        data: { label: 'Translated Text', description: 'Final translated result' }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'translator-1' },
      { id: 'e2', source: 'translator-1', target: 'grammar-1' },
      { id: 'e3', source: 'grammar-1', target: 'output-1' }
    ]
  },
  {
    id: 'code-assistant',
    name: 'AI Code Assistant',
    description: 'Complete coding workflow with generation, review, and documentation',
    icon: Code,
    color: 'bg-mangaba-amber',
    difficulty: 'Advanced',
    estimatedTime: '15 min',
    tags: ['coding', 'development', 'ai assistant'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { label: 'Code Request', description: 'Describe what code you need' }
      },
      {
        id: 'code-gen-1',
        type: 'code-generator',
        position: { x: 400, y: 100 },
        data: { label: 'Generate Code', description: 'AI generates code' }
      },
      {
        id: 'code-review-1',
        type: 'code-reviewer',
        position: { x: 700, y: 100 },
        data: { label: 'Review Code', description: 'Check code quality' }
      },
      {
        id: 'bug-finder-1',
        type: 'bug-finder',
        position: { x: 700, y: 200 },
        data: { label: 'Find Bugs', description: 'Detect potential issues' }
      },
      {
        id: 'doc-1',
        type: 'documentation',
        position: { x: 1000, y: 150 },
        data: { label: 'Generate Docs', description: 'Create documentation' }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'code-gen-1' },
      { id: 'e2', source: 'code-gen-1', target: 'code-review-1' },
      { id: 'e3', source: 'code-gen-1', target: 'bug-finder-1' },
      { id: 'e4', source: 'code-review-1', target: 'doc-1' },
      { id: 'e5', source: 'bug-finder-1', target: 'doc-1' }
    ]
  },
  {
    id: 'email-automation',
    name: 'Smart Email Automation',
    description: 'Automated email responses with tone analysis and personalization',
    icon: Mail,
    color: 'bg-mangaba-coral',
    difficulty: 'Intermediate',
    estimatedTime: '7 min',
    tags: ['email', 'automation', 'personalization'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { label: 'Incoming Email', description: 'Email to respond to' }
      },
      {
        id: 'sentiment-1',
        type: 'sentiment',
        position: { x: 400, y: 100 },
        data: { label: 'Analyze Tone', description: 'Detect email sentiment' }
      },
      {
        id: 'entity-1',
        type: 'entity-extraction',
        position: { x: 400, y: 200 },
        data: { label: 'Extract Info', description: 'Get key information' }
      },
      {
        id: 'email-composer-1',
        type: 'email-composer',
        position: { x: 700, y: 150 },
        data: { label: 'Compose Reply', description: 'Generate personalized response' }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 1000, y: 150 },
        data: { label: 'Email Response', description: 'Final email to send' }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'sentiment-1' },
      { id: 'e2', source: 'input-1', target: 'entity-1' },
      { id: 'e3', source: 'sentiment-1', target: 'email-composer-1' },
      { id: 'e4', source: 'entity-1', target: 'email-composer-1' },
      { id: 'e5', source: 'email-composer-1', target: 'output-1' }
    ]
  }
];

interface FlowSidebarProps {
  isOpen: boolean;
  onAddNode: (type: string, position?: { x: number; y: number }) => void;
  onLoadTemplate?: (template: Template) => void;
}

export const FlowSidebar = ({ isOpen, onAddNode, onLoadTemplate }: FlowSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allComponents = advancedComponents.flatMap(cat => cat.components);
  const filteredComponents = allComponents.filter(component =>
    (selectedCategory === 'all' || component.category.toLowerCase() === selectedCategory) &&
    (component.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
     component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  if (!isOpen) return null;

  return (
    <aside className="w-96 bg-gradient-card border-r border-sidebar-border flex flex-col shadow-feature">
      <div className="p-4 border-b border-sidebar-border bg-gradient-mangaba-primary">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Components & Templates
        </h2>
      </div>

      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-4">
          <TabsTrigger value="components" className="text-xs">Components</TabsTrigger>
          <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="flex-1 flex flex-col mt-4">
          <div className="px-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-mangaba-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-mangaba-gold/50"
              />
            </div>

            <ScrollArea className="h-8">
              <div className="flex gap-2 pb-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs"
                >
                  All
                </Button>
                {Array.from(new Set(allComponents.map(c => c.category))).map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category.toLowerCase() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className="text-xs whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <ScrollArea className="flex-1 px-4 pb-4">
            <div className="space-y-3 mt-4">
              {filteredComponents.map((component, index) => {
                const IconComponent = component.icon;
                return (
                  <Card
                    key={`${component.type}-${index}`}
                    className="p-3 cursor-pointer hover:shadow-node transition-all duration-200 hover:scale-[1.02] border-mangaba-gold/20 group"
                    onClick={() => onAddNode(component.type)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${component.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-card-foreground">
                            {component.label}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {component.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {component.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {component.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 flex flex-col mt-4">
          <ScrollArea className="flex-1 px-4 pb-4">
            <div className="space-y-3">
              {flowTemplates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Card
                    key={template.id}
                    className="p-4 cursor-pointer hover:shadow-node transition-all duration-200 hover:scale-[1.02] border-mangaba-gold/20 group"
                    onClick={() => {
                      if (onLoadTemplate) {
                        onLoadTemplate(template);
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-card-foreground">
                            {template.name}
                          </h4>
                          <div className="flex flex-col items-end gap-1">
                            <Badge 
                              variant={template.difficulty === 'Beginner' ? 'default' : template.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {template.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {template.estimatedTime}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </aside>
  );
};