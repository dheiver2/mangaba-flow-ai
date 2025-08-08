import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mangaba-hero opacity-10 animate-gradient"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-mangaba-gold/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mangaba-orange/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-mangaba-primary text-white border-0 px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Potencializado pelo Google Gemini AI
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Construa{' '}
            <span className="text-gradient">
              Fluxos de IA
            </span>
            {' '}Poderosos Visualmente
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Crie fluxos de trabalho de IA sofisticados com nossa interface intuitiva de arrastar e soltar. 
            Conecte LLMs, ferramentas e fontes de dados sem escrever uma única linha de código.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-mangaba-primary hover:shadow-mangaba-lg transition-all duration-300 text-lg px-8 py-4 h-auto"
              asChild
            >
              <Link to="/flow">
                <Zap className="mr-2 h-5 w-5" />
                Começar a Construir Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-mangaba-gold text-mangaba-gold hover:bg-mangaba-gold hover:text-white transition-all duration-300 text-lg px-8 py-4 h-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Assistir Demonstração
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-mangaba-green rounded-full"></div>
              Sem Código Necessário
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-mangaba-orange rounded-full"></div>
              Colaboração em Tempo Real
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-mangaba-yellow rounded-full"></div>
              Pronto para Empresas
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative">
          <div className="bg-gradient-card rounded-3xl p-8 shadow-float border border-mangaba-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sample Flow Node */}
              <div className="bg-white rounded-xl p-6 shadow-node border-l-4 border-mangaba-green">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-mangaba-green rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">Nó de Entrada</span>
                </div>
                <p className="text-sm text-muted-foreground">Capturar entrada do usuário</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-node border-l-4 border-mangaba-gold">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-mangaba-gold rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">Gemini AI</span>
                </div>
                <p className="text-sm text-muted-foreground">Processar com IA</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-node border-l-4 border-mangaba-orange">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-mangaba-orange rounded-lg flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">Saída</span>
                </div>
                <p className="text-sm text-muted-foreground">Exibir resultados</p>
              </div>
            </div>
            
            {/* Connection lines */}
            <div className="flex justify-center items-center mt-6">
              <div className="h-1 w-full bg-gradient-mangaba-primary rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};