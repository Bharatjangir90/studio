'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
    <Card>
      <CardHeader>
        <CardTitle>Open Trades</CardTitle>
        <CardDescription>Your current active positions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-right">Unrealized P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell>
                    <div className="font-medium">{trade.pair.split('/')[0]}</div>
                    <div className="text-xs text-muted-foreground">{trade.pair.split('/')[1]}</div>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge
                      variant={trade.type === 'BUY' ? 'default' : 'destructive'}
                      className={cn(
                        trade.type === 'BUY' &&
                          'bg-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))] text-white',
                        'w-12 justify-center'
                      )}
                    >
                      {trade.type}
                    </Badge>
                  </TableCell>
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
