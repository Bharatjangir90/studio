'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
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
    label: 'Moving Avg.',
    color: 'hsl(var(--chart-4))',
  },
  volume: {
    label: 'Volume',
    color: 'hsl(var(--muted))'
  }
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
    <Card className="h-full">
      <CardHeader className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <div className="flex items-center gap-4">
            <CardTitle>BTC/USD</CardTitle>
            <div className="text-2xl font-bold text-[hsl(var(--chart-2))]">${lastPrice.toLocaleString()}</div>
          </div>
          <CardDescription>
            Bitcoin / US Dollar
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {(['1m', '5m', '1h'] as Timeframe[]).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={timeframe === t ? 'secondary' : 'ghost'}
              className="h-7"
              onClick={() => setTimeframe(t)}
            >
              {t.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-8rem)]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ComposedChart
            data={activeData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)"/>
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['dataMin - 500', 'dataMax + 500']}
              tickFormatter={(value) => `$${value}`}
            />
             <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 'dataMax * 4']}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltipCore
              cursor={true}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(label) => `Time: ${label}`}
                  formatter={(value, name) => (
                    <>
                      <div className="font-bold capitalize">{name}</div>
                      <div>${(value as number).toLocaleString()}</div>
                    </>
                  )}
                />
              }
            />
            <Bar dataKey="volume" yAxisId="right" fill="var(--color-volume)" radius={2} />
            <Line
              dataKey="price"
              yAxisId="left"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="average"
              yAxisId="left"
              type="monotone"
              stroke="var(--color-average)"
              strokeWidth={2}
              dot={false}
            />
             <ReferenceLine y={lastPrice} yAxisId="left" stroke="hsl(var(--foreground))" strokeDasharray="3 3" strokeWidth={1}>
             </ReferenceLine>
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
