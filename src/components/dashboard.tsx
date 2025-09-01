import { Header } from '@/components/header';
import { PnlSummary } from '@/components/pnl-summary';
import { PriceChart } from '@/components/price-chart';
import { PriceFeed } from '@/components/price-feed';
import { TradingSignal } from '@/components/trading-signal';
import { OpenTrades } from '@/components/open-trades';
import { HistoricalTrades } from '@/components/historical-trades';
import { Card, CardContent } from '@/components/ui/card';

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
        <PnlSummary />
        <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <PriceChart />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <OpenTrades />
              <HistoricalTrades />
            </div>
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <PriceFeed />
            <TradingSignal />
          </div>
        </div>
      </main>
    </div>
  );
}
