import { Header } from '@/components/header';
import { PriceChart } from '@/components/price-chart';
import { TradingSignal } from '@/components/trading-signal';
import { OpenTrades } from '@/components/open-trades';
import { PriceFeed } from '@/components/price-feed';

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <aside className="w-80 border-r border-border p-4 hidden lg:flex flex-col gap-4">
          <PriceFeed />
          <OpenTrades />
        </aside>
        <main className="flex-1 p-4">
          <PriceChart />
        </main>
        <aside className="w-80 border-l border-border p-4 hidden lg:block">
          <TradingSignal />
        </aside>
      </div>
    </div>
  );
}
