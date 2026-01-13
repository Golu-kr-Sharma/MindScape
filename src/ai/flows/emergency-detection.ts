// src/ai/flows/emergency-detection.ts
'use server';

/**
 * @fileOverview A flow to detect emergency situations based on user input and provide emergency helplines.
 *
 * - detectEmergency - A function that takes user input and returns helplines if an emergency is detected.
 * - EmergencyDetectionInput - The input type for the detectEmergency function.
 * - EmergencyDetectionOutput - The return type for the detectEmergency function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmergencyDetectionInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input text to check for emergency keywords.'),
});
export type EmergencyDetectionInput = z.infer<typeof EmergencyDetectionInputSchema>;

const EmergencyDetectionOutputSchema = z.object({
  emergencyDetected: z
    .boolean()
    .describe('Whether an emergency situation is detected in the user input.'),
  helplines: z.array(
    z.string().describe('A list of emergency helpline numbers to display.')
  ),
});
export type EmergencyDetectionOutput = z.infer<typeof EmergencyDetectionOutputSchema>;

export async function detectEmergency(
  input: EmergencyDetectionInput
): Promise<EmergencyDetectionOutput> {
  return detectEmergencyFlow(input);
}

const emergencyDetectionPrompt = ai.definePrompt({
  name: 'emergencyDetectionPrompt',
  input: {schema: EmergencyDetectionInputSchema},
  output: {schema: EmergencyDetectionOutputSchema},
  prompt: `You are a mental health support AI. Your task is to analyze user input to detect potential emergency situations, specifically self-harm or immediate danger.

  Respond in JSON format.

  Here's how you should respond:

  - emergencyDetected: true if the user expresses thoughts of self-harm, suicide, or indicates they are in immediate danger. Otherwise, false.
  - helplines: An array of emergency helpline numbers to display to the user if emergencyDetected is true. Include these helplines:
    - Tele Mental Health: 14416 / 1-800-891-4416
    - AASRA: 9152987821

  If emergencyDetected is false, the helplines array should be empty.

  User Input: {{{userInput}}}
  `,
});

const detectEmergencyFlow = ai.defineFlow(
  {
    name: 'detectEmergencyFlow',
    inputSchema: EmergencyDetectionInputSchema,
    outputSchema: EmergencyDetectionOutputSchema,
  },
  async input => {
    const {output} = await emergencyDetectionPrompt(input);
    return output!;
  }
);
