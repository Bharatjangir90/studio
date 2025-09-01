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

const potentialInformationSourceSchema = z.object({
  name: z.string().describe('The name of the information source.'),
  description: z.string().describe('A description of the information source.'),
  url: z.string().url().describe('The URL of the information source.'),
});

const identifyInformationSources = ai.defineTool({
  name: 'identifyInformationSources',
  description: 'Identifies external information sources relevant to trading signals.',
  inputSchema: z.object({
    tradingPair: z.string().describe('The trading pair to analyze (e.g., BTC/USD).'),
  }),
  outputSchema: z.array(potentialInformationSourceSchema),
},
async (input) => {
  // TODO: Implement the logic to identify relevant external information sources
  // For now, return a dummy response
  return [
    {
      name: 'CoinDesk',
      description: 'Cryptocurrency news and analysis',
      url: 'https://www.coindesk.com/',
    },
    {
      name: 'TradingView',
      description: 'Charting and social networking platform for traders and investors',
      url: 'https://www.tradingview.com/',
    },
  ];
});

export async function generateTradingSignal(
  input: TradingSignalInput
): Promise<TradingSignalOutput> {
  return tradingSignalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tradingSignalPrompt',
  input: {schema: TradingSignalInputSchema},
  output: {schema: TradingSignalOutputSchema},
  tools: [identifyInformationSources],
  prompt: `You are an AI-powered trading signal generator. Analyze the provided market data and generate a trading signal (BUY, SELL, or HOLD) for the given trading pair.

Trading Pair: {{{tradingPair}}}
Current Price: {{{currentPrice}}}
Historical Data: {{{historicalData}}}

Consider information from these sources:
{{#each (identifyInformationSources tradingPair=tradingPair)}}
- Source: {{this.name}}, Description: {{this.description}}, URL: {{this.url}}
{{/each}}

Based on your analysis, provide a trading signal with a confidence level and a clear explanation of your reasoning.
`, config: {
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
