import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { historicalTrades, openTrades } from '@/lib/mock-data';

export function PnlSummary() {
  const totalProfit = historicalTrades.reduce((acc, trade) => acc + trade.profit, 0);
  const totalTrades = historicalTrades.length;
  const winningTrades = historicalTrades.filter((trade) => trade.profit > 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const portfolioValue = openTrades.reduce((acc, trade) => acc + trade.amount, 100000);

  // Mock 24h change
  const dailyChange = totalProfit * 0.052;
  const dailyChangePercent = 5.2;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
          <span className="text-muted-foreground">
            <Wallet className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${portfolioValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <p className="text-xs text-muted-foreground">
            Current estimated portfolio value
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          <span className="text-muted-foreground">
            <DollarSign className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalProfit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <p className="text-xs text-muted-foreground">
            All-time profit from closed trades
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">24h Change</CardTitle>
          {dailyChange >= 0 ? (
            <span className="text-[hsl(var(--chart-2))]">
              <ArrowUp className="h-4 w-4" />
            </span>
          ) : (
            <span className="text-destructive">
              <ArrowDown className="h-4 w-4" />
            </span>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dailyChange >= 0 ? '+' : ''}${dailyChange.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className={dailyChange >= 0 ? 'text-[hsl(var(--chart-2))]' : 'text-destructive'}>
              {dailyChange >= 0 ? '+' : ''}{dailyChangePercent.toFixed(1)}%
            </span> vs last 24h
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
          <span className="text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTrades}</div>
          <p className="text-xs text-muted-foreground">
            Total number of trades executed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          <span className="text-[hsl(var(--chart-2))]">
            <TrendingUp className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Percentage of profitable trades
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
