import React from 'react';
import { Brain, Activity, Shield, Mic } from 'lucide-react';

const FlowDiagram: React.FC = () => {
  const steps = [
    { icon: Mic, title: 'Voice Input', description: 'Natural language processing' },
    { icon: Brain, title: 'AI Analysis', description: 'Smart contract audit' },
    { icon: Activity, title: 'Risk Assessment', description: 'Vulnerability detection' },
    { icon: Shield, title: 'Security Report', description: 'Detailed recommendations' }
  ];

  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
        
        <div className="relative">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((Step, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white p-6 rounded-full shadow-xl mb-6 relative z-10 border-4 border-primary-100">
                  <Step.icon className="w-10 h-10 text-primary-500" />
                </div>
                <h3 className="font-bold text-xl mb-3">{Step.title}</h3>
                <p className="text-gray-600">{Step.description}</p>
                
                {/* Connection Arrow - Only show between steps, not after the last one */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-12 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowDiagram;