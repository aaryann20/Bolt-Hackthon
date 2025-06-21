import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const ProcessFlow: React.FC = () => {
  return (
    <div className="bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Processing Flow</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Flow Diagram */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-8">Real-Time Processing</h3>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-primary-600" />
                </div>
                <div className="ml-6">
                  <h4 className="font-medium text-lg">Voice Command Processing</h4>
                  <p className="text-gray-600">Natural language to structured data</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </div>
                <div className="ml-6">
                  <h4 className="font-medium text-lg">Risk Analysis</h4>
                  <p className="text-gray-600">Multi-layer security scanning</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-6">
                  <h4 className="font-medium text-lg">Verification</h4>
                  <p className="text-gray-600">Blockchain-based proof generation</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Metrics */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-8">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary-600">99.9%</div>
                <div className="text-gray-600 mt-2">Accuracy Rate</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary-600">&lt;1.2s</div>
                <div className="text-gray-600 mt-2">Response Time</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary-600">25+</div>
                <div className="text-gray-600 mt-2">Vulnerability Types</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary-600">5M+</div>
                <div className="text-gray-600 mt-2">Contracts Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;