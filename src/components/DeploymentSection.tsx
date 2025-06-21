import React, { useState } from 'react';
import { Globe, ExternalLink, Copy, CheckCircle } from 'lucide-react';

const DeploymentSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };
  
  return (
    <section id="deploy" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Deployment Configuration
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to deploy with Netlify and custom domain setup
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="card" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-md bg-primary-100">
                <Globe className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold ml-3">Entri Domain Setup</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Configure your custom domain with these simple steps using Entri CLI:
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-white overflow-auto relative">
              <pre className="whitespace-pre-wrap">
{`# Install Entri CLI
npm install -g @entri/cli

# Login to Entri
entri login

# Add your domain
entri domains:add your-app.com

# Configure SSL certificate
entri ssl:auto --force

# Verify domain configuration
entri domains:verify your-app.com`}
              </pre>
              
              <button 
                onClick={() => copyToClipboard(`# Install Entri CLI
npm install -g @entri/cli

# Login to Entri
entri login

# Add your domain
entri domains:add your-app.com

# Configure SSL certificate
entri ssl:auto --force

# Verify domain configuration
entri domains:verify your-app.com`)}
                className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Copy code"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">DNS Configuration</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 text-sm font-medium">
                  Required Records
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Name</div>
                    <div className="font-medium">Value</div>
                    
                    <div>CNAME</div>
                    <div>www</div>
                    <div className="text-gray-600">your-app.netlify.app</div>
                    
                    <div>A</div>
                    <div>@</div>
                    <div className="text-gray-600">75.2.60.5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-md bg-primary-100">
                <svg width="24" height="24" viewBox="0 0 512 512" className="text-primary-600">
                  <path fill="currentColor" d="M256 0C397.4 0 512 114.6 512 256c0 141.4-114.6 256-256 256C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zm0 446.8c105.4 0 190.8-85.4 190.8-190.8S361.4 65.2 256 65.2 65.2 150.6 65.2 256 150.6 446.8 256 446.8zM202.2 146.1l160 106.7c13.1 8.8 13.1 28.3 0 37.1l-160 106.7c-13.1 8.7-30.2-2.2-30.2-18.6V164.7c0-16.3 17.1-27.2 30.2-18.6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold ml-3">Netlify Deployment</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Our project is configured for seamless deployment on Netlify with serverless functions support.
            </p>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">Deployment Status</h4>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Production</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">contractcompanion.netlify.app</span>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                Latest deploy: 2 hours ago
              </div>
            </div>
            
            <h4 className="font-medium mb-2">Serverless Functions</h4>
            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-white overflow-auto mb-6">
              <pre className="whitespace-pre-wrap">
{`// netlify/functions/analyze-contract.js
exports.handler = async function(event, context) {
  const { contract } = JSON.parse(event.body);
  
  // Process with Bolt AI (simplified)
  const analysis = await analyzeContract(contract);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ result: analysis })
  };
}`}
              </pre>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" 
                  alt="Netlify logo" 
                  className="h-6 mr-2"
                />
                <span className="text-sm font-medium">Netlify Status</span>
              </div>
              
              <a 
                href="#" 
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
              >
                View Dashboard
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentSection;