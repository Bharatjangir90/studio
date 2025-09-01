'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { tradingPairs as initialPairs } from '@/lib/mock-data';
import type { TradingPair } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bitcoin, CircleDollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  BTC: Bitcoin,
  ETH: CircleDollarSign,
  SOL: CircleDollarSign,
};

export function PriceFeed() {
  const [pairs, setPairs] = useState<TradingPair[]>(initialPairs);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prevPairs) =>
        prevPairs.map((p) => {
          const change = (Math.random() - 0.5) * 0.01;
          const newPrice = p.price * (1 + change);
          const newChange24h = p.change24h + change * 100;
          return { ...p, price: newPrice, change24h: newChange24h };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredPairs = useMemo(() => {
    return pairs.filter((pair) =>
      pair.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pairs, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Prices</CardTitle>
        <CardDescription>Real-time prices for top pairs.</CardDescription>
        <Input
          placeholder="Filter pairs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPairs.map((pair) => {
                const Icon = iconMap[pair.name.split('/')[0]] || CircleDollarSign;
                const isPositive = pair.change24h >= 0;
                return (
                  <TableRow key={pair.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div className="font-medium">{pair.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ${pair.price.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        'text-right font-medium flex items-center justify-end gap-1',
                        isPositive ? 'text-[hsl(var(--chart-2))]' : 'text-destructive'
                      )}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {pair.change24h.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
