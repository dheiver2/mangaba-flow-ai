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
            Powered by Google Gemini AI
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Build Powerful{' '}
            <span className="text-gradient">
              AI Flows
            </span>
            {' '}Visually
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Create sophisticated AI workflows with our intuitive drag-and-drop interface. 
            Connect LLMs, tools, and data sources without writing a single line of code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-mangaba-primary hover:shadow-mangaba-lg transition-all duration-300 text-lg px-8 py-4 h-auto"
              asChild
            >
              <Link to="/flow">
                <Zap className="mr-2 h-5 w-5" />
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-mangaba-gold text-mangaba-gold hover:bg-mangaba-gold hover:text-white transition-all duration-300 text-lg px-8 py-4 h-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-mangaba-green rounded-full"></div>
              No Code Required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-mangaba-orange rounded-full"></div>
              Real-time Collaboration
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-mangaba-yellow rounded-full"></div>
              Enterprise Ready
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
                  <span className="font-medium">Input Node</span>
                </div>
                <p className="text-sm text-muted-foreground">Capture user input</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-node border-l-4 border-mangaba-gold">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-mangaba-gold rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">Gemini AI</span>
                </div>
                <p className="text-sm text-muted-foreground">Process with AI</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-node border-l-4 border-mangaba-orange">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-mangaba-orange rounded-lg flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">Output</span>
                </div>
                <p className="text-sm text-muted-foreground">Display results</p>
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