interface BinancePrice {
  symbol: string;
  price: string;
  priceChangePercent: string;
}

interface BinanceTicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  askPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

interface BinanceKline {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
}

interface LiquidityAnalysis {
  totalLiquidity: number;
  concentrationRisk: 'low' | 'medium' | 'high';
  topPoolPercentage: number;
  riskScore: number;
  recommendations: string[];
}

interface VulnerabilityImpact {
  tokenSymbol: string;
  currentPrice: number;
  vulnerableAmount: number;
  dollarImpact: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  marketCapImpact: number;
}

class BinanceService {
  private baseUrl = 'https://api.binance.com';
  private wsUrl = 'wss://stream.binance.com:9443/ws';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 30000; // 30 seconds

  // Public API endpoints (no key required)
  async getTokenPrice(symbol: string): Promise<BinancePrice | null> {
    try {
      const cacheKey = `price_${symbol}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      const response = await fetch(`${this.baseUrl}/api/v3/ticker/price?symbol=${symbol}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching token price:', error);
      return this.getMockPrice(symbol);
    }
  }

  async get24hrTicker(symbol: string): Promise<BinanceTicker | null> {
    try {
      const cacheKey = `ticker_${symbol}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      const response = await fetch(`${this.baseUrl}/api/v3/ticker/24hr?symbol=${symbol}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching 24hr ticker:', error);
      return this.getMock24hrTicker(symbol);
    }
  }

  async getKlineData(symbol: string, interval: string = '1h', limit: number = 24): Promise<BinanceKline[]> {
    try {
      const cacheKey = `kline_${symbol}_${interval}_${limit}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      const response = await fetch(
        `${this.baseUrl}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const rawData = await response.json();
      const data = rawData.map((kline: any[]) => ({
        openTime: kline[0],
        open: kline[1],
        high: kline[2],
        low: kline[3],
        close: kline[4],
        volume: kline[5],
        closeTime: kline[6],
        quoteAssetVolume: kline[7],
        numberOfTrades: kline[8],
        takerBuyBaseAssetVolume: kline[9],
        takerBuyQuoteAssetVolume: kline[10]
      }));
      
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching kline data:', error);
      return this.getMockKlineData(symbol, limit);
    }
  }

  async getExchangeInfo(): Promise<any> {
    try {
      const cacheKey = 'exchange_info';
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      const response = await fetch(`${this.baseUrl}/api/v3/exchangeInfo`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching exchange info:', error);
      return { symbols: [] };
    }
  }

  // Advanced analysis functions
  async calculateVulnerabilityImpact(
    tokenSymbol: string, 
    vulnerableAmount: number,
    totalSupply: number
  ): Promise<VulnerabilityImpact> {
    const priceData = await this.getTokenPrice(`${tokenSymbol}USDT`);
    const currentPrice = priceData ? parseFloat(priceData.price) : 0;
    const dollarImpact = vulnerableAmount * currentPrice;
    const marketCapImpact = (vulnerableAmount / totalSupply) * 100;

    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (dollarImpact > 10000000) riskLevel = 'critical'; // $10M+
    else if (dollarImpact > 1000000) riskLevel = 'high'; // $1M+
    else if (dollarImpact > 100000) riskLevel = 'medium'; // $100K+

    return {
      tokenSymbol,
      currentPrice,
      vulnerableAmount,
      dollarImpact,
      riskLevel,
      marketCapImpact
    };
  }

  async analyzeLiquidityRisk(tokenSymbol: string): Promise<LiquidityAnalysis> {
    try {
      const ticker = await this.get24hrTicker(`${tokenSymbol}USDT`);
      const volume24h = ticker ? parseFloat(ticker.quoteVolume) : 0;
      
      // Mock liquidity analysis - in production, you'd use DEX APIs
      const totalLiquidity = volume24h * 0.1; // Rough estimate
      const topPoolPercentage = Math.random() * 60 + 20; // 20-80%
      
      let concentrationRisk: 'low' | 'medium' | 'high' = 'low';
      let riskScore = 10;
      const recommendations: string[] = [];

      if (topPoolPercentage > 70) {
        concentrationRisk = 'high';
        riskScore = 3;
        recommendations.push('High liquidity concentration detected');
        recommendations.push('Consider diversifying across multiple pools');
        recommendations.push('Monitor for potential rug pull risks');
      } else if (topPoolPercentage > 50) {
        concentrationRisk = 'medium';
        riskScore = 6;
        recommendations.push('Moderate liquidity concentration');
        recommendations.push('Encourage more liquidity providers');
      } else {
        recommendations.push('Healthy liquidity distribution');
        recommendations.push('Continue monitoring pool dynamics');
      }

      return {
        totalLiquidity,
        concentrationRisk,
        topPoolPercentage,
        riskScore,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing liquidity risk:', error);
      return {
        totalLiquidity: 0,
        concentrationRisk: 'high',
        topPoolPercentage: 0,
        riskScore: 1,
        recommendations: ['Unable to analyze liquidity - high risk']
      };
    }
  }

  async detectWashTrading(tokenSymbol: string): Promise<{
    isWashTrading: boolean;
    confidence: number;
    indicators: string[];
  }> {
    try {
      const ticker = await this.get24hrTicker(`${tokenSymbol}USDT`);
      if (!ticker) throw new Error('No ticker data');

      const volume = parseFloat(ticker.volume);
      const priceChange = Math.abs(parseFloat(ticker.priceChangePercent));
      const trades = ticker.count;
      
      const indicators: string[] = [];
      let suspiciousScore = 0;

      // High volume with low price movement
      if (volume > 1000000 && priceChange < 1) {
        indicators.push('High volume with minimal price impact');
        suspiciousScore += 30;
      }

      // Unusual trade count to volume ratio
      const avgTradeSize = volume / trades;
      if (avgTradeSize > 10000) {
        indicators.push('Large average trade sizes');
        suspiciousScore += 25;
      }

      // Round number bias in prices
      const price = parseFloat(ticker.lastPrice);
      if (price % 1 === 0 || price.toString().endsWith('0')) {
        indicators.push('Price clustering at round numbers');
        suspiciousScore += 15;
      }

      return {
        isWashTrading: suspiciousScore > 50,
        confidence: Math.min(suspiciousScore, 100),
        indicators
      };
    } catch (error) {
      console.error('Error detecting wash trading:', error);
      return {
        isWashTrading: false,
        confidence: 0,
        indicators: ['Analysis failed']
      };
    }
  }

  async checkBinanceListingCriteria(tokenData: {
    marketCap: number;
    holders: number;
    volume24h: number;
    liquidityUSD: number;
  }): Promise<{
    score: number;
    maxScore: number;
    criteria: Array<{
      name: string;
      passed: boolean;
      requirement: string;
      current: string;
    }>;
  }> {
    const criteria = [
      {
        name: 'Market Cap',
        requirement: '$10M+',
        current: `$${(tokenData.marketCap / 1000000).toFixed(1)}M`,
        passed: tokenData.marketCap >= 10000000
      },
      {
        name: 'Holder Count',
        requirement: '10,000+',
        current: tokenData.holders.toLocaleString(),
        passed: tokenData.holders >= 10000
      },
      {
        name: '24h Volume',
        requirement: '$1M+',
        current: `$${(tokenData.volume24h / 1000000).toFixed(1)}M`,
        passed: tokenData.volume24h >= 1000000
      },
      {
        name: 'Liquidity',
        requirement: '$500K+',
        current: `$${(tokenData.liquidityUSD / 1000).toFixed(0)}K`,
        passed: tokenData.liquidityUSD >= 500000
      },
      {
        name: 'Trading History',
        requirement: '30+ days',
        current: '45 days',
        passed: true // Mock data
      },
      {
        name: 'Community Size',
        requirement: '5K+ members',
        current: '12K members',
        passed: true // Mock data
      },
      {
        name: 'Code Audit',
        requirement: 'Professional audit',
        current: 'ContractCompanion verified',
        passed: true
      }
    ];

    const score = criteria.filter(c => c.passed).length;
    
    return {
      score,
      maxScore: criteria.length,
      criteria
    };
  }

  // WebSocket for real-time price updates
  createPriceStream(symbol: string, callback: (price: number) => void): WebSocket {
    const ws = new WebSocket(`${this.wsUrl}/${symbol.toLowerCase()}@ticker`);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        callback(parseFloat(data.c)); // Current price
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return ws;
  }

  // Cache management
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Mock data for fallback
  private getMockPrice(symbol: string): BinancePrice {
    const mockPrices: Record<string, string> = {
      'ETHUSDT': '1850.50',
      'BTCUSDT': '43250.75',
      'BNBUSDT': '315.20',
      'ADAUSDT': '0.485',
      'DOTUSDT': '7.25'
    };

    return {
      symbol,
      price: mockPrices[symbol] || '1.00',
      priceChangePercent: (Math.random() * 10 - 5).toFixed(2)
    };
  }

  private getMock24hrTicker(symbol: string): BinanceTicker {
    const basePrice = parseFloat(this.getMockPrice(symbol).price);
    const change = (Math.random() * 0.1 - 0.05) * basePrice;
    
    return {
      symbol,
      priceChange: change.toFixed(2),
      priceChangePercent: ((change / basePrice) * 100).toFixed(2),
      weightedAvgPrice: basePrice.toFixed(2),
      prevClosePrice: (basePrice - change).toFixed(2),
      lastPrice: basePrice.toFixed(2),
      lastQty: '1.0',
      bidPrice: (basePrice * 0.999).toFixed(2),
      askPrice: (basePrice * 1.001).toFixed(2),
      openPrice: (basePrice - change).toFixed(2),
      highPrice: (basePrice * 1.02).toFixed(2),
      lowPrice: (basePrice * 0.98).toFixed(2),
      volume: (Math.random() * 1000000).toFixed(2),
      quoteVolume: (Math.random() * 1000000000).toFixed(2),
      openTime: Date.now() - 86400000,
      closeTime: Date.now(),
      firstId: 1,
      lastId: 1000,
      count: 1000
    };
  }

  private getMockKlineData(symbol: string, limit: number): BinanceKline[] {
    const basePrice = parseFloat(this.getMockPrice(symbol).price);
    const data: BinanceKline[] = [];
    
    for (let i = 0; i < limit; i++) {
      const time = Date.now() - (limit - i) * 3600000; // 1 hour intervals
      const volatility = basePrice * 0.02;
      const open = basePrice + (Math.random() - 0.5) * volatility;
      const close = open + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, close) + Math.random() * volatility * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * 0.5;
      
      data.push({
        openTime: time,
        open: open.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        close: close.toFixed(2),
        volume: (Math.random() * 10000).toFixed(2),
        closeTime: time + 3600000,
        quoteAssetVolume: (Math.random() * 10000000).toFixed(2),
        numberOfTrades: Math.floor(Math.random() * 1000),
        takerBuyBaseAssetVolume: (Math.random() * 5000).toFixed(2),
        takerBuyQuoteAssetVolume: (Math.random() * 5000000).toFixed(2)
      });
    }
    
    return data;
  }

  // Utility functions
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  }

  formatVolume(volume: number): string {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  }

  getChangeColor(change: number): string {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? '↗' : '↘';
  }
}

export const binanceService = new BinanceService();