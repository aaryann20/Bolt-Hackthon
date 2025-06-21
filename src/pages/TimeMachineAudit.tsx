import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, GitBranch, AlertTriangle, CheckCircle, Search, Calendar, History, Download, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ContractVersion {
  id: string;
  version: string;
  timestamp: number;
  blockNumber: number;
  txHash: string;
  vulnerabilities: number;
  securityScore: number;
  changes: string[];
  creator: string;
}

const TimeMachineAudit: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [versions, setVersions] = useState<ContractVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<ContractVersion | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState<ContractVersion[]>([]);

  const sampleVersions: ContractVersion[] = [
    {
      id: '1',
      version: 'v1.0.0',
      timestamp: Date.now() - 86400000 * 30,
      blockNumber: 18500000,
      txHash: '0x1234...abcd',
      vulnerabilities: 5,
      securityScore: 65,
      changes: ['Initial deployment', 'Basic token functionality'],
      creator: '0x742d35Cc6634C0532925a3b8D4C9db96'
    },
    {
      id: '2',
      version: 'v1.1.0',
      timestamp: Date.now() - 86400000 * 20,
      blockNumber: 18520000,
      txHash: '0x5678...efgh',
      vulnerabilities: 3,
      securityScore: 75,
      changes: ['Fixed reentrancy vulnerability', 'Added access control'],
      creator: '0x742d35Cc6634C0532925a3b8D4C9db96'
    },
    {
      id: '3',
      version: 'v1.2.0',
      timestamp: Date.now() - 86400000 * 10,
      blockNumber: 18540000,
      txHash: '0x9abc...ijkl',
      vulnerabilities: 1,
      securityScore: 90,
      changes: ['Gas optimization', 'Enhanced error handling', 'Upgraded to Solidity 0.8.19'],
      creator: '0x742d35Cc6634C0532925a3b8D4C9db96'
    }
  ];

  const securityTrendData = sampleVersions.map(version => ({
    version: version.version,
    score: version.securityScore,
    vulnerabilities: version.vulnerabilities
  }));

  const searchContract = async () => {
    if (!contractAddress) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to Etherscan
      const response = await fetch(
        `https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${contractAddress}&apikey=YourApiKeyToken`
      );
      
      // For demo, use sample data
      setTimeout(() => {
        setVersions(sampleVersions);
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error fetching contract history:', error);
      setVersions(sampleVersions);
      setIsLoading(false);
    }
  };

  const toggleComparison = (version: ContractVersion) => {
    if (compareVersions.includes(version)) {
      setCompareVersions(compareVersions.filter(v => v.id !== version.id));
    } else if (compareVersions.length < 2) {
      setCompareVersions([...compareVersions, version]);
    }
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
              <Clock className="w-5 h-5 text-primary-500" />
              <h1 className="text-xl font-bold">Time Machine Audit</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <History className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Contract Time Machine</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Analyze historical versions of smart contracts to track security improvements and identify patched vulnerabilities over time.
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
                  placeholder="Enter contract address (0x...)"
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
                    Analyze History
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Try: 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413 (TheDAO)</p>
            </div>
          </div>
        </div>

        {versions.length > 0 && (
          <>
            {/* Security Trend Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Security Score Evolution</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setComparisonMode(!comparisonMode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      comparisonMode 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {comparisonMode ? 'Exit Comparison' : 'Compare Versions'}
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={securityTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="version" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'score' ? `${value}/100` : value,
                        name === 'score' ? 'Security Score' : 'Vulnerabilities'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="vulnerabilities" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Version Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
              <h3 className="text-xl font-bold mb-6">Version Timeline</h3>
              
              <div className="space-y-6">
                {versions.map((version, index) => (
                  <div 
                    key={version.id}
                    className={`relative flex items-start space-x-4 p-6 rounded-lg border-2 transition-all duration-300 ${
                      selectedVersion?.id === version.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : comparisonMode && compareVersions.includes(version)
                          ? 'border-secondary-500 bg-secondary-50'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Timeline connector */}
                    {index < versions.length - 1 && (
                      <div className="absolute left-8 top-16 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    
                    {/* Version indicator */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      version.securityScore >= 80 ? 'bg-green-500' :
                      version.securityScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
                    }`}>
                      <GitBranch className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">{version.version}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            version.securityScore >= 80 ? 'bg-green-100 text-green-800' :
                            version.securityScore >= 60 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                          }`}>
                            Score: {version.securityScore}/100
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(version.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                          <span className="text-sm">{version.vulnerabilities} vulnerabilities</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm">Block #{version.blockNumber.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600">
                            Creator: {version.creator.substring(0, 10)}...
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Changes in this version:</h5>
                        <ul className="space-y-1">
                          {version.changes.map((change, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedVersion(version)}
                          className="btn-primary text-sm py-2 px-4 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                        
                        {comparisonMode && (
                          <button
                            onClick={() => toggleComparison(version)}
                            className={`text-sm py-2 px-4 rounded-lg border transition-colors ${
                              compareVersions.includes(version)
                                ? 'bg-secondary-500 text-white border-secondary-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {compareVersions.includes(version) ? 'Remove from Compare' : 'Add to Compare'}
                          </button>
                        )}
                        
                        <button className="text-sm py-2 px-4 text-gray-600 hover:text-gray-800 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison View */}
            {comparisonMode && compareVersions.length === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
                <h3 className="text-xl font-bold mb-6">Version Comparison</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {compareVersions.map((version, index) => (
                    <div key={version.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">{version.version}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          version.securityScore >= 80 ? 'bg-green-100 text-green-800' :
                          version.securityScore >= 60 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {version.securityScore}/100
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Vulnerabilities:</span>
                          <span className="text-sm font-medium">{version.vulnerabilities}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Block Number:</span>
                          <span className="text-sm font-medium">#{version.blockNumber.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Date:</span>
                          <span className="text-sm font-medium">{new Date(version.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Key Changes:</h5>
                        <ul className="space-y-1">
                          {version.changes.map((change, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Improvement Analysis</h5>
                  <p className="text-sm text-blue-700">
                    Security score improved by {compareVersions[1].securityScore - compareVersions[0].securityScore} points. 
                    Vulnerabilities reduced from {compareVersions[0].vulnerabilities} to {compareVersions[1].vulnerabilities}.
                    {compareVersions[1].securityScore > compareVersions[0].securityScore && 
                      " This represents a significant security enhancement."}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default TimeMachineAudit;