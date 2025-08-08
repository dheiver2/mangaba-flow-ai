import { Button } from '@/components/ui/button';
import { Menu, Play, Save, Settings, Zap, Home } from 'lucide-react';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { Link } from 'react-router-dom';

interface FlowHeaderProps {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
  onRunFlow?: () => void;
  isExecuting?: boolean;
}

export const FlowHeader = ({ onSidebarToggle, sidebarOpen, onRunFlow, isExecuting }: FlowHeaderProps) => {
  return (
    <header className="h-16 bg-gradient-mangaba-hero border-b border-border/30 flex items-center justify-between px-6 shadow-mangaba-lg animate-gradient relative overflow-hidden">
      {/* Particle effects */}
      <div className="particle-field">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-4 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="text-white hover:bg-white/20 transition-all duration-300"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-tropical rounded-xl flex items-center justify-center animate-bounce-gentle shadow-glow">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-lg">
              Mangaba AI Flow
            </h1>
            <p className="text-xs text-white/90 drop-shadow">
              Visual AI Flow Builder
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 relative z-10">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-white hover:bg-white/20 transition-all duration-300"
          asChild
        >
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-white hover:bg-white/20 transition-all duration-300"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Flow
        </Button>
        
        <Button 
          variant="secondary"
          size="sm"
          className="bg-white/20 text-white hover:bg-white/30 border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          onClick={onRunFlow}
          disabled={isExecuting}
        >
          <Play className="h-4 w-4 mr-2" />
          {isExecuting ? 'Running...' : 'Run Flow'}
        </Button>
        
        <ApiKeyModal />
      </div>
    </header>
  );
};