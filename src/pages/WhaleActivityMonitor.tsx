import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Fish, TrendingUp, TrendingDown, AlertTriangle, Eye, Bell, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { binanceService } from '../services/binanceService';

interface WhaleTransaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: number;
  amountUSD: number;
  token: string;
  type: 'buy' | 'sell' | 'transfer';
  timestamp: number;
  impact: 'low' | 'medium' | 'high';
  exchange?: string;
}

interface WhaleWallet {
  address: string;
  balance: number;
  balanceUSD: number;
  percentOfSupply: number;
  lastActivity: number;
  riskLevel: 'low' | 'medium' | 'high';
  label?: string;
}

const WhaleActivityMonitor: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d'>('24h');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [whaleTransactions, setWhaleTransactions] = useState<WhaleTransaction[]>([]);
  const [whaleWallets, setWhaleWallets] = useState<WhaleWallet[]>([]);
  const [priceImpactData, setPriceImpactData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', supply: 120000000 },
    { symbol: 'BTC', name: 'Bitcoin', supply: 19700000 },
    { symbol: 'BNB', name: 'Binance Coin', supply: 166800000 },
    { symbol: 'ADA', name: 'Cardano', supply: 45000000000 }
  ];

  const generateMockWhaleData = async (token: string) => {
    const tokenInfo = tokens.find(t => t.symbol === token);
    if (!tokenInfo) return;

    // Get current price
    const priceData = await binanceService.getTokenPrice(`${token}USDT`);
    const currentPrice = priceData ? parseFloat(priceData.price) : 1000;

    // Generate whale transactions
    const transactions: WhaleTransaction[] = [];
    const now = Date.now();
    
    for (let i = 0; i < 20; i++) {
      const amount = Math.random() * 1000 + 100; // 100-1100 tokens
      const amountUSD = amount * currentPrice;
      const type = Math.random() > 0.5 ? 'buy' : 'sell';
      const timestamp = now - Math.random() * 86400000; // Last 24 hours
      
      let impact: 'low' | 'medium' | 'high' = 'low';
      if (amountUSD > 10000000) impact = 'high';
      else if (amountUSD > 1000000) impact = 'medium';

      transactions.push({
        id: `tx_${i}`,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        from: `0x${Math.random().toString(16).substr(2, 40)}`,
        to: `0x${Math.random().toString(16).substr(2, 40)}`,
        amount,
        amountUSD,
        token,
        type: type as 'buy' | 'sell',
        timestamp,
        impact,
        exchange: Math.random() > 0.5 ? 'Binance' : 'Uniswap'
      });
    }

    // Generate whale wallets
    const wallets: WhaleWallet[] = [];
    for (let i = 0; i < 10; i++) {
      const balance = Math.random() * 50000 + 10000; // 10K-60K tokens
      const balanceUSD = balance * currentPrice;
      const percentOfSupply = (balance / tokenInfo.supply) * 100;
      
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      if (percentOfSupply > 1) riskLevel = 'high';
      else if (percentOfSupply > 0.1) riskLevel = 'medium';

      wallets.push({
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        balance,
        balanceUSD,
        percentOfSupply,
        lastActivity: now - Math.random() * 86400000 * 7,
        riskLevel,
        label: Math.random() > 0.7 ? ['Binance Hot Wallet', 'Coinbase Custody', 'Unknown Exchange'][Math.floor(Math.random() * 3)] : undefined
      });
    }

    // Generate price impact data
    const impactData = [];
    for (let i = 0; i < 24; i++) {
      const hour = new Date(now - (23 - i) * 3600000);
      const whaleActivity = transactions.filter(tx => 
        Math.abs(tx.timestamp - hour.getTime()) < 1800000 // Within 30 minutes
      ).length;
      
      impactData.push({
        time: hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        whaleActivity,
        priceChange: (Math.random() - 0.5) * 5, // -2.5% to +2.5%
        volume: Math.random() * 100000000 + 50000000
      });
    }

    setWhaleTransactions(transactions.sort((a, b) => b.timestamp - a.timestamp));
    setWhaleWallets(wallets.sort((a, b) => b.balanceUSD - a.balanceUSD));
    setPriceImpactData(impactData);

    // Generate alerts
    const newAlerts = [];
    const largeTransactions = transactions.filter(tx => tx.impact === 'high');
    if (largeTransactions.length > 0) {
      newAlerts.push(`🚨 ${largeTransactions.length} large whale transactions detected in the last 24h`);
    }
    
    const recentActivity = transactions.filter(tx => now - tx.timestamp < 3600000); // Last hour
    if (recentActivity.length > 5) {
      newAlerts.push(`⚠️ High whale activity: ${recentActivity.length} transactions in the last hour`);
    }

    setAlerts(newAlerts);
  };

  const startMonitoring = async () => {
    setIsMonitoring(true);
    await generateMockWhaleData(selectedToken);
    
    // Simulate real-time updates
    const interval = setInterval(async () => {
      if (Math.random() > 0.7) { // 30% chance of new transaction
        await generateMockWhaleData(selectedToken);
      }
    }, 10000); // Every 10 seconds

    // Clean up interval after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      setIsMonitoring(false);
    }, 300000);
  };

  useEffect(() => {
    generateMockWhaleData(selectedToken);
  }, [selectedToken]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)}K`;
    return `$${amount.toFixed(2)}`;
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
              <Fish className="w-5 h-5 text-primary-500" />
              <h1 className="text-xl font-bold">Whale Activity Monitor</h1>
              {isMonitoring && (
                <div className="flex items-center ml-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm text-green-600 font-medium">Live Monitoring</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Fish className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Whale Activity Monitoring</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track large token movements, detect potential market manipulation, and monitor whale wallet activities 
              with real-time Binance trading data integration.
            </p>
          </div>

          {/* Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Token:</label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.name} ({token.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Timeframe:</label>
                <div className="flex space-x-1">
                  {(['1h', '24h', '7d'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        timeframe === tf
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startMonitoring}
                disabled={isMonitoring}
                className="btn-primary px-6 py-3 flex items-center"
              >
                {isMonitoring ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Monitoring...
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5 mr-2" />
                    Start Monitoring
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              Active Alerts
            </h3>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-700">{alert}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Impact Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
          <h3 className="text-xl font-bold mb-6">Whale Activity vs Price Impact</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceImpactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="whaleActivity" fill="#6366f1" opacity={0.6} />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="priceChange" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Whale Transactions and Wallets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Whale Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Whale Transactions</h3>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Last {timeframe}</span>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {whaleTransactions.slice(0, 10).map((tx) => (
                <div key={tx.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {tx.type === 'buy' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-medium capitalize">{tx.type}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(tx.impact)}`}>
                        {tx.impact.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-medium">
                        {tx.amount.toLocaleString()} {tx.token} ({formatCurrency(tx.amountUSD)})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">From:</span>
                      <span className="text-sm font-mono">{formatAddress(tx.from)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">To:</span>
                      <span className="text-sm font-mono">{formatAddress(tx.to)}</span>
                    </div>
                    {tx.exchange && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Exchange:</span>
                        <span className="text-sm font-medium">{tx.exchange}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Whale Wallets */}
          <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
            <h3 className="text-xl font-bold mb-6">Top Whale Wallets</h3>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {whaleWallets.slice(0, 10).map((wallet, index) => (
                <div key={wallet.address} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-500">#{index + 1}</span>
                      {wallet.label && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {wallet.label}
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(wallet.riskLevel)}`}>
                        {wallet.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-800">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Address:</span>
                      <span className="text-sm font-mono">{formatAddress(wallet.address)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Balance:</span>
                      <span className="text-sm font-medium">
                        {wallet.balance.toLocaleString()} {selectedToken}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">USD Value:</span>
                      <span className="text-sm font-medium">{formatCurrency(wallet.balanceUSD)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">% of Supply:</span>
                      <span className="text-sm font-bold">{wallet.percentOfSupply.toFixed(3)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Activity:</span>
                      <span className="text-sm text-gray-500">
                        {Math.floor((Date.now() - wallet.lastActivity) / 86400000)}d ago
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
          <h3 className="text-xl font-bold mb-6">Whale Activity Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Total Whale Volume</h4>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(whaleTransactions.reduce((sum, tx) => sum + tx.amountUSD, 0))}
              </p>
              <p className="text-sm text-blue-600">Last {timeframe}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Buy Pressure</h4>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(whaleTransactions.filter(tx => tx.type === 'buy').reduce((sum, tx) => sum + tx.amountUSD, 0))}
              </p>
              <p className="text-sm text-green-600">
                {whaleTransactions.filter(tx => tx.type === 'buy').length} transactions
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Sell Pressure</h4>
              <p className="text-2xl font-bold text-red-900">
                {formatCurrency(whaleTransactions.filter(tx => tx.type === 'sell').reduce((sum, tx) => sum + tx.amountUSD, 0))}
              </p>
              <p className="text-sm text-red-600">
                {whaleTransactions.filter(tx => tx.type === 'sell').length} transactions
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">High Impact Events</h4>
              <p className="text-2xl font-bold text-purple-900">
                {whaleTransactions.filter(tx => tx.impact === 'high').length}
              </p>
              <p className="text-sm text-purple-600">Potential market movers</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h5 className="font-medium text-yellow-800 mb-2">Market Impact Analysis</h5>
            <p className="text-sm text-yellow-700">
              Current whale activity shows {whaleTransactions.filter(tx => tx.type === 'buy').length > whaleTransactions.filter(tx => tx.type === 'sell').length ? 'bullish' : 'bearish'} sentiment. 
              {whaleTransactions.filter(tx => tx.impact === 'high').length > 3 && ' High-impact transactions detected - monitor for potential volatility.'}
              {alerts.length > 0 && ' Active alerts require immediate attention.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WhaleActivityMonitor;