import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Eye, Download, Shield, AlertTriangle, CheckCircle, Code, Users, DollarSign } from 'lucide-react';

interface ContractInfo {
  address: string;
  name: string;
  symbol?: string;
  type: 'token' | 'defi' | 'nft' | 'dao' | 'other';
  verified: boolean;
  securityScore: number;
  totalSupply?: string;
  holders?: number;
  transactions: number;
  createdAt: number;
  creator: string;
  sourceCode?: string;
}

const ContractExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [contractType, setContractType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [contracts, setContracts] = useState<ContractInfo[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractInfo | null>(null);

  const networks = [
    { id: 'ethereum', name: 'Ethereum', color: 'bg-blue-500' },
    { id: 'bsc', name: 'BSC', color: 'bg-yellow-500' },
    { id: 'polygon', name: 'Polygon', color: 'bg-purple-500' },
    { id: 'avalanche', name: 'Avalanche', color: 'bg-red-500' }
  ];

  const contractTypes = [
    { id: 'all', name: 'All Contracts' },
    { id: 'token', name: 'Tokens' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFTs' },
    { id: 'dao', name: 'DAOs' },
    { id: 'other', name: 'Others' }
  ];

  const sampleContracts: ContractInfo[] = [
    {
      address: '0xA0b86a33E6441e8e4E8b1d6c5E8b1d6c5E8b1d6c',
      name: 'Uniswap V3 Router',
      type: 'defi',
      verified: true,
      securityScore: 95,
      transactions: 15420000,
      createdAt: Date.now() - 86400000 * 365,
      creator: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      name: 'Tether USD',
      symbol: 'USDT',
      type: 'token',
      verified: true,
      securityScore: 88,
      totalSupply: '83,000,000,000',
      holders: 4200000,
      transactions: 89500000,
      createdAt: Date.now() - 86400000 * 1200,
      creator: '0x5754284f345afc66a98fbB0a0Afe71e0F007B949'
    },
    {
      address: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
      name: 'Mutant Ape Yacht Club',
      symbol: 'MAYC',
      type: 'nft',
      verified: true,
      securityScore: 92,
      totalSupply: '30,000',
      holders: 12500,
      transactions: 450000,
      createdAt: Date.now() - 86400000 * 400,
      creator: '0x769272677fab02575E84945F03Eca517acc544cc'
    },
    {
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      name: 'ChainLink Token',
      symbol: 'LINK',
      type: 'token',
      verified: true,
      securityScore: 96,
      totalSupply: '1,000,000,000',
      holders: 678000,
      transactions: 12800000,
      createdAt: Date.now() - 86400000 * 1500,
      creator: '0x514910771AF9Ca656af840dff83E8264EcF986CA'
    },
    {
      address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      name: 'Aave Token',
      symbol: 'AAVE',
      type: 'defi',
      verified: true,
      securityScore: 94,
      totalSupply: '16,000,000',
      holders: 125000,
      transactions: 2100000,
      createdAt: Date.now() - 86400000 * 800,
      creator: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8'
    }
  ];

  const searchContracts = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to Etherscan
      // const response = await fetch(
      //   `https://api.etherscan.io/api?module=contract&action=getabi&address=${searchQuery}&apikey=YourApiKeyToken`
      // );
      
      // For demo, filter sample data
      setTimeout(() => {
        let filtered = sampleContracts;
        
        if (searchQuery) {
          filtered = filtered.filter(contract => 
            contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contract.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contract.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (contractType !== 'all') {
          filtered = filtered.filter(contract => contract.type === contractType);
        }
        
        setContracts(filtered);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error searching contracts:', error);
      setContracts(sampleContracts);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load initial data
    setContracts(sampleContracts);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'token': return DollarSign;
      case 'defi': return Shield;
      case 'nft': return Eye;
      case 'dao': return Users;
      default: return Code;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'token': return 'bg-green-100 text-green-800';
      case 'defi': return 'bg-blue-100 text-blue-800';
      case 'nft': return 'bg-purple-100 text-purple-800';
      case 'dao': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
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
              <Search className="w-5 h-5 text-primary-500" />
              <h1 className="text-xl font-bold">Contract Explorer</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Smart Contract Explorer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover, analyze, and explore smart contracts across multiple blockchain networks. 
              Get detailed insights into contract security, functionality, and usage.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by contract name, address, or symbol..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={searchContracts}
                disabled={isLoading}
                className="btn-primary px-6 py-3 flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* Network Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {networks.map(network => (
                    <option key={network.id} value={network.id}>{network.name}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract Type</label>
                <select
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {contractTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contract List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  {contracts.length} Contract{contracts.length !== 1 ? 's' : ''} Found
                </h3>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {selectedNetwork.charAt(0).toUpperCase() + selectedNetwork.slice(1)} • {contractTypes.find(t => t.id === contractType)?.name}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {contracts.map((contract) => {
                  const TypeIcon = getTypeIcon(contract.type);
                  return (
                    <div
                      key={contract.address}
                      onClick={() => setSelectedContract(contract)}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedContract?.address === contract.address
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(contract.type)}`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{contract.name}</h4>
                            {contract.symbol && (
                              <p className="text-sm text-gray-600">{contract.symbol}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {contract.verified && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span className="text-xs font-medium">Verified</span>
                            </div>
                          )}
                          <span className={`text-sm font-bold ${getSecurityColor(contract.securityScore)}`}>
                            {contract.securityScore}/100
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Address</p>
                          <p className="font-mono text-xs">{contract.address.substring(0, 10)}...</p>
                        </div>
                        {contract.holders && (
                          <div>
                            <p className="text-gray-500">Holders</p>
                            <p className="font-medium">{contract.holders.toLocaleString()}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-500">Transactions</p>
                          <p className="font-medium">{contract.transactions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Created</p>
                          <p className="font-medium">{new Date(contract.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contract Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8" data-aos="fade-left">
              {selectedContract ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{selectedContract.name}</h3>
                    <p className="text-sm text-gray-600 font-mono break-all">{selectedContract.address}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Security Score</span>
                      <span className={`font-bold ${getSecurityColor(selectedContract.securityScore)}`}>
                        {selectedContract.securityScore}/100
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Verification</span>
                      <div className="flex items-center">
                        {selectedContract.verified ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600 text-sm font-medium">Verified</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                            <span className="text-orange-600 text-sm font-medium">Unverified</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(selectedContract.type)}`}>
                        {selectedContract.type.toUpperCase()}
                      </span>
                    </div>

                    {selectedContract.totalSupply && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Supply</span>
                        <span className="font-medium">{selectedContract.totalSupply}</span>
                      </div>
                    )}

                    {selectedContract.holders && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Holders</span>
                        <span className="font-medium">{selectedContract.holders.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Transactions</span>
                      <span className="font-medium">{selectedContract.transactions.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Created</span>
                      <span className="font-medium">{new Date(selectedContract.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Link
                        to="/time-machine"
                        className="w-full btn-primary text-sm py-2 px-4 flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Audit Contract
                      </Link>
                      <button className="w-full btn-secondary text-sm py-2 px-4 flex items-center justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </button>
                      <Link
                        to="/social-proof"
                        className="w-full btn-secondary text-sm py-2 px-4 flex items-center justify-center"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Social Analysis
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Contract Insights</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {selectedContract.verified ? 'Source code verified' : 'Source code not verified'}</li>
                      <li>• {selectedContract.transactions > 1000000 ? 'High activity' : 'Moderate activity'} contract</li>
                      <li>• Security score: {selectedContract.securityScore >= 90 ? 'Excellent' : selectedContract.securityScore >= 70 ? 'Good' : 'Needs attention'}</li>
                      <li>• Created {Math.floor((Date.now() - selectedContract.createdAt) / (1000 * 60 * 60 * 24))} days ago</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Contract</h3>
                  <p className="text-gray-500">Choose a contract from the list to view detailed information</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractExplorer;