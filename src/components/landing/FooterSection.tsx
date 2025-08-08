import { Separator } from '@/components/ui/separator';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-mangaba-sand/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-mangaba-primary rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gradient">
                  Mangaba AI Flow
                </h3>
                <p className="text-xs text-muted-foreground">
                  Construtor Visual de IA
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Construa fluxos de trabalho de IA poderosos com nossa interface visual intuitiva. 
              Sem código necessário.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-mangaba-gold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-mangaba-gold cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-mangaba-gold cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-mangaba-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-mangaba-gold transition-colors">Recursos</a></li>
              <li><a href="#pricing" className="hover:text-mangaba-gold transition-colors">Preços</a></li>
              <li><a href="#demo" className="hover:text-mangaba-gold transition-colors">Demonstração</a></li>
              <li><a href="#integrations" className="hover:text-mangaba-gold transition-colors">Integrações</a></li>
              <li><a href="#changelog" className="hover:text-mangaba-gold transition-colors">Histórico de Mudanças</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-mangaba-gold transition-colors">Sobre</a></li>
              <li><a href="#blog" className="hover:text-mangaba-gold transition-colors">Blog</a></li>
              <li><a href="#careers" className="hover:text-mangaba-gold transition-colors">Carreiras</a></li>
              <li><a href="#contact" className="hover:text-mangaba-gold transition-colors">Contato</a></li>
              <li><a href="#press" className="hover:text-mangaba-gold transition-colors">Kit de Imprensa</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#docs" className="hover:text-mangaba-gold transition-colors">Documentação</a></li>
              <li><a href="#tutorials" className="hover:text-mangaba-gold transition-colors">Tutoriais</a></li>
              <li><a href="#community" className="hover:text-mangaba-gold transition-colors">Comunidade</a></li>
              <li><a href="#support" className="hover:text-mangaba-gold transition-colors">Suporte</a></li>
              <li><a href="#status" className="hover:text-mangaba-gold transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>
            © 2024 Mangaba AI Flow. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-mangaba-gold transition-colors">Política de Privacidade</a>
            <a href="#terms" className="hover:text-mangaba-gold transition-colors">Termos de Serviço</a>
            <a href="#cookies" className="hover:text-mangaba-gold transition-colors">Política de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};