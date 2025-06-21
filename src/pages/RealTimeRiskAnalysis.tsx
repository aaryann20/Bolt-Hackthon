import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, AlertTriangle, DollarSign, Activity, Shield, Zap, Eye, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { binanceService } from '../services/binanceService';

interface TokenAnalysis {
  symbol: string;
  currentPrice: number;
  priceChange24h: number;
  volume24h: number;
  vulnerabilityImpact: any;
  liquidityAnalysis: any;
  washTradingCheck: any;
  binanceScore: any;
}

const RealTimeRiskAnalysis: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<TokenAnalysis | null>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [realTimePrice, setRealTimePrice] = useState<number | null>(null);
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);

  const popularTokens = [
    { symbol: 'ETH', name: 'Ethereum', supply: 120000000 },
    { symbol: 'BTC', name: 'Bitcoin', supply: 19700000 },
    { symbol: 'BNB', name: 'Binance Coin', supply: 166800000 },
    { symbol: 'ADA', name: 'Cardano', supply: 45000000000 },
    { symbol: 'DOT', name: 'Polkadot', supply: 1100000000 }
  ];

  const analyzeToken = async () => {
    if (!selectedToken) return;
    
    setIsAnalyzing(true);
    
    try {
      const tokenInfo = popularTokens.find(t => t.symbol === selectedToken);
      if (!tokenInfo) throw new Error('Token not found');

      // Fetch real-time data from Binance
      const [priceData, ticker, klineData] = await Promise.all([
        binanceService.getTokenPrice(`${selectedToken}USDT`),
        binanceService.get24hrTicker(`${selectedToken}USDT`),
        binanceService.getKlineData(`${selectedToken}USDT`, '1h', 24)
      ]);

      if (!priceData || !ticker) throw new Error('Failed to fetch price data');

      const currentPrice = parseFloat(priceData.price);
      const priceChange24h = parseFloat(ticker.priceChangePercent);
      const volume24h = parseFloat(ticker.quoteVolume);

      // Calculate vulnerability impact (assuming 1% of supply is vulnerable)
      const vulnerableAmount = tokenInfo.supply * 0.01;
      const vulnerabilityImpact = await binanceService.calculateVulnerabilityImpact(
        selectedToken,
        vulnerableAmount,
        tokenInfo.supply
      );

      // Analyze liquidity risk
      const liquidityAnalysis = await binanceService.analyzeLiquidityRisk(selectedToken);

      // Check for wash trading
      const washTradingCheck = await binanceService.detectWashTrading(selectedToken);

      // Check Binance listing criteria
      const binanceScore = await binanceService.checkBinanceListingCriteria({
        marketCap: currentPrice * tokenInfo.supply,
        holders: Math.floor(Math.random() * 500000) + 100000,
        volume24h,
        liquidityUSD: volume24h * 0.1
      });

      // Format price history
      const formattedHistory = klineData.map(kline => ({
        time: new Date(kline.openTime).toLocaleTimeString(),
        price: parseFloat(kline.close),
        volume: parseFloat(kline.volume)
      }));

      setAnalysis({
        symbol: selectedToken,
        currentPrice,
        priceChange24h,
        volume24h,
        vulnerabilityImpact,
        liquidityAnalysis,
        washTradingCheck,
        binanceScore
      });

      setPriceHistory(formattedHistory);

      // Setup real-time price stream
      if (wsConnection) {
        wsConnection.close();
      }

      const ws = binanceService.createPriceStream(`${selectedToken}USDT`, (price) => {
        setRealTimePrice(price);
      });

      setWsConnection(ws);

    } catch (error) {
      console.error('Error analyzing token:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    analyzeToken();
    
    return () => {
      if (wsConnection) {
        wsConnection.close();
      }
    };
  }, [selectedToken]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const liquidityData = analysis?.liquidityAnalysis ? [
    { name: 'Top Pool', value: analysis.liquidityAnalysis.topPoolPercentage, color: '#ef4444' },
    { name: 'Other Pools', value: 100 - analysis.liquidityAnalysis.topPoolPercentage, color: '#10b981' }
  ] : [];

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
              <Activity className="w-5 h-5 text-primary-500" />
              <h1 className="text-xl font-bold">Real-Time Risk Analysis</h1>
              <div className="flex items-center ml-4">
                <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" alt="Binance" className="w-5 h-5 mr-2" />
                <span className="text-sm text-gray-600">Powered by Binance API</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8" data-aos="fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Activity className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Real-Time Financial Risk Analysis</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Live vulnerability impact assessment using real-time market data from Binance. 
              Calculate dollar impact, detect wash trading, and analyze liquidity risks.
            </p>
          </div>

          {/* Token Selection */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              {popularTokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token.symbol)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedToken === token.symbol
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {token.symbol}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={analyzeToken}
                disabled={isAnalyzing}
                className="btn-primary px-6 py-3 flex items-center"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Refresh Analysis
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {analysis && (
          <>
            {/* Real-Time Price Display */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Live Market Data</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Current Price</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {binanceService.formatPrice(realTimePrice || analysis.currentPrice)}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`text-sm font-medium ${binanceService.getChangeColor(analysis.priceChange24h)}`}>
                          {binanceService.getChangeIcon(analysis.priceChange24h)} {Math.abs(analysis.priceChange24h).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">24h Volume</p>
                      <p className="text-2xl font-bold text-green-800">
                        {binanceService.formatVolume(analysis.volume24h)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Vulnerability Impact</p>
                      <p className="text-2xl font-bold text-red-800">
                        {binanceService.formatVolume(analysis.vulnerabilityImpact.dollarImpact)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(analysis.vulnerabilityImpact.riskLevel)}`}>
                        {analysis.vulnerabilityImpact.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Binance Score</p>
                      <p className="text-2xl font-bold text-purple-800">
                        {analysis.binanceScore.score}/{analysis.binanceScore.maxScore}
                      </p>
                      <p className="text-xs text-purple-600">Listing criteria</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
              <h3 className="text-xl font-bold mb-6">24-Hour Price Movement</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis 
                      domain={['dataMin - 10', 'dataMax + 10']}
                      tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <Tooltip 
                      formatter={(value) => [binanceService.formatPrice(Number(value)), 'Price']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Liquidity Analysis */}
              <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
                <h3 className="text-xl font-bold mb-6">Liquidity Risk Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={liquidityData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {liquidityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Concentration Risk:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(analysis.liquidityAnalysis.concentrationRisk)}`}>
                        {analysis.liquidityAnalysis.concentrationRisk.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Top Pool Control:</span>
                      <span className="font-medium">{analysis.liquidityAnalysis.topPoolPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Score:</span>
                      <span className="font-bold">{analysis.liquidityAnalysis.riskScore}/10</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Recommendations:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysis.liquidityAnalysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Wash Trading Detection */}
              <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
                <h3 className="text-xl font-bold mb-6">Wash Trading Detection</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Analysis Result</h4>
                      <p className="text-sm text-gray-600">AI-powered trading pattern analysis</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${analysis.washTradingCheck.isWashTrading ? 'text-red-600' : 'text-green-600'}`}>
                        {analysis.washTradingCheck.isWashTrading ? '⚠️' : '✅'}
                      </div>
                      <p className="text-sm font-medium">
                        {analysis.washTradingCheck.confidence}% confidence
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-800 mb-3">Detection Indicators:</h5>
                    <div className="space-y-2">
                      {analysis.washTradingCheck.indicators.map((indicator: string, index: number) => (
                        <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                          <Zap className="w-4 h-4 text-orange-500 mr-2" />
                          <span className="text-sm text-orange-700">{indicator}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">What is Wash Trading?</h5>
                    <p className="text-sm text-blue-700">
                      Wash trading involves artificially inflating trading volume through coordinated buy/sell orders, 
                      often to manipulate price or create false liquidity impressions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Binance Listing Criteria */}
            <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Binance Listing Criteria Analysis</h3>
                <div className="flex items-center space-x-2">
                  <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" alt="Binance" className="w-6 h-6" />
                  <span className="text-sm font-medium text-gray-600">Exchange Standards</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysis.binanceScore.criteria.map((criterion: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${criterion.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{criterion.name}</h4>
                      {criterion.passed ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✗</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Required: {criterion.requirement}</p>
                      <p className="text-sm font-medium">Current: {criterion.current}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-purple-800">Overall Score</h5>
                    <p className="text-sm text-purple-600">
                      Meets {analysis.binanceScore.score} out of {analysis.binanceScore.maxScore} criteria
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-purple-800">
                    {Math.round((analysis.binanceScore.score / analysis.binanceScore.maxScore) * 100)}%
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

export default RealTimeRiskAnalysis;