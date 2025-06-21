import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mic, MicOff, Menu, X, Clock, Users, Activity, TrendingUp, Search, Droplets, Fish, Zap, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const voiceButton = demoSection.querySelector('button[aria-label]') as HTMLElement;
        if (voiceButton) {
          voiceButton.focus();
        }
      }, 1000);
    }
  };

  const isHomePage = location.pathname === '/';

  const advancedFeatures = [
    { 
      name: 'Time Machine', 
      path: '/time-machine', 
      icon: Clock,
      description: 'Track contract history'
    },
    { 
      name: 'Social Proof', 
      path: '/social-proof', 
      icon: Users,
      description: 'Analyze token holders'
    },
    { 
      name: 'Simulator', 
      path: '/vulnerability-simulator', 
      icon: Activity,
      description: 'Test vulnerabilities'
    },
    { 
      name: 'Analytics', 
      path: '/market-analytics', 
      icon: TrendingUp,
      description: 'Market insights'
    },
    { 
      name: 'Explorer', 
      path: '/contract-explorer', 
      icon: Search,
      description: 'Discover contracts'
    },
    { 
      name: 'Risk Analysis', 
      path: '/real-time-risk', 
      icon: Zap,
      description: 'Live risk assessment'
    },
    { 
      name: 'Liquidity Pools', 
      path: '/liquidity-analyzer', 
      icon: Droplets,
      description: 'Pool analysis'
    },
    { 
      name: 'Whale Monitor', 
      path: '/whale-monitor', 
      icon: Fish,
      description: 'Track large movements'
    },
  ];

  return (
    <header>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src={darkMode ? "/black_circle_360x360.png" : "/white_circle_360x360.png"} 
              alt="ContractCompanion Logo" 
              className="h-10 w-10 mr-3 hover-lift"
            />
            <div className="flex flex-col">
              <h2 className={`text-lg font-bold leading-tight ${scrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}>
                ContractCompanion
              </h2>
              <div className="flex items-center -mt-0.5">
                <img 
                  src="/logotext_poweredby_360w.png"
                  alt="Powered by Bolt.new"
                  className="h-2.5 opacity-70 hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            {/* Advanced Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                  scrolled || !isHomePage
                    ? 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    : 'text-white hover:text-primary-200 hover:bg-white/10'
                }`}
              >
                <span>Advanced Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {featuresDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50">
                  <div className="px-4 pb-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-sm">Advanced Analysis Tools</h3>
                    <p className="text-xs text-gray-500 mt-1">Powered by Binance API integration</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {advancedFeatures.map((feature) => (
                      <Link
                        key={feature.path}
                        to={feature.path}
                        onClick={() => setFeaturesDropdownOpen(false)}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-primary-100 group-hover:bg-primary-200 transition-colors">
                          <feature.icon className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                            {feature.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                            {feature.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="px-4 pt-3 border-t border-gray-100">
                    <Link
                      to="/advanced-features"
                      onClick={() => setFeaturesDropdownOpen(false)}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View all features →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button 
              onClick={toggleListening} 
              className={`p-2 rounded-full transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 mic-pulse' 
                  : 'bg-primary-500 hover:bg-primary-600'
              }`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-white" />
              ) : (
                <Mic className="h-4 w-4 text-white" />
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-primary-500 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Voice Button */}
          <button 
            onClick={toggleListening} 
            className={`hidden lg:block p-3 rounded-full transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 mic-pulse' 
                : 'bg-primary-500 hover:bg-primary-600'
            }`}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? (
              <MicOff className="h-5 w-5 text-white" />
            ) : (
              <Mic className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 text-sm mb-3">Advanced Features</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {advancedFeatures.map((feature) => (
                      <Link
                        key={feature.path}
                        to={feature.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <feature.icon className="w-4 h-4 text-primary-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                          <p className="text-xs text-gray-500">{feature.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link
                  to="/advanced-features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 px-4 bg-primary-500 text-white rounded-lg font-medium"
                >
                  View All Features
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {isHomePage && (
        <div className="min-h-screen flex items-center justify-center gradient-bg text-white px-4 relative overflow-hidden">
          {/* Extended gradient background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-blue-500 to-secondary-500">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
          </div>
          
          <div className="container mx-auto text-center max-w-5xl relative z-10" data-aos="fade-up">
            {/* Centered Powered by Bolt.new Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src="/logotext_poweredby_360w.png"
                alt="Powered by Bolt.new"
                className="h-16 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            {/* Centered Main Heading */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                AI-Powered Smart Contract Auditor
              </h1>
              
              <p className="text-xl md:text-2xl mb-16 opacity-90 leading-relaxed max-w-4xl mx-auto">
                Audit your blockchain contracts with voice commands and get real-time vulnerability analysis powered by advanced AI and Binance market data.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-12">
              {/* Main CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                  onClick={scrollToDemo}
                  className="btn-primary text-xl py-5 px-10 flex items-center justify-center hover-lift shadow-2xl"
                >
                  <Mic className="w-6 h-6 mr-3" />
                  Start Free Audit
                </button>
                <Link to="/real-time-risk" className="btn-secondary text-xl py-5 px-10 hover-lift shadow-xl">
                  Live Risk Analysis
                </Link>
              </div>

              {/* Advanced Features Quick Access */}
              <div className="w-full max-w-6xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 opacity-90">Advanced Analysis Tools</h3>
                  <p className="text-lg opacity-75">Powered by real-time Binance market data</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {advancedFeatures.map((feature, index) => (
                    <Link
                      key={feature.path}
                      to={feature.path}
                      className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors mb-3">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white mb-1">{feature.name}</h4>
                        <p className="text-sm text-white/80 leading-tight">{feature.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-wrap justify-center items-center gap-12 opacity-75">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-lg">99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-lg">5M+ Contracts Audited</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-lg">Blockchain Verified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" alt="Binance" className="w-5 h-5" />
                  <span className="text-lg">Binance API Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {featuresDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setFeaturesDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;