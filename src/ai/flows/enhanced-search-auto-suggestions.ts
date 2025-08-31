'use server';
/**
 * @fileOverview Enhanced search auto-suggestions flow.
 *
 * This file defines a Genkit flow that provides AI-powered search auto-suggestions
 * for halal products, improving the search experience for customers.
 *
 * - `getEnhancedSearchAutoSuggestions` - An async function that takes a search query as input and returns enhanced auto-suggestions.
 * - `EnhancedSearchAutoSuggestionsInput` - The input type for the getEnhancedSearchAutoSuggestions function.
 * - `EnhancedSearchAutoSuggestionsOutput` - The output type for the getEnhancedSearchAutoSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancedSearchAutoSuggestionsInputSchema = z.object({
  searchQuery: z.string().describe('The user’s search query.'),
});
export type EnhancedSearchAutoSuggestionsInput = z.infer<typeof EnhancedSearchAutoSuggestionsInputSchema>;

const EnhancedSearchAutoSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of search suggestions related to the query.'),
});
export type EnhancedSearchAutoSuggestionsOutput = z.infer<typeof EnhancedSearchAutoSuggestionsOutputSchema>;

export async function getEnhancedSearchAutoSuggestions(input: EnhancedSearchAutoSuggestionsInput): Promise<EnhancedSearchAutoSuggestionsOutput> {
  return enhancedSearchAutoSuggestionsFlow(input);
}

const enhancedSearchAutoSuggestionsPrompt = ai.definePrompt({
  name: 'enhancedSearchAutoSuggestionsPrompt',
  input: {schema: EnhancedSearchAutoSuggestionsInputSchema},
  output: {schema: EnhancedSearchAutoSuggestionsOutputSchema},
  prompt: `You are an AI assistant specializing in generating search auto-suggestions for a halal e-commerce platform.

  Based on the user's search query ({{{searchQuery}}}), provide a list of auto-suggestions that can help the user find relevant halal products.

  Consider common misspellings, related terms, and popular search queries when generating the suggestions.
  Provide ONLY a JSON output.`,
});

const enhancedSearchAutoSuggestionsFlow = ai.defineFlow(
  {
    name: 'enhancedSearchAutoSuggestionsFlow',
    inputSchema: EnhancedSearchAutoSuggestionsInputSchema,
    outputSchema: EnhancedSearchAutoSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await enhancedSearchAutoSuggestionsPrompt(input);
    return output!;
  }
);
