interface PolygonTickerData {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: Array<{
    v: number; // volume
    vw: number; // volume weighted average price
    o: number; // open
    c: number; // close
    h: number; // high
    l: number; // low
    t: number; // timestamp
    n: number; // number of transactions
  }>;
  status: string;
  request_id: string;
}

interface PolygonMarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

class PolygonService {
  private apiKey = 'CnpbzI2lkfY25uOTnQilRjzGVFkglcuY';
  private baseUrl = 'https://api.polygon.io';

  async getTickerData(symbol: string, timespan: string = 'day', from: string, to: string): Promise<PolygonTickerData | null> {
    try {
      const url = `${this.baseUrl}/v2/aggs/ticker/${symbol}/range/1/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=120&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticker data:', error);
      return null;
    }
  }

  async getPreviousClose(symbol: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/v2/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching previous close:', error);
      return null;
    }
  }

  async getMarketStatus(): Promise<any> {
    try {
      const url = `${this.baseUrl}/v1/marketstatus/now?apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching market status:', error);
      return null;
    }
  }

  async getTickerDetails(symbol: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/v3/reference/tickers/${symbol}?apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticker details:', error);
      return null;
    }
  }

  async getMarketHolidays(year?: number): Promise<any> {
    try {
      const currentYear = year || new Date().getFullYear();
      const url = `${this.baseUrl}/v1/marketstatus/upcoming?apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching market holidays:', error);
      return null;
    }
  }

  async getExchanges(): Promise<any> {
    try {
      const url = `${this.baseUrl}/v3/reference/exchanges?apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching exchanges:', error);
      return null;
    }
  }

  async getTickerNews(symbol: string, limit: number = 10): Promise<any> {
    try {
      const url = `${this.baseUrl}/v2/reference/news?ticker=${symbol}&limit=${limit}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticker news:', error);
      return null;
    }
  }

  async getFinancials(symbol: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/vX/reference/financials?ticker=${symbol}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching financials:', error);
      return null;
    }
  }

  // Crypto-specific endpoints
  async getCryptoTicker(from: string, to: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/v1/last/crypto/${from}/${to}?apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching crypto ticker:', error);
      return null;
    }
  }

  async getCryptoAggregates(symbol: string, timespan: string = 'day', from: string, to: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/v2/aggs/ticker/X:${symbol}USD/range/1/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=120&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching crypto aggregates:', error);
      return null;
    }
  }

  // Forex endpoints
  async getForexTicker(from: string, to: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/v1/last/forex/${from}/${to}?apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching forex ticker:', error);
      return null;
    }
  }

  // Technical indicators
  async getSMA(symbol: string, window: number = 50): Promise<any> {
    try {
      const url = `${this.baseUrl}/v1/indicators/sma/${symbol}?timestamp.gte=2023-01-01&timespan=day&adjusted=true&window=${window}&series_type=close&expand_underlying=false&order=desc&limit=10&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching SMA:', error);
      return null;
    }
  }

  async getEMA(symbol: string, window: number = 50): Promise<any> {
    try {
      const url = `${this.baseUrl}/v1/indicators/ema/${symbol}?timestamp.gte=2023-01-01&timespan=day&adjusted=true&window=${window}&series_type=close&expand_underlying=false&order=desc&limit=10&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching EMA:', error);
      return null;
    }
  }

  async getRSI(symbol: string, window: number = 14): Promise<any> {
    try {
      const url = `${this.baseUrl}/v1/indicators/rsi/${symbol}?timestamp.gte=2023-01-01&timespan=day&adjusted=true&window=${window}&series_type=close&expand_underlying=false&order=desc&limit=10&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching RSI:', error);
      return null;
    }
  }

  async getMACD(symbol: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/v1/indicators/macd/${symbol}?timestamp.gte=2023-01-01&timespan=day&adjusted=true&short_window=12&long_window=26&signal_window=9&series_type=close&expand_underlying=false&order=desc&limit=10&apikey=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching MACD:', error);
      return null;
    }
  }

  // Helper method to format market data
  formatMarketData(tickerData: PolygonTickerData): PolygonMarketData | null {
    if (!tickerData.results || tickerData.results.length === 0) {
      return null;
    }

    const latest = tickerData.results[tickerData.results.length - 1];
    const previous = tickerData.results.length > 1 ? tickerData.results[tickerData.results.length - 2] : latest;

    return {
      symbol: tickerData.ticker,
      price: latest.c,
      change: latest.c - previous.c,
      changePercent: ((latest.c - previous.c) / previous.c) * 100,
      volume: latest.v,
      high: latest.h,
      low: latest.l,
      open: latest.o,
      previousClose: previous.c
    };
  }

  // Generate date strings for API calls
  getDateRange(days: number): { from: string; to: string } {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);

    return {
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    };
  }
}

export const polygonService = new PolygonService();