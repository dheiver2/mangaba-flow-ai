import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-mangaba-primary rounded-xl flex items-center justify-center animate-glow">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">
                Mangaba AI Flow
              </h1>
              <p className="text-xs text-muted-foreground">
                Construtor Visual de IA
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#demo" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Demonstração
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Preços
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/flow">
                Painel
              </Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-mangaba-primary hover:shadow-mangaba transition-all duration-300"
              asChild
            >
              <Link to="/flow">
                Começar a Construir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};