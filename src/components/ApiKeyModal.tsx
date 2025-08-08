import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Settings, Key, Eye, EyeOff, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { ApiKeyManager } from '@/lib/apiServices';
import { useToast } from '@/hooks/use-toast';

export const ApiKeyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [hasValidKey, setHasValidKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = ApiKeyManager.getGeminiKey();
    if (storedKey) {
      setGeminiKey(storedKey);
      setHasValidKey(true);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (geminiKey.trim() && geminiKey.length > 20) { // Basic validation
      ApiKeyManager.setApiKey('geminiApiKey', geminiKey.trim());
      setHasValidKey(true);
      toast({
        title: "API Key saved successfully",
        description: "Your Gemini API key has been securely stored locally.",
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid Gemini API key (minimum 20 characters).",
        variant: "destructive"
      });
    }
  };

  const handleClear = () => {
    ApiKeyManager.clearApiKeys();
    setGeminiKey('');
    setHasValidKey(false);
    toast({
      title: "API Keys cleared",
      description: "All stored API keys have been removed.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={`text-white hover:bg-white/20 transition-all duration-300 ${hasValidKey ? 'border border-green-400/30' : 'border border-orange-400/30'}`}
        >
          {hasValidKey ? (
            <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
          ) : (
            <AlertCircle className="h-4 w-4 mr-2 text-orange-400" />
          )}
          <Settings className="h-4 w-4 mr-2" />
          API Settings
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-gradient-card border-mangaba-gold/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-mangaba-primary rounded-xl flex items-center justify-center">
              <Key className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-gradient-shimmer">API Configuration</span>
              <p className="text-sm text-muted-foreground font-normal">
                Configure your AI provider keys
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="gemini-key" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-mangaba-gold" />
                Google Gemini API Key
              </Label>
              <Badge 
                variant={hasValidKey ? "default" : "secondary"}
                className={hasValidKey ? "bg-mangaba-green text-white" : ""}
              >
                {hasValidKey ? "Configured" : "Required"}
              </Badge>
            </div>
            
            <div className="relative">
              <Input
                id="gemini-key"
                type={showKey ? "text" : "password"}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="pr-10 border-mangaba-gold/30 focus:border-mangaba-gold"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Get your free API key at: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-mangaba-gold hover:underline">Google AI Studio</a></p>
              <p>• Keys are stored securely in your browser's local storage</p>
              <p>• Your keys never leave your device</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-mangaba-gold/20">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-mangaba-gold/30"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="border-red-400/30 text-red-600 hover:bg-red-50"
          >
            Clear Keys
          </Button>
          <Button
            onClick={handleSave}
            disabled={!geminiKey.trim()}
            className="bg-gradient-mangaba-primary hover:shadow-mangaba transition-all duration-300 disabled:opacity-50"
          >
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};