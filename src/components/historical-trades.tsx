'use client';
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
import { Badge } from '@/components/ui/badge';
import { historicalTrades } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Trade } from '@/lib/types';

export function HistoricalTrades() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Trades</CardTitle>
        <CardDescription>Review your past performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalTrades.map((trade: Trade) => (
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
                  <TableCell className="text-right font-mono">${trade.amount.toLocaleString()}</TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-medium',
                      trade.profit > 0 ? 'text-[hsl(var(--chart-2))]' : 'text-destructive'
                    )}
                  >
                    {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
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
