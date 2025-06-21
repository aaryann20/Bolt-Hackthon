import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, BarChart3, Activity, Search, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  high24h: number;
  low24h: number;
}

interface PriceHistory {
  timestamp: number;
  price: number;
  volume: number;
}

const MarketAnalytics: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '30D' | '1Y'>('7D');
  const [activeTab, setActiveTab] = useState<'price' | 'volume' | 'analysis'>('price');

  // Sample market data using Polygon.io structure
  const sampleMarketData: MarketData = {
    symbol: 'BTC',
    price: 43250.75,
    change24h: 2.34,
    volume: 28500000000,
    marketCap: 847000000000,
    high24h: 43890.25,
    low24h: 42180.50
  };

  const generatePriceHistory = (days: number): PriceHistory[] => {
    const data: PriceHistory[] = [];
    const basePrice = 43250;
    const now = Date.now();
    
    for (let i = days; i >= 0; i--) {
      const timestamp = now - (i * 24 * 60 * 60 * 1000);
      const volatility = 0.05; // 5% daily volatility
      const randomChange = (Math.random() - 0.5) * 2 * volatility;
      const price = basePrice * (1 + randomChange * (days - i) / days);
      const volume = 25000000000 + Math.random() * 10000000000;
      
      data.push({
        timestamp,
        price: Math.round(price * 100) / 100,
        volume: Math.round(volume)
      });
    }
    
    return data;
  };

  const searchToken = async () => {
    if (!selectedToken) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to Polygon.io
      // const response = await fetch(
      //   `https://api.polygon.io/v2/aggs/ticker/X:${selectedToken}USD/prev?adjusted=true&apikey=CnpbzI2lkfY25uOTnQilRjzGVFkglcuY`
      // );
      
      // For demo, use sample data
      setTimeout(() => {
        setMarketData(sampleMarketData);
        setPriceHistory(generatePriceHistory(30));
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error fetching market data:', error);
      setMarketData(sampleMarketData);
      setPriceHistory(generatePriceHistory(30));
      setIsLoading(false);
    }
  };

  const getTimeframeData = () => {
    const days = timeframe === '1D' ? 1 : timeframe === '7D' ? 7 : timeframe === '30D' ? 30 : 365;
    return priceHistory.slice(-days);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  };

  const technicalIndicators = {
    rsi: 67.5,
    macd: 0.0234,
    sma20: 42890.25,
    sma50: 41250.75,
    bollinger: {
      upper: 44500.25,
      middle: 43250.75,
      lower: 42001.25
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
              <TrendingUp className="w-5 h-5 text-primary-500" />
              <h1 className="text-xl font-bold">Market Analytics</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <BarChart3 className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Advanced Market Analytics</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time cryptocurrency market data, technical analysis, and trading insights powered by Polygon.io API.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value.toUpperCase())}
                  placeholder="Enter cryptocurrency symbol (e.g., BTC, ETH, ADA)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={searchToken}
                disabled={isLoading || !selectedToken}
                className="btn-primary px-6 py-3 flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Supported: BTC, ETH, ADA, DOT, LINK, UNI, AAVE, and 100+ more</p>
            </div>
          </div>
        </div>

        {marketData && (
          <>
            {/* Market Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="text-2xl font-bold">{marketData.symbol}/USD</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    marketData.change24h >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h.toFixed(2)}%
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Current Price</p>
                      <p className="text-2xl font-bold text-blue-800">{formatPrice(marketData.price)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">24h Volume</p>
                      <p className="text-2xl font-bold text-green-800">{formatVolume(marketData.volume)}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Market Cap</p>
                      <p className="text-2xl font-bold text-purple-800">{formatVolume(marketData.marketCap)}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">24h Range</p>
                      <p className="text-lg font-bold text-orange-800">
                        {formatPrice(marketData.low24h)} - {formatPrice(marketData.high24h)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-xl shadow-sm mb-8" data-aos="fade-up">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setActiveTab('price')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'price'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Price Chart
                    </button>
                    <button
                      onClick={() => setActiveTab('volume')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'volume'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Volume
                    </button>
                    <button
                      onClick={() => setActiveTab('analysis')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'analysis'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Technical Analysis
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <div className="flex space-x-1">
                      {(['1D', '7D', '30D', '1Y'] as const).map((tf) => (
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
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'price' && (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getTimeframeData()}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                        />
                        <YAxis 
                          domain={['dataMin - 1000', 'dataMax + 1000']}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip 
                          formatter={(value) => [formatPrice(Number(value)), 'Price']}
                          labelFormatter={(timestamp) => new Date(Number(timestamp)).toLocaleString()}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#6366f1" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {activeTab === 'volume' && (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getTimeframeData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                        />
                        <YAxis tickFormatter={(value) => formatVolume(value)} />
                        <Tooltip 
                          formatter={(value) => [formatVolume(Number(value)), 'Volume']}
                          labelFormatter={(timestamp) => new Date(Number(timestamp)).toLocaleString()}
                        />
                        <Bar dataKey="volume" fill="#10b981" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {activeTab === 'analysis' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">RSI (14)</h4>
                        <div className="text-2xl font-bold mb-1">{technicalIndicators.rsi}</div>
                        <div className={`text-sm ${
                          technicalIndicators.rsi > 70 ? 'text-red-600' :
                          technicalIndicators.rsi < 30 ? 'text-green-600' :
                          'text-gray-600'
                        }`}>
                          {technicalIndicators.rsi > 70 ? 'Overbought' :
                           technicalIndicators.rsi < 30 ? 'Oversold' : 'Neutral'}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">MACD</h4>
                        <div className="text-2xl font-bold mb-1">{technicalIndicators.macd}</div>
                        <div className={`text-sm ${
                          technicalIndicators.macd > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {technicalIndicators.macd > 0 ? 'Bullish' : 'Bearish'}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">SMA 20</h4>
                        <div className="text-2xl font-bold mb-1">{formatPrice(technicalIndicators.sma20)}</div>
                        <div className={`text-sm ${
                          marketData.price > technicalIndicators.sma20 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {marketData.price > technicalIndicators.sma20 ? 'Above' : 'Below'}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">SMA 50</h4>
                        <div className="text-2xl font-bold mb-1">{formatPrice(technicalIndicators.sma50)}</div>
                        <div className={`text-sm ${
                          marketData.price > technicalIndicators.sma50 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {marketData.price > technicalIndicators.sma50 ? 'Above' : 'Below'}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-4">Bollinger Bands</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-blue-600 mb-1">Upper Band</div>
                          <div className="font-bold text-blue-800">{formatPrice(technicalIndicators.bollinger.upper)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-blue-600 mb-1">Middle Band (SMA 20)</div>
                          <div className="font-bold text-blue-800">{formatPrice(technicalIndicators.bollinger.middle)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-blue-600 mb-1">Lower Band</div>
                          <div className="font-bold text-blue-800">{formatPrice(technicalIndicators.bollinger.lower)}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                        <p className="text-sm text-blue-700">
                          <strong>Analysis:</strong> Price is trading {
                            marketData.price > technicalIndicators.bollinger.upper ? 'above the upper band (potential reversal)' :
                            marketData.price < technicalIndicators.bollinger.lower ? 'below the lower band (potential bounce)' :
                            'within the bands (normal range)'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
              <h3 className="text-xl font-bold mb-6">Market Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-4">Key Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">24h Change:</span>
                      <span className={`font-medium ${
                        marketData.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume/Market Cap:</span>
                      <span className="font-medium">{((marketData.volume / marketData.marketCap) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price vs 24h High:</span>
                      <span className="font-medium">{((marketData.price / marketData.high24h) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price vs 24h Low:</span>
                      <span className="font-medium">{((marketData.price / marketData.low24h) * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Trading Signals</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-green-800 font-medium">Strong Buy</span>
                      <span className="text-sm text-green-600">RSI oversold + MACD bullish</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-800 font-medium">Hold</span>
                      <span className="text-sm text-blue-600">Price above SMA 20 & 50</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="text-orange-800 font-medium">Watch</span>
                      <span className="text-sm text-orange-600">High volume activity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MarketAnalytics;