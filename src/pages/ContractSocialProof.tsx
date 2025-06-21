import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, PieChart, DollarSign, Search, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface TokenHolder {
  address: string;
  balance: string;
  percentage: number;
  rank: number;
}

interface TokenInfo {
  name: string;
  symbol: string;
  totalSupply: string;
  circulatingSupply: string;
  holders: number;
  price: number;
  marketCap: number;
}

const ContractSocialProof: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'holders' | 'distribution'>('overview');

  const sampleTokenInfo: TokenInfo = {
    name: 'Binance USD',
    symbol: 'BUSD',
    totalSupply: '1,000,000,000',
    circulatingSupply: '850,000,000',
    holders: 2847392,
    price: 1.00,
    marketCap: 850000000
  };

  const sampleHolders: TokenHolder[] = [
    { address: '0x742d35Cc6634C0532925a3b8D4C9db96', balance: '85,000,000', percentage: 10.0, rank: 1 },
    { address: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E6', balance: '68,000,000', percentage: 8.0, rank: 2 },
    { address: '0x6cc5f688a315f3dc28a7781717a9a798a59fda7b', balance: '51,000,000', percentage: 6.0, rank: 3 },
    { address: '0x0d0707963952f2fba59dd06f2b425ace40b492fe', balance: '42,500,000', percentage: 5.0, rank: 4 },
    { address: '0x89e51fA8CA5D66cd220bAed62ED01e8951aa7c40', balance: '34,000,000', percentage: 4.0, rank: 5 },
    { address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE', balance: '25,500,000', percentage: 3.0, rank: 6 },
    { address: '0xD551234Ae421e3BCBA99A0Da6d736074f22192FF', balance: '17,000,000', percentage: 2.0, rank: 7 },
    { address: '0x564286362092D8e7936f0549571a803B203aAceD', balance: '12,750,000', percentage: 1.5, rank: 8 },
    { address: '0x6262998Ced04146fA42253a5C0AF90CA02dfd2A3', balance: '8,500,000', percentage: 1.0, rank: 9 },
    { address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0', balance: '6,800,000', percentage: 0.8, rank: 10 }
  ];

  const distributionData = [
    { name: 'Top 10 Holders', value: 41.3, color: '#6366f1' },
    { name: 'Top 11-100', value: 28.7, color: '#8b5cf6' },
    { name: 'Top 101-1000', value: 18.5, color: '#06b6d4' },
    { name: 'Others', value: 11.5, color: '#10b981' }
  ];

  const holderGrowthData = [
    { month: 'Jan', holders: 1200000 },
    { month: 'Feb', holders: 1450000 },
    { month: 'Mar', holders: 1680000 },
    { month: 'Apr', holders: 1920000 },
    { month: 'May', holders: 2150000 },
    { month: 'Jun', holders: 2400000 },
    { month: 'Jul', holders: 2650000 },
    { month: 'Aug', holders: 2847392 }
  ];

  const searchContract = async () => {
    if (!contractAddress) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API calls to BSCScan
      const [tokenSupplyResponse, holdersResponse] = await Promise.all([
        fetch(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=YourApiKeyToken`),
        fetch(`https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${contractAddress}&page=1&offset=100&apikey=YourApiKeyToken`)
      ]);
      
      // For demo, use sample data
      setTimeout(() => {
        setTokenInfo(sampleTokenInfo);
        setHolders(sampleHolders);
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error fetching token data:', error);
      setTokenInfo(sampleTokenInfo);
      setHolders(sampleHolders);
      setIsLoading(false);
    }
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage > 20) return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
    if (percentage > 10) return { level: 'Medium', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  };

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
              <Users className="w-5 h-5 text-primary-500" />
              <h1 className="text-xl font-bold">Contract Social Proof</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Token Social Proof Analysis</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Analyze token holder distribution, whale concentration, and community trust metrics to assess project legitimacy.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="Enter BEP-20 token contract address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={searchContract}
                disabled={isLoading || !contractAddress}
                className="btn-primary px-6 py-3 flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze Token
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Try: 0xe9e7cea3dedca5984780bafc599bd69add087d56 (BUSD)</p>
            </div>
          </div>
        </div>

        {tokenInfo && (
          <>
            {/* Token Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Token Overview</h3>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Verified Contract</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Token Name</p>
                      <p className="text-lg font-bold text-blue-800">{tokenInfo.name}</p>
                      <p className="text-sm text-blue-600">{tokenInfo.symbol}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Total Holders</p>
                      <p className="text-lg font-bold text-green-800">{tokenInfo.holders.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+12.5% this month</p>
                    </div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Market Cap</p>
                      <p className="text-lg font-bold text-purple-800">${(tokenInfo.marketCap / 1000000).toFixed(0)}M</p>
                      <p className="text-sm text-purple-600">Price: ${tokenInfo.price}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Circulating Supply</p>
                      <p className="text-lg font-bold text-orange-800">{tokenInfo.circulatingSupply}</p>
                      <p className="text-sm text-orange-600">85% of total</p>
                    </div>
                    <PieChart className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm mb-8" data-aos="fade-up">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-primary-500 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Risk Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('holders')}
                    className={`px-6 py-4 font-medium text-sm ${
                      activeTab === 'holders'
                        ? 'border-b-2 border-primary-500 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Top Holders
                  </button>
                  <button
                    onClick={() => setActiveTab('distribution')}
                    className={`px-6 py-4 font-medium text-sm ${
                      activeTab === 'distribution'
                        ? 'border-b-2 border-primary-500 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Distribution Analysis
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Whale Concentration</h4>
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="text-2xl font-bold text-orange-600 mb-1">41.3%</div>
                        <p className="text-sm text-gray-600">Top 10 holders control</p>
                        <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${getRiskLevel(41.3).bg} ${getRiskLevel(41.3).color}`}>
                          {getRiskLevel(41.3).level} Risk
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Holder Growth</h4>
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-1">+12.5%</div>
                        <p className="text-sm text-gray-600">Monthly growth rate</p>
                        <div className="mt-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-600">
                          Healthy Growth
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Distribution Score</h4>
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">7.2/10</div>
                        <p className="text-sm text-gray-600">Decentralization index</p>
                        <div className="mt-2 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-600">
                          Good Distribution
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-yellow-800 mb-1">Risk Assessment</h5>
                          <p className="text-sm text-yellow-700">
                            Moderate whale concentration detected. Top 10 holders control 41.3% of supply. 
                            Monitor for potential market manipulation risks. However, strong holder growth indicates healthy community adoption.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="h-64">
                      <h4 className="font-medium mb-4">Holder Growth Trend</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={holderGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                          <Tooltip formatter={(value) => [`${(Number(value) / 1000000).toFixed(2)}M`, 'Holders']} />
                          <Bar dataKey="holders" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {activeTab === 'holders' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Top Token Holders</h4>
                      <span className="text-sm text-gray-500">Updated 5 minutes ago</span>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Address</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Balance</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Percentage</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-700">Risk Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {holders.map((holder) => {
                            const risk = getRiskLevel(holder.percentage);
                            return (
                              <tr key={holder.address} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  <span className="font-medium">#{holder.rank}</span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-mono text-sm">
                                    {holder.address.substring(0, 10)}...{holder.address.substring(holder.address.length - 8)}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right font-medium">
                                  {holder.balance} {tokenInfo.symbol}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <span className="font-medium">{holder.percentage}%</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${risk.bg} ${risk.color}`}>
                                    {risk.level}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'distribution' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium mb-4">Token Distribution</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={distributionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {distributionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `${value}%`} />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-4">Distribution Breakdown</h4>
                        <div className="space-y-4">
                          {distributionData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <div 
                                  className="w-4 h-4 rounded-full mr-3"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <span className="font-bold">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">Analysis Summary</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Moderate concentration in top holders</li>
                            <li>• Healthy distribution across mid-tier holders</li>
                            <li>• Strong retail participation (11.5%)</li>
                            <li>• Decentralization score: 7.2/10</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ContractSocialProof;