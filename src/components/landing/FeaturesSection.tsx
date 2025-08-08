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
    title: 'Google Gemini Integration',
    description: 'Leverage the power of Google\'s latest Gemini AI model for intelligent processing and generation.',
    color: 'bg-mangaba-gold',
    gradient: 'bg-gradient-feature'
  },
  {
    icon: Workflow,
    title: 'Visual Flow Builder',
    description: 'Create complex AI workflows with our intuitive drag-and-drop interface. No coding required.',
    color: 'bg-mangaba-green',
    gradient: 'bg-gradient-tropical'
  },
  {
    icon: Zap,
    title: 'Real-time Execution',
    description: 'See your AI flows in action with real-time execution and instant feedback on results.',
    color: 'bg-mangaba-orange',
    gradient: 'bg-gradient-sunset'
  },
  {
    icon: Bot,
    title: 'Smart Chatbots',
    description: 'Build intelligent conversational agents that can handle complex multi-turn conversations.',
    color: 'bg-mangaba-yellow',
    gradient: 'bg-gradient-mangaba-secondary'
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Connect to databases, APIs, and external services to enrich your AI workflows with real data.',
    color: 'bg-mangaba-earth',
    gradient: 'bg-gradient-card'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Built with enterprise-grade security features to protect your data and AI workflows.',
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
            Powerful Features
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Everything you need to build{' '}
            <span className="text-gradient">intelligent AI workflows</span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            From simple chatbots to complex multi-step AI processes, Mangaba AI Flow 
            provides all the tools you need to bring your ideas to life.
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
            <h4 className="text-lg font-semibold text-foreground mb-2">No Code Needed</h4>
            <p className="text-muted-foreground">Build complex AI workflows without writing a single line of code.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-tropical rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Cloud Native</h4>
            <p className="text-muted-foreground">Deploy and scale your AI flows in the cloud with enterprise reliability.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Team Collaboration</h4>
            <p className="text-muted-foreground">Work together with your team to build and iterate on AI workflows.</p>
          </div>
        </div>
      </div>
    </section>
  );
};