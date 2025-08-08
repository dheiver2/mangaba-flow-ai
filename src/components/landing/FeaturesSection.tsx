import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Workflow, 
  Bot, 
  Code, 
  Globe,
  Database,
  MessageSquare,
  Sparkles,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Integração Google Gemini',
    description: 'Aproveite o poder do mais recente modelo Gemini AI do Google para processamento e geração inteligente.',
    color: 'bg-mangaba-gold',
    gradient: 'bg-gradient-feature'
  },
  {
    icon: Workflow,
    title: 'Construtor de Fluxo Visual',
    description: 'Crie fluxos de trabalho de IA complexos com nossa interface intuitiva de arrastar e soltar. Não é necessário programar.',
    color: 'bg-mangaba-green',
    gradient: 'bg-gradient-tropical'
  },
  {
    icon: Zap,
    title: 'Execução em Tempo Real',
    description: 'Veja seus fluxos de IA em ação com execução em tempo real e feedback instantâneo dos resultados.',
    color: 'bg-mangaba-orange',
    gradient: 'bg-gradient-sunset'
  },
  {
    icon: Bot,
    title: 'Chatbots Inteligentes',
    description: 'Construa agentes conversacionais inteligentes que podem lidar com conversas complexas de múltiplas rodadas.',
    color: 'bg-mangaba-yellow',
    gradient: 'bg-gradient-mangaba-secondary'
  },
  {
    icon: Database,
    title: 'Integração de Dados',
    description: 'Conecte-se a bancos de dados, APIs e serviços externos para enriquecer seus fluxos de IA com dados reais.',
    color: 'bg-mangaba-earth',
    gradient: 'bg-gradient-card'
  },
  {
    icon: Shield,
    title: 'Segurança Empresarial',
    description: 'Construído com recursos de segurança de nível empresarial para proteger seus dados e fluxos de IA.',
    color: 'bg-mangaba-green-dark',
    gradient: 'bg-gradient-feature'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-mangaba-green/10 text-mangaba-green border-mangaba-green/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Recursos Poderosos
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Tudo que você precisa para construir{' '}
            <span className="text-gradient">fluxos de IA inteligentes</span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            De chatbots simples a processos complexos de IA multi-etapas, o Mangaba AI Flow 
            fornece todas as ferramentas que você precisa para dar vida às suas ideias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className={`p-8 ${feature.gradient} border-0 shadow-feature hover:shadow-mangaba transition-all duration-300 hover:scale-105 group`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Additional Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-mangaba-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Sem Código Necessário</h4>
            <p className="text-muted-foreground">Construa fluxos de trabalho de IA complexos sem escrever uma única linha de código.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-tropical rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Nativo da Nuvem</h4>
            <p className="text-muted-foreground">Implante e escale seus fluxos de IA na nuvem com confiabilidade empresarial.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Colaboração em Equipe</h4>
            <p className="text-muted-foreground">Trabalhe junto com sua equipe para construir e iterar fluxos de trabalho de IA.</p>
          </div>
        </div>
      </div>
    </section>
  );
};