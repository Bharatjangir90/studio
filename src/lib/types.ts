export interface TradingPair {
  name: string;
  price: number;
  change24h: number;
}

export interface Trade {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  amount: number;
  profit: number;
}

export interface ChartDataPoint {
  time: string;
  price: number;
  average: number;
  volume: number;
}
