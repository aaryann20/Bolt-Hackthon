const axios = require('axios');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { endpoint, symbol, interval, limit } = event.queryStringParameters || {};
    
    if (!endpoint) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Endpoint parameter is required' })
      };
    }

    let url = 'https://api.binance.com/api/v3/';
    
    switch (endpoint) {
      case 'price':
        url += `ticker/price${symbol ? `?symbol=${symbol}` : ''}`;
        break;
      case 'ticker24hr':
        url += `ticker/24hr${symbol ? `?symbol=${symbol}` : ''}`;
        break;
      case 'klines':
        url += `klines?symbol=${symbol}&interval=${interval || '1h'}&limit=${limit || 24}`;
        break;
      case 'exchangeInfo':
        url += 'exchangeInfo';
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid endpoint' })
        };
    }

    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'ContractCompanion/1.0'
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };

  } catch (error) {
    console.error('Binance API Error:', error.message);
    
    // Return mock data for demo purposes
    const mockData = getMockData(event.queryStringParameters?.endpoint, event.queryStringParameters?.symbol);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockData)
    };
  }
};

function getMockData(endpoint, symbol) {
  const basePrice = symbol === 'ETHUSDT' ? 1850.50 : 
                   symbol === 'BTCUSDT' ? 43250.75 :
                   symbol === 'BNBUSDT' ? 315.20 : 1.00;

  switch (endpoint) {
    case 'price':
      return {
        symbol: symbol || 'ETHUSDT',
        price: basePrice.toFixed(2)
      };
    
    case 'ticker24hr':
      const change = (Math.random() - 0.5) * 0.1 * basePrice;
      return {
        symbol: symbol || 'ETHUSDT',
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
    
    case 'klines':
      const klines = [];
      for (let i = 0; i < 24; i++) {
        const time = Date.now() - (24 - i) * 3600000;
        const volatility = basePrice * 0.02;
        const open = basePrice + (Math.random() - 0.5) * volatility;
        const close = open + (Math.random() - 0.5) * volatility;
        const high = Math.max(open, close) + Math.random() * volatility * 0.5;
        const low = Math.min(open, close) - Math.random() * volatility * 0.5;
        
        klines.push([
          time,
          open.toFixed(2),
          high.toFixed(2),
          low.toFixed(2),
          close.toFixed(2),
          (Math.random() * 10000).toFixed(2),
          time + 3600000,
          (Math.random() * 10000000).toFixed(2),
          Math.floor(Math.random() * 1000),
          (Math.random() * 5000).toFixed(2),
          (Math.random() * 5000000).toFixed(2),
          '0'
        ]);
      }
      return klines;
    
    default:
      return { error: 'Mock data not available for this endpoint' };
  }
}