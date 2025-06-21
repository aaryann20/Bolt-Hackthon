import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 gradient-bg rounded-md flex items-center justify-center mr-4">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
              <h2 className="text-3xl font-bold">ContractCompanion</h2>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
              AI-powered smart contract auditing for the Bolt Global Hackathon. 
              Secure your blockchain applications with voice-driven audits and real-time Binance market data.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Product</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              <li>
                <Link to="/advanced-features" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  Advanced Features
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hackathon</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2025 ContractCompanion. All rights reserved.
          </p>
          
          <div className="flex items-center text-gray-400 text-sm">
            <a href="#" className="mr-8 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="mr-8 hover:text-white transition-colors">Terms of Service</a>
            <div className="flex items-center">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-2 text-red-500" />
              <span>for Bolt Global Hackathon</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;