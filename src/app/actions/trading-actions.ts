'use server';

import { z } from 'zod';
import { tradingPairs } from '@/lib/mock-data';
import { generateTradingSignal } from '@/ai/flows/trading-signal-generation';
import type { TradingSignalOutput } from '@/ai/flows/trading-signal-generation';

const formSchema = z.object({
  tradingPair: z.string().min(1, 'Please select a trading pair.'),
});

type FormValues = z.infer<typeof formSchema>;

export async function getSignalAction(data: FormValues): Promise<TradingSignalOutput> {
  const pairInfo = tradingPairs.find((p) => p.name === data.tradingPair);
  if (!pairInfo) {
    throw new Error('Invalid trading pair');
  }

  const signal = await generateTradingSignal({
    tradingPair: data.tradingPair,
    currentPrice: pairInfo.price,
    historicalData: 'Mock historical data: Price has been trending upwards for the last 48 hours.',
  });
  return signal;
}
