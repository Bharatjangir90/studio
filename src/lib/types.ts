export interface TradingPair {
  name: string;
  price: number;
  change24h: number;
  allocation?: number;
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

export interface RiskAndData {
    sentiment: {
        score: number;
        label: string;
    },
    newsImpact: {
        score: number;
        label: string;
    },
    socialVolume: {
        score: number;
        label: string;
    },
    volatility: {
        score: number;
        label: string;
    }
}
