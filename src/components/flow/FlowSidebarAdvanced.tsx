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
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
  Headphones,
  PenTool,
  Users,
  ShoppingCart,
  Building,
  GraduationCap,
  Stethoscope
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
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  estimatedTime: string;
  tags: string[];
  nodes: any[];
  connections: any[];
}

const advancedComponents: ComponentCategory[] = [
  {
    id: 'core',
    name: 'Componentes Principais',
    icon: Zap,
    components: [
      {
        type: 'input',
        label: 'Entrada de Texto',
        description: 'Captura entrada de texto do usuário',
        icon: MessageSquare,
        category: 'Entrada',
        color: 'bg-primary',
        tags: ['básico', 'entrada', 'texto']
      },
      {
        type: 'llm',
        label: 'Gemini LLM',
        description: 'Modelo de linguagem Google Gemini',
        icon: Brain,
        category: 'IA',
        color: 'bg-secondary',
        tags: ['ia', 'gemini', 'llm']
      },
      {
        type: 'output',
        label: 'Saída de Texto',
        description: 'Exibe ou retorna resultados',
        icon: FileText,
        category: 'Saída',
        color: 'bg-accent',
        tags: ['básico', 'saída', 'exibição']
      }
    ]
  },
  {
    id: 'analysis',
    name: 'Análise de Texto',
    icon: BarChart3,
    components: [
      {
        type: 'sentiment',
        label: 'Análise de Sentimento',
        description: 'Analisa o tom emocional do texto',
        icon: BarChart3,
        category: 'Análise',
        color: 'bg-primary',
        config: { analysisType: 'sentiment' },
        tags: ['análise', 'sentimento', 'emoção']
      },
      {
        type: 'entity-extraction',
        label: 'Extração de Entidades',
        description: 'Extrai nomes, lugares, organizações',
        icon: Search,
        category: 'Análise',
        color: 'bg-secondary',
        config: { analysisType: 'entities' },
        tags: ['análise', 'entidades', 'extração']
      },
      {
        type: 'keyword-extraction',
        label: 'Extração de Palavras-chave',
        description: 'Extrai palavras-chave importantes',
        icon: Zap,
        category: 'Análise',
        color: 'bg-accent',
        config: { analysisType: 'keywords' },
        tags: ['análise', 'palavras-chave', 'seo']
      },
      {
        type: 'text-classification',
        label: 'Classificação de Texto',
        description: 'Classifica texto em categorias',
        icon: FileText,
        category: 'Análise',
        color: 'bg-primary',
        config: { analysisType: 'classification' },
        tags: ['análise', 'classificação', 'categoria']
      }
    ]
  },
  {
    id: 'generation',
    name: 'Geração de Conteúdo',
    icon: Palette,
    components: [
      {
        type: 'blog-writer',
        label: 'Escritor de Blog',
        description: 'Gera posts de blog envolventes',
        icon: FileText,
        category: 'Geração',
        color: 'bg-secondary',
        config: { contentType: 'blog' },
        tags: ['conteúdo', 'blog', 'escrita']
      },
      {
        type: 'email-composer',
        label: 'Compositor de Email',
        description: 'Cria emails profissionais',
        icon: Mail,
        category: 'Geração',
        color: 'bg-accent',
        config: { contentType: 'email' },
        tags: ['email', 'profissional', 'comunicação']
      },
      {
        type: 'social-media',
        label: 'Post de Mídia Social',
        description: 'Gera conteúdo envolvente para redes sociais',
        icon: MessageSquare,
        category: 'Geração',
        color: 'bg-primary',
        config: { contentType: 'social' },
        tags: ['social', 'mídia', 'engajamento']
      },
      {
        type: 'summary-generator',
        label: 'Resumidor de Texto',
        description: 'Cria resumos concisos',
        icon: FileText,
        category: 'Geração',
        color: 'bg-secondary',
        config: { contentType: 'summary' },
        tags: ['resumo', 'condensado', 'breve']
      }
    ]
  },
  {
    id: 'language',
    name: 'Processamento de Linguagem',
    icon: Languages,
    components: [
      {
        type: 'translator',
        label: 'Tradutor de Idiomas',
        description: 'Traduz entre idiomas',
        icon: Languages,
        category: 'Linguagem',
        color: 'bg-accent',
        config: { serviceType: 'translation' },
        tags: ['tradução', 'multilíngue', 'idioma']
      },
      {
        type: 'grammar-checker',
        label: 'Corretor Gramatical',
        description: 'Verifica e corrige gramática',
        icon: Shield,
        category: 'Linguagem',
        color: 'bg-primary',
        config: { serviceType: 'grammar' },
        tags: ['gramática', 'correção', 'escrita']
      },
      {
        type: 'style-enhancer',
        label: 'Melhorador de Estilo',
        description: 'Melhora estilo e tom da escrita',
        icon: Sparkles,
        category: 'Linguagem',
        color: 'bg-secondary',
        config: { serviceType: 'style' },
        tags: ['estilo', 'tom', 'melhoria']
      }
    ]
  },
  {
    id: 'code',
    name: 'Código e Desenvolvimento',
    icon: Code,
    components: [
      {
        type: 'code-generator',
        label: 'Gerador de Código',
        description: 'Gera código em múltiplas linguagens',
        icon: Code,
        category: 'Desenvolvimento',
        color: 'bg-accent',
        config: { codeType: 'generation' },
        tags: ['código', 'programação', 'geração']
      },
      {
        type: 'code-reviewer',
        label: 'Revisor de Código',
        description: 'Revisa e sugere melhorias',
        icon: Search,
        category: 'Desenvolvimento',
        color: 'bg-primary',
        config: { codeType: 'review' },
        tags: ['código', 'revisão', 'qualidade']
      },
      {
        type: 'bug-finder',
        label: 'Detector de Bugs',
        description: 'Encontra e corrige bugs no código',
        icon: Shield,
        category: 'Desenvolvimento',
        color: 'bg-secondary',
        config: { codeType: 'debug' },
        tags: ['depuração', 'bugs', 'correções']
      },
      {
        type: 'documentation',
        label: 'Documentador de Código',
        description: 'Gera documentação de código',
        icon: FileText,
        category: 'Desenvolvimento',
        color: 'bg-accent',
        config: { codeType: 'documentation' },
        tags: ['documentação', 'comentários', 'explicação']
      }
    ]
  },
  {
    id: 'conversation',
    name: 'IA Conversacional',
    icon: Bot,
    components: [
      {
        type: 'chatbot',
        label: 'Chatbot',
        description: 'Agente conversacional interativo',
        icon: Bot,
        category: 'Conversa',
        color: 'bg-primary',
        config: { botType: 'general' },
        tags: ['chatbot', 'conversa', 'interativo']
      },
      {
        type: 'customer-support',
        label: 'Bot de Suporte ao Cliente',
        description: 'Agente especializado em atendimento',
        icon: MessageSquare,
        category: 'Conversa',
        color: 'bg-secondary',
        config: { botType: 'support' },
        tags: ['suporte', 'cliente', 'atendimento']
      },
      {
        type: 'sales-assistant',
        label: 'Assistente de Vendas',
        description: 'Representante de vendas com IA',
        icon: BarChart3,
        category: 'Conversa',
        color: 'bg-accent',
        config: { botType: 'sales' },
        tags: ['vendas', 'assistente', 'conversão']
      }
    ]
  },
  {
    id: 'tools',
    name: 'Ferramentas Externas',
    icon: Workflow,
    components: [
      {
        type: 'web-search',
        label: 'Busca na Web',
        description: 'Busca informações na internet',
        icon: Search,
        category: 'Ferramentas',
        color: 'bg-secondary',
        config: { toolType: 'web-search' },
        tags: ['busca', 'web', 'informação']
      },
      {
        type: 'database',
        label: 'Consulta de Banco de Dados',
        description: 'Conecta e consulta bancos de dados',
        icon: Database,
        category: 'Ferramentas',
        color: 'bg-accent',
        config: { toolType: 'database' },
        tags: ['banco de dados', 'consulta', 'dados']
      },
      {
        type: 'api-call',
        label: 'Integração de API',
        description: 'Faz requisições HTTP para APIs',
        icon: Globe,
        category: 'Ferramentas',
        color: 'bg-primary',
        config: { toolType: 'api' },
        tags: ['api', 'integração', 'http']
      },
      {
        type: 'calculator',
        label: 'Calculadora',
        description: 'Realiza cálculos matemáticos',
        icon: Calculator,
        category: 'Ferramentas',
        color: 'bg-secondary',
        config: { toolType: 'calculator' },
        tags: ['matemática', 'cálculo', 'números']
      }
    ]
  }
];

const flowTemplates: Template[] = [
  {
    id: 'assistente-suporte',
    name: 'Assistente de Suporte ao Cliente',
    description: 'Sistema completo de atendimento com análise de sentimento e respostas automatizadas',
    icon: Headphones,
    color: 'from-primary to-secondary',
    difficulty: 'Iniciante',
    estimatedTime: '5 min',
    tags: ['suporte', 'cliente', 'chatbot'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { 
          label: 'Mensagem do Cliente', 
          description: 'Captura a mensagem do cliente',
          config: { placeholder: 'Digite sua dúvida...' }
        }
      },
      {
        id: 'sentiment-1',
        type: 'sentiment',
        position: { x: 400, y: 50 },
        data: { 
          label: 'Análise de Sentimento', 
          description: 'Analisa o humor do cliente',
          config: { model: 'gemini-pro', language: 'pt-BR' }
        }
      },
      {
        id: 'customer-support-1',
        type: 'customer-support',
        position: { x: 400, y: 150 },
        data: { 
          label: 'Bot de Suporte', 
          description: 'Responde às perguntas do cliente',
          config: { 
            model: 'gemini-pro',
            personality: 'atencioso e prestativo',
            language: 'pt-BR',
            knowledgeBase: 'suporte-geral'
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 700, y: 100 },
        data: { 
          label: 'Resposta Final', 
          description: 'Entrega a resposta personalizada'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'sentiment-1' },
      { id: 'e2', source: 'input-1', target: 'customer-support-1' },
      { id: 'e3', source: 'sentiment-1', target: 'customer-support-1' },
      { id: 'e4', source: 'customer-support-1', target: 'output-1' }
    ]
  },
  {
    id: 'gerador-conteudo',
    name: 'Gerador de Conteúdo Completo',
    description: 'Pipeline para criação de blog posts, redes sociais e emails marketing',
    icon: PenTool,
    color: 'from-secondary to-accent',
    difficulty: 'Intermediário',
    estimatedTime: '10 min',
    tags: ['conteúdo', 'marketing', 'escrita'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { 
          label: 'Tópico do Conteúdo', 
          description: 'Insira o tema ou palavras-chave',
          config: { placeholder: 'Ex: marketing digital, sustentabilidade...' }
        }
      },
      {
        id: 'keyword-1',
        type: 'keyword-extraction',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Palavras-chave SEO', 
          description: 'Extrai palavras-chave relevantes',
          config: { model: 'gemini-pro', language: 'pt-BR' }
        }
      },
      {
        id: 'blog-1',
        type: 'blog-writer',
        position: { x: 600, y: 50 },
        data: { 
          label: 'Post de Blog', 
          description: 'Gera artigo completo para blog',
          config: { 
            model: 'gemini-pro',
            tone: 'profissional',
            length: 'médio',
            includeIntro: true,
            includeConclusao: true
          }
        }
      },
      {
        id: 'social-1',
        type: 'social-media',
        position: { x: 600, y: 150 },
        data: { 
          label: 'Posts Redes Sociais', 
          description: 'Cria posts para Instagram, LinkedIn',
          config: { 
            platforms: ['instagram', 'linkedin', 'facebook'],
            tone: 'engajante'
          }
        }
      },
      {
        id: 'email-1',
        type: 'email-composer',
        position: { x: 600, y: 250 },
        data: { 
          label: 'Email Marketing', 
          description: 'Cria campanhas de email',
          config: { 
            type: 'newsletter',
            tone: 'persuasivo'
          }
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'keyword-1' },
      { id: 'e2', source: 'keyword-1', target: 'blog-1' },
      { id: 'e3', source: 'keyword-1', target: 'social-1' },
      { id: 'e4', source: 'keyword-1', target: 'email-1' }
    ]
  },
  {
    id: 'analise-dados',
    name: 'Dashboard de Análise de Texto',
    description: 'Análise completa com sentimento, entidades e insights',
    icon: BarChart3,
    color: 'from-accent to-primary',
    difficulty: 'Intermediário',
    estimatedTime: '8 min',
    tags: ['análise', 'dados', 'insights'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 200 },
        data: { 
          label: 'Texto para Análise', 
          description: 'Texto que será analisado',
          config: { placeholder: 'Cole aqui o texto para análise...' }
        }
      },
      {
        id: 'sentiment-1',
        type: 'sentiment',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Análise de Sentimento', 
          description: 'Avalia o tom emocional',
          config: { model: 'gemini-pro', detalhado: true }
        }
      },
      {
        id: 'entity-1',
        type: 'entity-extraction',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Extração de Entidades', 
          description: 'Identifica pessoas, lugares, organizações',
          config: { tipos: ['PESSOA', 'LOCAL', 'ORGANIZACAO', 'DATA'] }
        }
      },
      {
        id: 'keyword-1',
        type: 'keyword-extraction',
        position: { x: 350, y: 300 },
        data: { 
          label: 'Palavras-chave', 
          description: 'Extrai termos importantes',
          config: { quantidade: 10, relevancia: 'alta' }
        }
      },
      {
        id: 'classification-1',
        type: 'text-classification',
        position: { x: 600, y: 150 },
        data: { 
          label: 'Classificação', 
          description: 'Categoriza o conteúdo',
          config: { categorias: ['positivo', 'neutro', 'negativo', 'urgente'] }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 850, y: 200 },
        data: { 
          label: 'Relatório de Análise', 
          description: 'Resultado completo da análise'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'sentiment-1' },
      { id: 'e2', source: 'input-1', target: 'entity-1' },
      { id: 'e3', source: 'input-1', target: 'keyword-1' },
      { id: 'e4', source: 'sentiment-1', target: 'classification-1' },
      { id: 'e5', source: 'entity-1', target: 'output-1' },
      { id: 'e6', source: 'keyword-1', target: 'output-1' },
      { id: 'e7', source: 'classification-1', target: 'output-1' }
    ]
  },
  {
    id: 'tradutor-multilenguas',
    name: 'Tradutor Profissional Multilingue',
    description: 'Serviço de tradução com verificação de qualidade e adaptação cultural',
    icon: Languages,
    color: 'from-primary to-accent',
    difficulty: 'Iniciante',
    estimatedTime: '5 min',
    tags: ['tradução', 'multilingue', 'comunicação'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { 
          label: 'Texto Original', 
          description: 'Texto para traduzir',
          config: { placeholder: 'Digite o texto para tradução...' }
        }
      },
      {
        id: 'translator-1',
        type: 'translator',
        position: { x: 400, y: 100 },
        data: { 
          label: 'Tradutor Principal', 
          description: 'Traduz para o idioma alvo',
          config: { 
            from: 'pt',
            to: 'en',
            model: 'gemini-pro',
            preserveFormatting: true
          }
        }
      },
      {
        id: 'grammar-1',
        type: 'grammar-checker',
        position: { x: 400, y: 200 },
        data: { 
          label: 'Verificação Gramatical', 
          description: 'Verifica gramática da tradução',
          config: { language: 'en', correctAutomatically: true }
        }
      },
      {
        id: 'style-1',
        type: 'style-enhancer',
        position: { x: 700, y: 150 },
        data: { 
          label: 'Refinamento de Estilo', 
          description: 'Melhora o estilo da tradução',
          config: { 
            tone: 'natural',
            culturalAdaptation: true
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 1000, y: 150 },
        data: { 
          label: 'Tradução Final', 
          description: 'Texto traduzido e refinado'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'translator-1' },
      { id: 'e2', source: 'translator-1', target: 'grammar-1' },
      { id: 'e3', source: 'grammar-1', target: 'style-1' },
      { id: 'e4', source: 'style-1', target: 'output-1' }
    ]
  },
  {
    id: 'revisor-codigo',
    name: 'Revisor de Código Inteligente',
    description: 'Sistema completo de revisão, detecção de bugs e geração de documentação',
    icon: Code,
    color: 'from-secondary to-primary',
    difficulty: 'Avançado',
    estimatedTime: '12 min',
    tags: ['código', 'revisão', 'qualidade'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 200 },
        data: { 
          label: 'Código Fonte', 
          description: 'Cole o código para revisão',
          config: { 
            placeholder: 'Cole aqui o código para análise...',
            multiline: true
          }
        }
      },
      {
        id: 'code-reviewer-1',
        type: 'code-reviewer',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Análise de Qualidade', 
          description: 'Revisa a qualidade do código',
          config: { 
            language: 'auto',
            checkStyle: true,
            checkPerformance: true,
            checkSecurity: true
          }
        }
      },
      {
        id: 'bug-finder-1',
        type: 'bug-finder',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Detector de Bugs', 
          description: 'Encontra possíveis bugs e vulnerabilidades',
          config: { 
            severity: ['crítico', 'alto', 'médio'],
            includeSecurityIssues: true
          }
        }
      },
      {
        id: 'documentation-1',
        type: 'documentation',
        position: { x: 350, y: 300 },
        data: { 
          label: 'Gerador de Documentação', 
          description: 'Cria documentação automática',
          config: { 
            style: 'JSDoc',
            includeExamples: true,
            language: 'pt-BR'
          }
        }
      },
      {
        id: 'code-generator-1',
        type: 'code-generator',
        position: { x: 600, y: 200 },
        data: { 
          label: 'Sugestões de Melhoria', 
          description: 'Gera código melhorado',
          config: { 
            optimizeFor: 'readability',
            includeTests: true
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 850, y: 200 },
        data: { 
          label: 'Relatório de Revisão', 
          description: 'Relatório completo da análise'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'code-reviewer-1' },
      { id: 'e2', source: 'input-1', target: 'bug-finder-1' },
      { id: 'e3', source: 'input-1', target: 'documentation-1' },
      { id: 'e4', source: 'code-reviewer-1', target: 'code-generator-1' },
      { id: 'e5', source: 'bug-finder-1', target: 'code-generator-1' },
      { id: 'e6', source: 'code-generator-1', target: 'output-1' },
      { id: 'e7', source: 'documentation-1', target: 'output-1' }
    ]
  },
  {
    id: 'assistente-vendas',
    name: 'Assistente de Vendas Inteligente',
    description: 'Bot especializado em qualificação de leads e suporte a vendas',
    icon: TrendingUp,
    color: 'from-accent to-secondary',
    difficulty: 'Intermediário',
    estimatedTime: '8 min',
    tags: ['vendas', 'leads', 'crm'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { 
          label: 'Interesse do Cliente', 
          description: 'Captura interesse e necessidades',
          config: { placeholder: 'Descreva o que precisa...' }
        }
      },
      {
        id: 'entity-1',
        type: 'entity-extraction',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Qualificação de Lead', 
          description: 'Extrai informações do prospect',
          config: { 
            extractCompany: true,
            extractBudget: true,
            extractTimeline: true
          }
        }
      },
      {
        id: 'sales-assistant-1',
        type: 'sales-assistant',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Consultor de Vendas', 
          description: 'Responde perguntas e qualifica',
          config: { 
            salesPersonality: 'consultivo',
            products: 'catalogo-geral',
            upselling: true
          }
        }
      },
      {
        id: 'email-1',
        type: 'email-composer',
        position: { x: 600, y: 100 },
        data: { 
          label: 'Follow-up Email', 
          description: 'Cria email de acompanhamento',
          config: { 
            template: 'sales-followup',
            personalized: true
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 600, y: 200 },
        data: { 
          label: 'Proposta Personalizada', 
          description: 'Gera proposta baseada no perfil'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'entity-1' },
      { id: 'e2', source: 'input-1', target: 'sales-assistant-1' },
      { id: 'e3', source: 'entity-1', target: 'sales-assistant-1' },
      { id: 'e4', source: 'sales-assistant-1', target: 'email-1' },
      { id: 'e5', source: 'sales-assistant-1', target: 'output-1' }
    ]
  },
  {
    id: 'pesquisador-inteligente',
    name: 'Pesquisador Inteligente',
    description: 'Sistema de pesquisa avançada com análise e síntese de informações',
    icon: Search,
    color: 'from-primary to-secondary',
    difficulty: 'Intermediário',
    estimatedTime: '10 min',
    tags: ['pesquisa', 'análise', 'síntese'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { 
          label: 'Tópico de Pesquisa', 
          description: 'Defina o que pesquisar',
          config: { placeholder: 'Ex: tendências de IA em 2024...' }
        }
      },
      {
        id: 'web-search-1',
        type: 'web-search',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Busca na Web', 
          description: 'Pesquisa informações atualizadas',
          config: { 
            sources: ['google', 'bing'],
            resultsCount: 10,
            language: 'pt-BR'
          }
        }
      },
      {
        id: 'entity-1',
        type: 'entity-extraction',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Análise de Conteúdo', 
          description: 'Extrai informações relevantes',
          config: { 
            extractDates: true,
            extractPeople: true,
            extractStatistics: true
          }
        }
      },
      {
        id: 'summary-1',
        type: 'summary-generator',
        position: { x: 600, y: 100 },
        data: { 
          label: 'Síntese de Pesquisa', 
          description: 'Resume os achados principais',
          config: { 
            length: 'detalhado',
            includeQuotes: true,
            structuredFormat: true
          }
        }
      },
      {
        id: 'blog-1',
        type: 'blog-writer',
        position: { x: 600, y: 200 },
        data: { 
          label: 'Artigo de Pesquisa', 
          description: 'Transforma pesquisa em artigo',
          config: { 
            style: 'acadêmico',
            includeSources: true,
            includeGraphics: true
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 850, y: 150 },
        data: { 
          label: 'Relatório Final', 
          description: 'Resultado completo da pesquisa'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'web-search-1' },
      { id: 'e2', source: 'web-search-1', target: 'entity-1' },
      { id: 'e3', source: 'entity-1', target: 'summary-1' },
      { id: 'e4', source: 'entity-1', target: 'blog-1' },
      { id: 'e5', source: 'summary-1', target: 'output-1' },
      { id: 'e6', source: 'blog-1', target: 'output-1' }
    ]
  },
  {
    id: 'moderador-comunidade',
    name: 'Moderador de Comunidade IA',
    description: 'Sistema de moderação automática para redes sociais e fóruns',
    icon: Shield,
    color: 'from-secondary to-accent',
    difficulty: 'Avançado',
    estimatedTime: '15 min',
    tags: ['moderação', 'comunidade', 'segurança'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 200 },
        data: { 
          label: 'Conteúdo da Postagem', 
          description: 'Recebe postagens para moderação',
          config: { placeholder: 'Cole aqui o conteúdo para moderar...' }
        }
      },
      {
        id: 'sentiment-1',
        type: 'sentiment',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Análise de Toxicidade', 
          description: 'Detecta conteúdo tóxico ou ofensivo',
          config: { 
            detectHate: true,
            detectSpam: true,
            detectHarassment: true
          }
        }
      },
      {
        id: 'classification-1',
        type: 'text-classification',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Classificação de Conteúdo', 
          description: 'Categoriza tipo de conteúdo',
          config: { 
            categories: ['apropriado', 'questionável', 'inapropriado', 'spam'],
            confidenceThreshold: 0.8
          }
        }
      },
      {
        id: 'entity-1',
        type: 'entity-extraction',
        position: { x: 350, y: 300 },
        data: { 
          label: 'Detecção de Violações', 
          description: 'Identifica violações específicas',
          config: { 
            detectPII: true,
            detectCopyright: true,
            detectLinks: true
          }
        }
      },
      {
        id: 'llm-1',
        type: 'llm',
        position: { x: 600, y: 150 },
        data: { 
          label: 'Decisão de Moderação', 
          description: 'Decide ação a ser tomada',
          config: { 
            role: 'moderador',
            actions: ['aprovar', 'revisar', 'rejeitar', 'banir'],
            explainDecision: true
          }
        }
      },
      {
        id: 'email-1',
        type: 'email-composer',
        position: { x: 600, y: 250 },
        data: { 
          label: 'Notificação ao Usuário', 
          description: 'Envia feedback sobre moderação',
          config: { 
            template: 'moderation-feedback',
            includeGuidelines: true
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 850, y: 200 },
        data: { 
          label: 'Ação de Moderação', 
          description: 'Resultado da moderação automática'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'sentiment-1' },
      { id: 'e2', source: 'input-1', target: 'classification-1' },
      { id: 'e3', source: 'input-1', target: 'entity-1' },
      { id: 'e4', source: 'sentiment-1', target: 'llm-1' },
      { id: 'e5', source: 'classification-1', target: 'llm-1' },
      { id: 'e6', source: 'entity-1', target: 'llm-1' },
      { id: 'e7', source: 'llm-1', target: 'email-1' },
      { id: 'e8', source: 'llm-1', target: 'output-1' }
    ]
  },
  {
    id: 'tutor-educacional',
    name: 'Tutor Educacional Personalizado',
    description: 'Sistema de ensino adaptativo com avaliação e feedback personalizado',
    icon: GraduationCap,
    color: 'from-accent to-primary',
    difficulty: 'Avançado',
    estimatedTime: '12 min',
    tags: ['educação', 'tutoria', 'aprendizado'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 150 },
        data: { 
          label: 'Pergunta do Estudante', 
          description: 'Recebe dúvidas e questões',
          config: { placeholder: 'Digite sua pergunta ou exercício...' }
        }
      },
      {
        id: 'classification-1',
        type: 'text-classification',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Análise de Nível', 
          description: 'Identifica nível de dificuldade',
          config: { 
            categories: ['básico', 'intermediário', 'avançado'],
            subject: 'auto-detect'
          }
        }
      },
      {
        id: 'llm-1',
        type: 'llm',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Tutor Inteligente', 
          description: 'Responde de forma pedagógica',
          config: { 
            role: 'tutor-educacional',
            adaptToLevel: true,
            includeExamples: true,
            encourageThinking: true
          }
        }
      },
      {
        id: 'code-generator-1',
        type: 'code-generator',
        position: { x: 600, y: 100 },
        data: { 
          label: 'Exercícios Práticos', 
          description: 'Gera exercícios relacionados',
          config: { 
            difficulty: 'adaptive',
            includeHints: true,
            stepByStep: true
          }
        }
      },
      {
        id: 'summary-1',
        type: 'summary-generator',
        position: { x: 600, y: 200 },
        data: { 
          label: 'Resumo da Lição', 
          description: 'Cria resumo dos conceitos',
          config: { 
            includeKeyPoints: true,
            visualAids: true,
            nextSteps: true
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 850, y: 150 },
        data: { 
          label: 'Plano de Estudos', 
          description: 'Material educacional personalizado'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'classification-1' },
      { id: 'e2', source: 'input-1', target: 'llm-1' },
      { id: 'e3', source: 'classification-1', target: 'llm-1' },
      { id: 'e4', source: 'llm-1', target: 'code-generator-1' },
      { id: 'e5', source: 'llm-1', target: 'summary-1' },
      { id: 'e6', source: 'code-generator-1', target: 'output-1' },
      { id: 'e7', source: 'summary-1', target: 'output-1' }
    ]
  },
  {
    id: 'consultor-negocios',
    name: 'Consultor de Negócios IA',
    description: 'Análise empresarial com insights estratégicos e planos de ação',
    icon: Building,
    color: 'from-primary to-accent',
    difficulty: 'Avançado',
    estimatedTime: '18 min',
    tags: ['negócios', 'estratégia', 'consultoria'],
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 200 },
        data: { 
          label: 'Situação do Negócio', 
          description: 'Descreva o desafio empresarial',
          config: { 
            placeholder: 'Descreva a situação atual da empresa...',
            multiline: true
          }
        }
      },
      {
        id: 'entity-1',
        type: 'entity-extraction',
        position: { x: 350, y: 100 },
        data: { 
          label: 'Análise de Mercado', 
          description: 'Extrai informações do mercado',
          config: { 
            extractCompetitors: true,
            extractMarketSize: true,
            extractTrends: true
          }
        }
      },
      {
        id: 'web-search-1',
        type: 'web-search',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Pesquisa de Tendências', 
          description: 'Busca dados atuais do setor',
          config: { 
            focusOn: 'business-trends',
            includeStatistics: true,
            timeFrame: 'recent'
          }
        }
      },
      {
        id: 'classification-1',
        type: 'text-classification',
        position: { x: 350, y: 300 },
        data: { 
          label: 'Análise SWOT', 
          description: 'Identifica forças, fraquezas, oportunidades',
          config: { 
            categories: ['força', 'fraqueza', 'oportunidade', 'ameaça'],
            businessContext: true
          }
        }
      },
      {
        id: 'llm-1',
        type: 'llm',
        position: { x: 600, y: 150 },
        data: { 
          label: 'Consultor Estratégico', 
          description: 'Gera insights e recomendações',
          config: { 
            role: 'consultor-sênior',
            includeActionPlan: true,
            includeMetrics: true,
            includeTimeline: true
          }
        }
      },
      {
        id: 'blog-1',
        type: 'blog-writer',
        position: { x: 600, y: 250 },
        data: { 
          label: 'Plano de Negócios', 
          description: 'Elabora plano estruturado',
          config: { 
            format: 'business-plan',
            includeFinancials: true,
            includeStrategy: true
          }
        }
      },
      {
        id: 'email-1',
        type: 'email-composer',
        position: { x: 850, y: 100 },
        data: { 
          label: 'Resumo Executivo', 
          description: 'Cria apresentação para executivos',
          config: { 
            audience: 'executives',
            format: 'professional',
            includeGraphs: true
          }
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 850, y: 200 },
        data: { 
          label: 'Consultoria Completa', 
          description: 'Relatório final com estratégias'
        }
      }
    ],
    connections: [
      { id: 'e1', source: 'input-1', target: 'entity-1' },
      { id: 'e2', source: 'input-1', target: 'web-search-1' },
      { id: 'e3', source: 'input-1', target: 'classification-1' },
      { id: 'e4', source: 'entity-1', target: 'llm-1' },
      { id: 'e5', source: 'web-search-1', target: 'llm-1' },
      { id: 'e6', source: 'classification-1', target: 'llm-1' },
      { id: 'e7', source: 'llm-1', target: 'blog-1' },
      { id: 'e8', source: 'llm-1', target: 'email-1' },
      { id: 'e9', source: 'blog-1', target: 'output-1' },
      { id: 'e10', source: 'email-1', target: 'output-1' }
    ]
  }
];

interface FlowSidebarProps {
  isOpen: boolean;
  onAddNode: (type: string, position?: { x: number; y: number }) => void;
  onLoadTemplate: (template: Template) => void;
}

export const FlowSidebar = ({ isOpen, onAddNode, onLoadTemplate }: FlowSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredComponents = advancedComponents.flatMap(category => 
    category.components.filter(component =>
      component.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter(component => 
      selectedCategory === 'all' || category.id === selectedCategory
    )
  );

  const filteredTemplates = flowTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('FlowSidebar rendered with:', {
    isOpen,
    templatesCount: filteredTemplates.length,
    componentsCount: filteredComponents.length,
    totalTemplates: flowTemplates.length
  });

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-primary">Mangaba AI</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar componentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
        </div>
      </div>

      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 m-4 mb-2">
          <TabsTrigger value="components">Componentes ({filteredComponents.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates ({filteredTemplates.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="flex-1 px-4 pb-4 mt-0">
          <ScrollArea className="h-full">
            <div className="space-y-2 mb-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="w-full justify-start"
              >
                Todos os Componentes
              </Button>
              {advancedComponents.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full justify-start"
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredComponents.map((component, index) => (
                <Card
                  key={`${component.type}-${index}`}
                  className="p-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
                  onClick={() => onAddNode(component.type)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${component.color} flex items-center justify-center flex-shrink-0`}>
                      <component.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {component.label}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {component.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {component.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 px-4 pb-4 mt-0">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {filteredTemplates.map(template => (
                <Card
                  key={template.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-card border border-border"
                  onClick={() => {
                    console.log('Template clicked:', template.name);
                    onLoadTemplate(template);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm text-foreground">
                          {template.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {template.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {template.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};