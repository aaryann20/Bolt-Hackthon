import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Activity, TrendingUp, Search, Zap, Droplets, Fish } from 'lucide-react';

const AdvancedFeatures: React.FC = () => {
  const featureButtons = [
    { 
      name: 'Time Machine', 
      path: '/time-machine', 
      icon: Clock,
      description: 'Track contract history and analyze version changes over time',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Social Proof', 
      path: '/social-proof', 
      icon: Users,
      description: 'Analyze token holder distribution and community trust metrics',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Vulnerability Simulator', 
      path: '/vulnerability-simulator', 
      icon: Activity,
      description: 'Interactive simulations of attack vectors and exploits',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      name: 'Market Analytics', 
      path: '/market-analytics', 
      icon: TrendingUp,
      description: 'Real-time market data and technical analysis insights',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Contract Explorer', 
      path: '/contract-explorer', 
      icon: Search,
      description: 'Discover and analyze smart contracts across networks',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      name: 'Real-Time Risk Analysis', 
      path: '/real-time-risk', 
      icon: Zap,
      description: 'Live vulnerability impact assessment with market data',
      color: 'from-red-500 to-red-600'
    },
    { 
      name: 'Liquidity Pool Analyzer', 
      path: '/liquidity-analyzer', 
      icon: Droplets,
      description: 'Detect rug pull risks and analyze pool health',
      color: 'from-cyan-500 to-cyan-600'
    },
    { 
      name: 'Whale Activity Monitor', 
      path: '/whale-monitor', 
      icon: Fish,
      description: 'Track large token movements and whale wallet activities',
      color: 'from-teal-500 to-teal-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" alt="Binance" className="w-6 h-6" />
              <h1 className="text-xl font-bold">Advanced Features</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" alt="Binance" className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Advanced Features with Binance Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive suite of blockchain analysis tools powered by real-time Binance market data. 
            From historical contract analysis to live whale monitoring, get the insights you need to make informed decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {featureButtons.map((feature, index) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                  <span>Explore Feature</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Binance Integration Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16" data-aos="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
              <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" alt="Binance" className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Why Binance Integration Matters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our integration with Binance's comprehensive API ecosystem provides unparalleled access to real-time market data, 
              enabling more accurate risk assessments and vulnerability impact calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Market Data</h3>
              <p className="text-gray-600">
                Access live price feeds, trading volumes, and market movements to calculate accurate vulnerability impacts in USD terms.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">
                Leverage Binance's extensive trading data to detect wash trading, analyze liquidity risks, and monitor whale activities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Insights</h3>
              <p className="text-gray-600">
                Get immediate feedback on how smart contract vulnerabilities could impact token prices and market stability.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center" data-aos="fade-up">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-xl mb-8 opacity-90">
              Choose any feature above to start your advanced blockchain analysis journey.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Main Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdvancedFeatures;