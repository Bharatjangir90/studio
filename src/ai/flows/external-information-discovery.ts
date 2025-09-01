'use server';

/**
 * @fileOverview This file defines a Genkit flow for discovering relevant external information sources for trading signal generation.
 *
 * - discoverExternalInformation - A function that initiates the discovery process.
 * - DiscoverExternalInformationInput - The input type for the discoverExternalInformation function.
 * - DiscoverExternalInformationOutput - The return type for the discoverExternalInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscoverExternalInformationInputSchema = z.object({
  tradingPair: z.string().describe('The trading pair to analyze (e.g., BTC/USD).'),
  analysisType: z.string().describe('The type of analysis to perform (e.g., technical, sentiment).'),
});
export type DiscoverExternalInformationInput = z.infer<typeof DiscoverExternalInformationInputSchema>;

const DiscoverExternalInformationOutputSchema = z.object({
  relevantSources: z
    .array(z.string())
    .describe('A list of potentially relevant external information sources (URLs, APIs, etc.).'),
});
export type DiscoverExternalInformationOutput = z.infer<typeof DiscoverExternalInformationOutputSchema>;

export async function discoverExternalInformation(
  input: DiscoverExternalInformationInput
): Promise<DiscoverExternalInformationOutput> {
  return discoverExternalInformationFlow(input);
}

const externalInformationDiscoveryPrompt = ai.definePrompt({
  name: 'externalInformationDiscoveryPrompt',
  input: {schema: DiscoverExternalInformationInputSchema},
  output: {schema: DiscoverExternalInformationOutputSchema},
  prompt: `You are an AI assistant designed to identify relevant external information sources for trading signal generation.

  Given a trading pair ({{{tradingPair}}}) and the type of analysis to be performed ({{{analysisType}}}),
  suggest a list of potentially relevant external information sources. These sources could include news websites,
  financial APIs, social media feeds, or any other data source that might be useful for generating trading signals.

  Return a JSON array of strings representing the source names or URLs.
  Ensure the list is diverse and covers various aspects relevant to the specified trading pair and analysis type.
  Sources should be specific (e.g. a specific Twitter feed or RSS feed, not just 'social media').`,
});

const discoverExternalInformationFlow = ai.defineFlow(
  {
    name: 'discoverExternalInformationFlow',
    inputSchema: DiscoverExternalInformationInputSchema,
    outputSchema: DiscoverExternalInformationOutputSchema,
  },
  async input => {
    const {output} = await externalInformationDiscoveryPrompt(input);
    return output!;
  }
);
