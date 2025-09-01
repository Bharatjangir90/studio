'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { openTrades as initialOpenTrades } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Trade } from '@/lib/types';
import { Badge } from './ui/badge';

export function OpenTrades() {
  const [trades, setTrades] = useState<Trade[]>(initialOpenTrades);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrades((prevTrades) =>
        prevTrades.map((trade) => {
          const change = (Math.random() - 0.49) * (trade.amount * 0.001);
          const newProfit = trade.profit + change;
          return { ...trade, profit: newProfit };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Open Orders</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                 <TableHead className="text-right">P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id} className="text-xs">
                  <TableCell>
                    <div className="font-medium">{trade.pair}</div>
                  </TableCell>
                  <TableCell>
                     <Badge
                      variant={trade.type === 'BUY' ? 'default' : 'destructive'}
                      className={cn(
                        'text-xs',
                        trade.type === 'BUY'
                          ? 'bg-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))] text-white'
                          : 'bg-destructive hover:bg-destructive text-destructive-foreground',
                        'w-12 justify-center'
                      )}
                    >
                      {trade.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${trade.amount.toLocaleString()}</TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-medium transition-colors duration-500',
                      trade.profit > 0 ? 'text-[hsl(var(--chart-2))]' : 'text-destructive'
                    )}
                  >
                    {trade.profit.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
