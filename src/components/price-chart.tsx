'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip as ChartTooltipCore,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { chartData, chartData5m, chartData1h } from '@/lib/mock-data';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
  average: {
    label: '3-day Average',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

type Timeframe = '1m' | '5m' | '1h';
const dataMap = {
  '1m': chartData,
  '5m': chartData5m,
  '1h': chartData1h,
};

export function PriceChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>('5m');

  const activeData = dataMap[timeframe];
  const lastPrice = activeData[activeData.length - 1].price;

  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle>BTC/USD Price Chart</CardTitle>
          <CardDescription>
            Showing price data for Bitcoin against US Dollar
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {(['1m', '5m', '1h'] as Timeframe[]).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={timeframe === t ? 'default' : 'outline'}
              className="h-7"
              onClick={() => setTimeframe(t)}
            >
              {t.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video h-[350px] w-full">
          <ComposedChart
            data={activeData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['dataMin - 100', 'dataMax + 100']}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltipCore
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(label, payload) => {
                    return `Time: ${label}`;
                  }}
                  formatter={(value, name) => (
                    <>
                      <div className="flex-1 space-y-1">
                        <div className="font-bold capitalize">{name}</div>
                      </div>
                      <div className="font-mono">${(value as number).toLocaleString()}</div>
                    </>
                  )}
                />
              }
            />
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillPrice)"
              stroke="var(--color-price)"
              stackId="a"
            />
            <Line
              dataKey="average"
              type="natural"
              stroke="var(--color-average)"
              strokeWidth={2}
              dot={false}
            />
             <ReferenceLine y={lastPrice} stroke="hsl(var(--foreground))" strokeDasharray="3 3" strokeWidth={1}>
             </ReferenceLine>
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
