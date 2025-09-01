import { Header } from '@/components/header';
import { PriceChart } from '@/components/price-chart';
import { TradingSignal } from '@/components/trading-signal';
import { OpenTrades } from '@/components/open-trades';
import { PriceFeed } from '@/components/price-feed';
import { PnlSummary } from '@/components/pnl-summary';
import { HistoricalTrades } from '@/components/historical-trades';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiskAndDataSummary } from './risk-data-summary';

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col p-4 gap-4">
        <PnlSummary />
        <RiskAndDataSummary />
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 hidden lg:flex flex-col gap-4">
            <PriceFeed />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4 h-[600px]">
            <PriceChart />
          </div>

          <div className="lg:col-span-1 hidden lg:flex flex-col gap-4">
            <TradingSignal />
          </div>
        </div>
        <div className="lg:hidden">
          <Tabs defaultValue="markets">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="order">Place Order</TabsTrigger>
            </TabsList>
            <TabsContent value="markets" className="mt-4">
              <div className="h-[400px]">
                <PriceFeed />
              </div>
            </TabsContent>
            <TabsContent value="order" className="mt-4">
              <TradingSignal />
            </TabsContent>
          </Tabs>
        </div>
        <div className="h-[400px]">
           <Tabs defaultValue="open-orders" className="h-full flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="open-orders" className="flex-1">Open Orders</TabsTrigger>
              <TabsTrigger value="trade-history" className="flex-1">Trade History</TabsTrigger>
            </TabsList>
            <TabsContent value="open-orders" className="flex-grow mt-4">
                <OpenTrades />
            </TabsContent>
            <TabsContent value="trade-history" className="flex-grow mt-4">
                <HistoricalTrades />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
