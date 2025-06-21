interface EtherscanResponse {
  status: string;
  message: string;
  result: any;
}

interface ContractCreation {
  contractAddress: string;
  contractCreator: string;
  txHash: string;
}

interface TokenSupply {
  contractAddress: string;
  totalSupply: string;
}

class EtherscanService {
  private apiKey = 'YourApiKeyToken';
  private baseUrl = 'https://api.etherscan.io/api';

  async getContractABI(address: string): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=contract&action=getabi&address=${address}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
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
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result[0];
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching contract source code:', error);
      return null;
    }
  }

  async getContractCreation(addresses: string[]): Promise<ContractCreation[]> {
    try {
      const addressList = addresses.join(',');
      const url = `${this.baseUrl}?module=contract&action=getcontractcreation&contractaddresses=${addressList}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching contract creation:', error);
      return [];
    }
  }

  async getTokenSupply(contractAddress: string): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching token supply:', error);
      return '0';
    }
  }

  async getTokenBalance(contractAddress: string, address: string): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return '0';
    }
  }

  async getTransactionHistory(address: string, page: number = 1, offset: number = 10): Promise<any[]> {
    try {
      const url = `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=desc&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  }

  async getInternalTransactions(address: string, page: number = 1, offset: number = 10): Promise<any[]> {
    try {
      const url = `${this.baseUrl}?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=desc&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching internal transactions:', error);
      return [];
    }
  }

  async getERC20Transfers(contractAddress: string, address?: string, page: number = 1, offset: number = 100): Promise<any[]> {
    try {
      let url = `${this.baseUrl}?module=account&action=tokentx&contractaddress=${contractAddress}&page=${page}&offset=${offset}&sort=desc&apikey=${this.apiKey}`;
      
      if (address) {
        url += `&address=${address}`;
      }
      
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching ERC20 transfers:', error);
      return [];
    }
  }

  async getGasPrice(): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=gastracker&action=gasoracle&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result.ProposeGasPrice;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching gas price:', error);
      return '0';
    }
  }

  async getEthPrice(): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=stats&action=ethprice&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      return null;
    }
  }

  async getEthSupply(): Promise<string> {
    try {
      const url = `${this.baseUrl}?module=stats&action=ethsupply&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.status === '1') {
        return data.result;
      }
      
      throw new Error(data.message);
    } catch (error) {
      console.error('Error fetching ETH supply:', error);
      return '0';
    }
  }

  async getLatestBlock(): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
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
      const data: EtherscanResponse = await response.json();
      
      if (data.result) {
        return data.result;
      }
      
      throw new Error('Failed to fetch block');
    } catch (error) {
      console.error('Error fetching block:', error);
      return null;
    }
  }

  async getTransactionByHash(txHash: string): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.result) {
        return data.result;
      }
      
      throw new Error('Failed to fetch transaction');
    } catch (error) {
      console.error('Error fetching transaction:', error);
      return null;
    }
  }

  async getTransactionReceipt(txHash: string): Promise<any> {
    try {
      const url = `${this.baseUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data: EtherscanResponse = await response.json();
      
      if (data.result) {
        return data.result;
      }
      
      throw new Error('Failed to fetch transaction receipt');
    } catch (error) {
      console.error('Error fetching transaction receipt:', error);
      return null;
    }
  }

  // Helper methods
  formatAddress(address: string): string {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  weiToEth(wei: string): number {
    return parseInt(wei) / Math.pow(10, 18);
  }

  ethToWei(eth: number): string {
    return (eth * Math.pow(10, 18)).toString();
  }
}

export const etherscanService = new EtherscanService();