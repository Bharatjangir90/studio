'use server';

/**
 * @fileOverview AI-powered trading signal generation flow.
 *
 * - generateTradingSignal - A function that generates trading signals based on market analysis.
 * - TradingSignalInput - The input type for the generateTradingSignal function.
 * - TradingSignalOutput - The return type for the generateTradingSignal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TradingSignalInputSchema = z.object({
  tradingPair: z.string().describe('The trading pair to analyze (e.g., BTC/USD).'),
  currentPrice: z.number().describe('The current price of the trading pair.'),
  historicalData: z.string().describe('Historical market data for the trading pair.'),
});
export type TradingSignalInput = z.infer<typeof TradingSignalInputSchema>;

const TradingSignalOutputSchema = z.object({
  signal: z
    .enum(['BUY', 'SELL', 'HOLD'])
    .describe('The trading signal: BUY, SELL, or HOLD.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence level of the signal, from 0 to 1.'),
  reason: z.string().describe('The reasoning behind the trading signal.'),
});
export type TradingSignalOutput = z.infer<typeof TradingSignalOutputSchema>;

export async function generateTradingSignal(
  input: TradingSignalInput
): Promise<TradingSignalOutput> {
  return tradingSignalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tradingSignalPrompt',
  input: {schema: TradingSignalInputSchema},
  output: {schema: TradingSignalOutputSchema},
  prompt: `You are an AI-powered trading signal generator that mimics a hedge fund-level system.
You must follow this 10-step process to generate a trading signal:

1.  **Portfolio Analysis**: You are analyzing {{{tradingPair}}}. The current price is {{{currentPrice}}}.
2.  **ATR Calculation**: Review the historical data provided to assess volatility. Historical Data: {{{historicalData}}}
3.  **Adaptive Thresholds**: Based on the asset and its volatility, determine appropriate confidence and deviation thresholds.
4.  **Signal Generation**: Use a mix of mean reversion and momentum analysis on the provided data to generate a preliminary signal.
5.  **Multi-timeframe Check**: Conceptually, confirm if the signal holds across short, medium, and long-term trends based on the historical data pattern.
6.  **Alternative Data**: Consider market sentiment and news impact. Assume neutral sentiment unless data suggests otherwise.
7.  **Risk Controls**: Validate the signal against liquidity and volatility checks. Assume sufficient liquidity and normal volatility unless data implies extreme conditions.
8.  **Position Sizing**: Determine a theoretical position size (this is a simulation, no real funds).
9.  **Final Safety Check**: Ensure the trade would not violate daily loss limits (assume none have been hit).
10. **Trade Execution**: Based on the comprehensive analysis from steps 1-9, make a final BUY, SELL, or HOLD decision.

Provide a clear signal, a confidence score, and a concise reason for your decision based on this rigorous process.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const tradingSignalFlow = ai.defineFlow(
  {
    name: 'tradingSignalFlow',
    inputSchema: TradingSignalInputSchema,
    outputSchema: TradingSignalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
