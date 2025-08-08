import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Sparkles, Bot, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { DemoSection } from '@/components/landing/DemoSection';
import { CTASection } from '@/components/landing/CTASection';
import { FooterSection } from '@/components/landing/FooterSection';
import { Navigation } from '@/components/landing/Navigation';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-canvas">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};