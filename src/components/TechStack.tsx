import React from 'react';
import { Mic, Brain, Cpu, GitBranch, Code, Zap } from 'lucide-react';

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="py-24 px-4 gradient-bg text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technology Stack
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Powered by cutting-edge AI and blockchain technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
          <div className="card bg-white/10 backdrop-blur-sm text-white border border-white/20" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-md bg-primary-400/30">
                <Mic className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold ml-4">Voice AI</h3>
            </div>
            <p className="opacity-90 mb-6 text-lg">
              Process natural language voice commands with Web Speech API and advanced speech recognition algorithms.
            </p>
            <div className="text-sm opacity-80 border-t border-white/10 pt-6 mt-auto">
              <div className="flex justify-between mb-2">
                <span>Accuracy</span>
                <span>98.5%</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary-500 h-full rounded-full" style={{ width: '98.5%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="card bg-white/10 backdrop-blur-sm text-white border border-white/20" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-md bg-primary-400/30">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold ml-4">Bolt AI</h3>
            </div>
            <p className="opacity-90 mb-6 text-lg">
              AI-powered analysis engine that identifies vulnerabilities and suggests security improvements for your smart contracts.
            </p>
            <div className="text-sm opacity-80 border-t border-white/10 pt-6 mt-auto">
              <div className="flex justify-between mb-2">
                <span>Detection Rate</span>
                <span>99.2%</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary-500 h-full rounded-full" style={{ width: '99.2%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="card bg-white/10 backdrop-blur-sm text-white border border-white/20" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-md bg-primary-400/30">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold ml-4">Blockchain</h3>
            </div>
            <p className="opacity-90 mb-6 text-lg">
              Connect directly to multiple blockchain networks for real-time smart contract analysis using Web3.js integration.
            </p>
            <div className="text-sm opacity-80 border-t border-white/10 pt-6 mt-auto">
              <div className="flex justify-between mb-2">
                <span>Networks</span>
                <span>4+</span>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-2">
                <div className="h-3 rounded-full bg-blue-500"></div>
                <div className="h-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 rounded-full bg-purple-500"></div>
                <div className="h-3 rounded-full bg-red-500"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 max-w-6xl mx-auto" data-aos="fade-up">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-10">
            <h3 className="text-3xl font-bold mb-8 text-center">Architecture Diagram</h3>
            
            <div className="relative h-80 md:h-96">
              {/* Architecture diagram with connecting lines */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M200,200 L400,150 L600,200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M400,150 L400,250" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M200,200 L400,250 L600,200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
              
              {/* Component blocks */}
              <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                <div className="w-full h-full flex flex-col items-center justify-center bg-primary-600/80 rounded-xl p-6 text-center">
                  <Mic className="w-10 h-10 mb-3" />
                  <p className="font-medium">Voice Input</p>
                  <p className="text-xs mt-2 opacity-80">Web Speech API</p>
                </div>
              </div>
              
              <div className="absolute left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                <div className="w-full h-full flex flex-col items-center justify-center bg-primary-600/80 rounded-xl p-6 text-center">
                  <Brain className="w-10 h-10 mb-3" />
                  <p className="font-medium">AI Analysis</p>
                  <p className="text-xs mt-2 opacity-80">Bolt ML Model</p>
                </div>
              </div>
              
              <div className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                <div className="w-full h-full flex flex-col items-center justify-center bg-primary-600/80 rounded-xl p-6 text-center">
                  <Cpu className="w-10 h-10 mb-3" />
                  <p className="font-medium">Blockchain</p>
                  <p className="text-xs mt-2 opacity-80">Web3.js</p>
                </div>
              </div>
              
              <div className="absolute left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                <div className="w-full h-full flex flex-col items-center justify-center bg-primary-600/80 rounded-xl p-6 text-center">
                  <Code className="w-10 h-10 mb-3" />
                  <p className="font-medium">Audit Report</p>
                  <p className="text-xs mt-2 opacity-80">Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center" data-aos="fade-up">
          <h3 className="text-3xl font-bold mb-8">Performance Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-3">Response Time</h4>
              <p className="text-4xl font-bold mb-2">0.5s</p>
              <p className="text-sm opacity-80">Average</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-3">Accuracy</h4>
              <p className="text-4xl font-bold mb-2">99.2%</p>
              <p className="text-sm opacity-80">Detection rate</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-3">Vulnerabilities</h4>
              <p className="text-4xl font-bold mb-2">25+</p>
              <p className="text-sm opacity-80">Detected types</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-3">Lighthouse</h4>
              <p className="text-4xl font-bold mb-2">97+</p>
              <p className="text-sm opacity-80">Performance score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;