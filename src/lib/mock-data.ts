import type { TradingPair, Trade, ChartDataPoint } from './types';

export const tradingPairs: TradingPair[] = [
  { name: 'BTC/USD', price: 68050.55, change24h: 2.5, allocation: 25 },
  { name: 'ETH/USD', price: 3550.8, change24h: 1.8, allocation: 20 },
  { name: 'BNB/USD', price: 580.1, change24h: 0.5, allocation: 15 },
  { name: 'SOL/USD', price: 165.2, change24h: -1.2, allocation: 10 },
  { name: 'ADA/USD', price: 0.45, change24h: -0.8, allocation: 10 },
  { name: 'DOT/USD', price: 7.5, change24h: 1.2, allocation: 10 },
  { name: 'AVAX/USD', price: 35.7, change24h: 3.2, allocation: 5 },
  { name: 'MATIC/USD', price: 0.73, change24h: 1.1, allocation: 5 },
];

export const openTrades: Trade[] = [
  { id: '1', pair: 'BTC/USD', type: 'BUY', amount: 68050.55, profit: 250.75 },
  { id: '2', pair: 'ETH/USD', type: 'SELL', amount: 3550.80, profit: -50.2 },
  { id: '3', pair: 'SOL/USD', type: 'BUY', amount: 165.20, profit: 120.4 },
];

export const historicalTrades: Trade[] = [
  { id: '4', pair: 'BTC/USD', type: 'BUY', amount: 5000, profit: 450.25 },
  { id: '5', pair: 'ETH/USD', type: 'BUY', amount: 2000, profit: -120.5 },
  { id: '6', pair: 'DOGE/USD', type: 'SELL', amount: 1000, profit: 80.0 },
  { id: '7', pair: 'XRP/USD', type: 'BUY', amount: 3000, profit: 150.75 },
  { id: '8', 'pair': 'SOL/USD', 'type': 'SELL', 'amount': 4000, 'profit': 300.0 },
  { id: '9', 'pair': 'AVAX/USD', 'type': 'BUY', 'amount': 2500, 'profit': -50.25 },
  { id: '10', 'pair': 'BTC/USD', 'type': 'BUY', 'amount': 10000, 'profit': 1200.0 },
  { id: '11', 'pair': 'ETH/USD', 'type': 'SELL', 'amount': 8000, 'profit': 550.0 },
];

const generateChartData = (points: number, periodMinutes: number, startPrice: number) => {
  const data: ChartDataPoint[] = [];
  let lastPrice = startPrice;
  let currentTime = new Date();

  for (let i = points - 1; i >= 0; i--) {
    const change = (Math.random() - 0.495) * (lastPrice * 0.005);
    lastPrice += change;
    const pointTime = new Date(currentTime.getTime() - i * periodMinutes * 60 * 1000);
    
    // Calculate moving average (simple)
    const average = i > 2 ? (data.slice(-3).reduce((sum, d) => sum + d.price, 0) + lastPrice) / 4 : lastPrice;
    
    const volume = Math.random() * 100000;

    data.push({
      time: pointTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(lastPrice.toFixed(2)),
      average: parseFloat(average.toFixed(2)),
      volume: parseFloat(volume.toFixed(2)),
    });
  }
  return data;
};

export const chartData = generateChartData(60, 1, 68000);
export const chartData5m = generateChartData(60, 5, 68000);
export const chartData1h = generateChartData(48, 60, 68000);

export const riskAndData = {
  sentiment: {
    score: 0.65,
    label: 'Bullish',
  },
  newsImpact: {
    score: 82,
    label: 'High',
  },
  socialVolume: {
    score: 75,
    label: 'Increasing',
  },
  volatility: {
    score: 1.8,
    label: 'Moderate'
  }
}
