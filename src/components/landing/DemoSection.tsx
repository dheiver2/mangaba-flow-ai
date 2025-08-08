import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Code, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoSection = () => {
  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-feature">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Play className="w-4 h-4 mr-2" />
            Demonstração ao Vivo
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Veja o Mangaba AI Flow em Ação
          </h2>
          
          <p className="text-xl text-white/80">
            Veja como é fácil construir fluxos de trabalho de IA poderosos com nossa interface visual.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Video/Preview */}
          <div className="relative">
            <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-mangaba-lg">
              <div className="aspect-video bg-gradient-canvas rounded-xl border border-mangaba-gold/20 flex items-center justify-center mb-6">
                <Button 
                  size="lg"
                  className="bg-gradient-mangaba-primary hover:shadow-glow transition-all duration-300"
                >
                  <Play className="mr-2 h-6 w-6" />
                  Assistir Vídeo de Demonstração
                </Button>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Construtor de Fluxo Interativo
                </h3>
                <p className="text-muted-foreground">
                  Veja como criar um chatbot de IA completo em menos de 5 minutos
                </p>
              </div>
            </Card>
          </div>

          {/* Demo Steps */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-mangaba-gold font-bold shadow-lg">
                1
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Componentes Arrastar e Soltar
                </h4>
                <p className="text-white/80">
                  Simplesmente arraste componentes de IA da barra lateral para construir seu fluxo de trabalho visualmente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-mangaba-gold font-bold shadow-lg">
                2
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Configurar com Gemini AI
                </h4>
                <p className="text-white/80">
                  Conecte-se ao Google Gemini e configure seus modelos de IA com alguns cliques.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-mangaba-gold font-bold shadow-lg">
                3
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Testar e Implantar
                </h4>
                <p className="text-white/80">
                  Teste seu fluxo em tempo real e implante em produção com um clique.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-mangaba-gold transition-all duration-300"
                asChild
              >
                <Link to="/flow">
                  Experimente Você Mesmo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/80">Fluxos de IA Criados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-white/80">Desenvolvedores Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-white/80">Tempo Ativo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/80">Suporte</div>
          </div>
        </div>
      </div>
    </section>
  );
};