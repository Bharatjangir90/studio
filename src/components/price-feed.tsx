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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Markets</CardTitle>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPairs.map((pair) => {
                const isPositive = pair.change24h >= 0;
                return (
                  <TableRow key={pair.name} className="text-xs">
                    <TableCell>
                      <div className="font-medium">{pair.name}</div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {pair.price.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        'text-right font-medium',
                        isPositive ? 'text-[hsl(var(--chart-2))]' : 'text-destructive'
                      )}
                    >
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
