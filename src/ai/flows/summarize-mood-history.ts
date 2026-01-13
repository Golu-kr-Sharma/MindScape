'use server';

/**
 * @fileOverview Summarizes mood history for a user to provide insights into their mental well-being.
 *
 * - summarizeMoodHistory - A function that summarizes mood history.
 * - SummarizeMoodHistoryInput - The input type for the summarizeMoodHistory function.
 * - SummarizeMoodHistoryOutput - The return type for the summarizeMoodHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMoodHistoryInputSchema = z.object({
  moodHistory: z.string().describe('A string containing the mood history of the user.'),
});
export type SummarizeMoodHistoryInput = z.infer<typeof SummarizeMoodHistoryInputSchema>;

const SummarizeMoodHistoryOutputSchema = z.object({
  summary: z.string().describe('A summary of the mood history, highlighting patterns and insights.'),
});
export type SummarizeMoodHistoryOutput = z.infer<typeof SummarizeMoodHistoryOutputSchema>;

export async function summarizeMoodHistory(input: SummarizeMoodHistoryInput): Promise<SummarizeMoodHistoryOutput> {
  return summarizeMoodHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMoodHistoryPrompt',
  input: {schema: SummarizeMoodHistoryInputSchema},
  output: {schema: SummarizeMoodHistoryOutputSchema},
  prompt: `You are a mental health assistant that analyzes mood history and summarizes it to provide insights to the user.

  Mood History: {{{moodHistory}}}

  Provide a summary of the mood history, highlighting any patterns, trends, or significant events that may be impacting the user's mental well-being.
  Make sure to be warm, calm, safe, respectful, and hopeful.
  `,
});

const summarizeMoodHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeMoodHistoryFlow',
    inputSchema: SummarizeMoodHistoryInputSchema,
    outputSchema: SummarizeMoodHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
