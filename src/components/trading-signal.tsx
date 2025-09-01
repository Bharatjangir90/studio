'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tradingPairs } from '@/lib/mock-data';
import type { TradingSignalOutput } from '@/ai/flows/trading-signal-generation';
import { Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';
import { getSignalAction } from '@/app/actions/trading-actions';
import { Input } from './ui/input';

const formSchema = z.object({
  tradingPair: z.string().min(1, 'Please select a trading pair.'),
});

type FormValues = z.infer<typeof formSchema>;

export function TradingSignal() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TradingSignalOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { tradingPair: 'BTC/USD' },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const signalResult = await getSignalAction(data);
      setResult(signalResult);
    } catch (e: any) {
      setError(e.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Place Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="tradingPair"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pair</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a pair" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tradingPairs.map((pair) => (
                        <SelectItem key={pair.name} value={pair.name}>
                          {pair.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Price</FormLabel>
              <Input value="Market" readOnly />
            </FormItem>
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <Input type="number" placeholder="0.00" />
            </FormItem>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="w-full bg-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))] hover:opacity-90 text-white" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                BUY
              </Button>
               <Button type="submit" variant="destructive" className="w-full text-destructive-foreground" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                SELL
              </Button>
            </div>

            {result && !isLoading && (
              <div className="space-y-2 rounded-lg border bg-secondary/30 p-3 mt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">AI Signal</h4>
                  <Badge
                    variant={
                      result.signal === 'BUY'
                        ? 'default'
                        : result.signal === 'SELL'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={cn(
                      'text-xs',
                       result.signal === 'BUY' && 'bg-[hsl(var(--chart-2))] text-white'
                    )}
                  >
                    {result.signal}
                  </Badge>
                </div>
                 <div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Confidence</span>
                    <span>{(result.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={result.confidence * 100} className="h-1.5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {result.reason}
                  </p>
                </div>
              </div>
            )}
            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
