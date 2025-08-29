'use server';
/**
 * @fileOverview Personalized halal product recommendations flow.
 *
 * This file defines a Genkit flow that provides personalized recommendations
 * for halal products based on user history.
 *
 * - `getPersonalizedHalalProductRecommendations` - An async function that takes user ID as input and returns personalized halal product recommendations.
 * - `PersonalizedHalalProductRecommendationsInput` - The input type for the getPersonalizedHalalProductRecommendations function.
 * - `PersonalizedHalalProductRecommendationsOutput` - The output type for the getPersonalizedHalalProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHalalProductRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user to generate recommendations for.'),
  browsingHistory: z.array(z.string()).optional().describe('The user browsing history.'),
  pastPurchases: z.array(z.string()).optional().describe('The user past purchases.'),
});
export type PersonalizedHalalProductRecommendationsInput = z.infer<typeof PersonalizedHalalProductRecommendationsInputSchema>;

const PersonalizedHalalProductRecommendationsOutputSchema = z.object({
  productIds: z.array(z.string()).describe('An array of product IDs that are recommended for the user.'),
});
export type PersonalizedHalalProductRecommendationsOutput = z.infer<typeof PersonalizedHalalProductRecommendationsOutputSchema>;

export async function getPersonalizedHalalProductRecommendations(input: PersonalizedHalalProductRecommendationsInput): Promise<PersonalizedHalalProductRecommendationsOutput> {
  return personalizedHalalProductRecommendationsFlow(input);
}

const personalizedHalalProductRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedHalalProductRecommendationsPrompt',
  input: {schema: PersonalizedHalalProductRecommendationsInputSchema},
  output: {schema: PersonalizedHalalProductRecommendationsOutputSchema},
  prompt: `You are an expert recommendation system specializing in halal products.

  Based on the user's ID ({{{userId}}}), browsing history ({{{browsingHistory}}}), and past purchases ({{{pastPurchases}}}), provide a list of product IDs that the user might be interested in.

  Consider the user's past browsing history, purchase behavior, and halal requirements when generating the recommendations.
  Provide ONLY a JSON output.`,config: {
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

const personalizedHalalProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedHalalProductRecommendationsFlow',
    inputSchema: PersonalizedHalalProductRecommendationsInputSchema,
    outputSchema: PersonalizedHalalProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedHalalProductRecommendationsPrompt(input);
    return output!;
  }
);

