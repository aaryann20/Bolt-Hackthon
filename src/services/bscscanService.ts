interface BSCScanResponse {
  status: string;
  message: string;
  result: any;
}

interface TokenHolder {
  TokenHolderAddress: string;
  TokenHolderQuantity: string;
}

class BSCScanService {
  private apiKey = 'YourApiKeyToken';
  private baseUrl = 'https://api.bscscan.com/api';

  async getTokenSupply(contractAddress: string): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching token supply:', error);
      return '0';
    }
  }

  async getCirculatingSupply(contractAddress: string): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=stats&action=tokenCsupply&contractaddress=${contractAddress}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching circulating supply:', error);
      return '0';
    }
  }

  async getTokenHolders(contractAddress: string, page: number = 1, offset: number = 10): Promise<TokenHolder[]> {
    try {
      const url = `${this.baseUrl}?module=token&action=tokenholderlist&contractaddress=${contractAddress}&page=${page}&offset=${offset}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching token holders:', error);
      return [];
    }
  }

  async getTokenInfo(contractAddress: string): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=token&action=tokeninfo&contractaddress=${contractAddress}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result[0];
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching token info:', error);
      return null;
    }
  }

  async getBEP20Transfers(contractAddress: string, address?: string, page: number = 1, offset: number = 100): Promise<any[]> {
    try {
      let url = `${this.baseUrl}?module=account&action=tokentx&contractaddress=${contractAddress}&page=${page}&offset=${offset}&sort=desc&apikey=${this.apiKey}`;
      
      if (address) {
        url += `&address=${address}`;
      }
      
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching BEP20 transfers:', error);
      return [];
    }
  }

  async getContractABI(address: string): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=contract&action=getabi&address=${address}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return JSON.parse(data.result);
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching contract ABI:', error);
      return null;
    }
  }

  async getContractSourceCode(address: string): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=contract&action=getsourcecode&address=${address}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result[0];
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching contract source code:', error);
      return null;
    }
  }

  async getBNBPrice(): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=stats&action=bnbprice&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching BNB price:', error);
      return null;
    }
  }

  async getBNBSupply(): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=stats&action=bnbsupply&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching BNB supply:', error);
      return '0';
    }
  }

  async getAccountBalance(address: string): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return '0';
    }
  }

  async getTransactionHistory(address: string, page: number = 1, offset: number = 10): Promise<any[]> {
    try {
      const url = `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=desc&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  }

  async getGasPrice(): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=gastracker&action=gasoracle&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result.ProposeGasPrice;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching gas price:', error);
      return '0';
    }
  }

  async getLatestBlock(): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.result) {
        return parseInt(data.result, 16);
      }
      
      throw new Error('Failed to fetch latest block');
    } catch (error) {
      console.error('Error fetching latest block:', error);
      return 0;
    }
  }

  async getBlockByNumber(blockNumber: string): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: BSCScanResponse = await response.json();
      
      if (data.result) {
        return data.result;
      }
      
      throw new Error('Failed to fetch block');
    } catch (error) {
      console.error('Error fetching block:', error);
      return null;
    }
  }

  // Helper methods for token analysis
  async analyzeTokenDistribution(contractAddress: string): Promise<any> {
    try {
      const [totalSupply, holders] = await Promise.all([
        this.getTokenSupply(contractAddress),
        this.getTokenHolders(contractAddress, 1, 100)
      ]);

      const totalSupplyNum = parseFloat(totalSupply);
      const top10Holdings = holders.slice(0, 10).reduce((sum, holder) => {
        return sum + parseFloat(holder.TokenHolderQuantity);
      }, 0);

      const top10Percentage = (top10Holdings / totalSupplyNum) * 100;

      return {
        totalSupply,
        totalHolders: holders.length,
        top10Holdings,
        top10Percentage,
        distributionScore: this.calculateDistributionScore(top10Percentage),
        riskLevel: this.getRiskLevel(top10Percentage)
      };
    } catch (error) {
      console.error('Error analyzing token distribution:', error);
      return null;
    }
  }

  private calculateDistributionScore(top10Percentage: number): number {
    // Score from 0-10, where 10 is perfectly distributed
    if (top10Percentage > 80) return 1;
    if (top10Percentage > 60) return 3;
    if (top10Percentage > 40) return 5;
    if (top10Percentage > 20) return 7;
    return 9;
  }

  private getRiskLevel(top10Percentage: number): 'low' | 'medium' | 'high' {
    if (top10Percentage > 50) return 'high';
    if (top10Percentage > 30) return 'medium';
    return 'low';
  }

  // Helper methods
  formatAddress(address: string): string {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  weiToBNB(wei: string): number {
    return parseInt(wei) / Math.pow(10, 18);
  }

  bnbToWei(bnb: number): string {
    return (bnb * Math.pow(10, 18)).toString();
  }
}

export const bscscanService = new BSCScanService();