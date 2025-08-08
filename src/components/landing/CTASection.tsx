import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mangaba-hero opacity-5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-mangaba-gold/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <Card className="p-12 bg-gradient-card border-mangaba-gold/20 shadow-float text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-gradient-mangaba-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to build your first{' '}
              <span className="text-gradient">AI workflow</span>?
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers and businesses who are already using Mangaba AI Flow 
              to create powerful AI applications without code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-mangaba-primary hover:shadow-mangaba-lg transition-all duration-300 text-lg px-8 py-4 h-auto"
                asChild
              >
                <Link to="/flow">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Building for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-mangaba-gold text-mangaba-gold hover:bg-mangaba-gold hover:text-white transition-all duration-300 text-lg px-8 py-4 h-auto"
              >
                Schedule Demo
              </Button>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              No credit card required • Free forever plan • Enterprise options available
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};