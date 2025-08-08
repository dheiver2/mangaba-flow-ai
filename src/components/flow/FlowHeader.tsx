import { Button } from '@/components/ui/button';
import { Menu, Play, Save, Settings, Zap } from 'lucide-react';

interface FlowHeaderProps {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

export const FlowHeader = ({ onSidebarToggle, sidebarOpen }: FlowHeaderProps) => {
  return (
    <header className="h-16 bg-gradient-mangaba border-b border-border flex items-center justify-between px-6 shadow-mangaba">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="text-primary-foreground hover:bg-white/20"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-tropical rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">
              Mangaba AI Flow
            </h1>
            <p className="text-xs text-primary-foreground/80">
              Visual AI Flow Builder
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-primary-foreground hover:bg-white/20"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Flow
        </Button>
        
        <Button 
          variant="secondary"
          size="sm"
          className="bg-white/20 text-primary-foreground hover:bg-white/30 border-white/30"
        >
          <Play className="h-4 w-4 mr-2" />
          Run Flow
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-white/20"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};