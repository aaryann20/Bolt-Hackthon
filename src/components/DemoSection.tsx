import React, { useState } from 'react';
import { Mic, Code, AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { ContractAnalysis } from './ContractAnalysis';
import { AuditReport } from './AuditReport';

const blockchainNetworks = [
  { id: 'ethereum', name: 'Ethereum', color: 'bg-blue-500' },
  { id: 'bsc', name: 'BSC', color: 'bg-yellow-500' },
  { id: 'polygon', name: 'Polygon', color: 'bg-purple-500' },
  { id: 'avalanche', name: 'Avalanche', color: 'bg-red-500' }
];

const DemoSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedNetwork, setSelectedNetwork] = useState(blockchainNetworks[0]);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [contractInput, setContractInput] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const handleNetworkSelect = (network: typeof blockchainNetworks[0]) => {
    setSelectedNetwork(network);
    setIsNetworkDropdownOpen(false);
  };
  
  const handleVoiceInput = (text: string) => {
    setContractInput(text);
    // Mock proceeding to next step
    setTimeout(() => {
      setActiveStep(2);
      runAnalysis();
    }, 1000);
  };
  
  const runAnalysis = () => {
    setIsAnalyzing(true);
    // Mock analysis completion
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setActiveStep(3);
    }, 3000);
  };

  return (
    <section id="demo" className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interactive Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how ContractCompanion audits smart contracts in three simple steps
          </p>
        </div>
        
        {/* Network Selector */}
        <div className="max-w-6xl mx-auto mb-12 flex justify-end" data-aos="fade-left">
          <div className="relative">
            <button 
              onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
              className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-6 py-3 shadow-sm hover:border-primary-300 transition-colors"
            >
              <div className={`w-4 h-4 rounded-full ${selectedNetwork.color}`}></div>
              <span className="font-medium">{selectedNetwork.name}</span>
              <ChevronDown size={18} />
            </button>
            
            {isNetworkDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {blockchainNetworks.map(network => (
                  <button
                    key={network.id}
                    onClick={() => handleNetworkSelect(network)}
                    className="flex items-center space-x-3 w-full px-6 py-3 hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className={`w-4 h-4 rounded-full ${network.color}`}></div>
                    <span className="font-medium">{network.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Steps */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Step Navigation */}
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveStep(1)}
              className={`flex-1 py-6 px-6 text-center ${activeStep === 1 ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep === 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  <Mic size={20} />
                </div>
                <span className="hidden md:inline text-lg font-medium">Voice Input</span>
              </div>
            </button>
            
            <button 
              onClick={() => activeStep >= 2 && setActiveStep(2)}
              className={`flex-1 py-6 px-6 text-center ${activeStep === 2 ? 'border-b-2 border-primary-500 text-primary-600' : activeStep > 2 ? 'text-gray-500' : 'text-gray-300'}`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === 2 ? 'bg-primary-500 text-white' : 
                  activeStep > 2 ? 'bg-gray-200 text-gray-600' : 
                  'bg-gray-200 text-gray-400'
                }`}>
                  <Code size={20} />
                </div>
                <span className="hidden md:inline text-lg font-medium">Analysis</span>
              </div>
            </button>
            
            <button 
              onClick={() => activeStep >= 3 && setActiveStep(3)}
              className={`flex-1 py-6 px-6 text-center ${activeStep === 3 ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-300'}`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === 3 ? 'bg-primary-500 text-white' : 
                  'bg-gray-200 text-gray-400'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <span className="hidden md:inline text-lg font-medium">Results</span>
              </div>
            </button>
          </div>
          
          {/* Step Content */}
          <div className="p-8 min-h-[500px]">
            {activeStep === 1 && (
              <VoiceInput onVoiceInput={handleVoiceInput} />
            )}
            
            {activeStep === 2 && (
              <ContractAnalysis 
                isAnalyzing={isAnalyzing} 
                network={selectedNetwork}
                contractInput={contractInput}
              />
            )}
            
            {activeStep === 3 && (
              <AuditReport network={selectedNetwork} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;