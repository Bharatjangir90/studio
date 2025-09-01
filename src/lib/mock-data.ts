import type { TradingPair, Trade, ChartDataPoint } from './types';

export const tradingPairs: TradingPair[] = [
  { name: 'BTC/USD', price: 68050.55, change24h: 2.5 },
  { name: 'ETH/USD', price: 3550.8, change24h: 1.8 },
  { name: 'SOL/USD', price: 165.2, change24h: -1.2 },
  { name: 'DOGE/USD', price: 0.158, change24h: 5.1 },
  { name: 'XRP/USD', price: 0.52, change24h: 0.5 },
  { name: 'ADA/USD', price: 0.45, change24h: -0.8 },
  { name: 'AVAX/USD', price: 35.7, change24h: 3.2 },
  { name: 'LINK/USD', price: 18.2, change24h: -2.1 },
  { name: 'MATIC/USD', price: 0.73, change24h: 1.1 },
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
