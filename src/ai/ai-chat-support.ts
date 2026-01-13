'use server';

/**
 * @fileOverview AI chat support flow for providing empathetic assistance.
 *
 * - aiChatSupport - A function that handles the AI chat support process.
 * - AIChatSupportInput - The input type for the aiChatSupport function.
 * - AIChatSupportOutput - The return type for the aiChatSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatSupportInputSchema = z.object({
  message: z.string().describe('The user message to the AI assistant.'),
  userId: z.string().optional().describe('The ID of the user sending the message.'),
});
export type AIChatSupportInput = z.infer<typeof AIChatSupportInputSchema>;

const AIChatSupportOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response to the user message.'),
});
export type AIChatSupportOutput = z.infer<typeof AIChatSupportOutputSchema>;

export async function aiChatSupport(input: AIChatSupportInput): Promise<AIChatSupportOutput> {
  return aiChatSupportFlow(input);
}

const emergencyHelplines = `
Tele Mental Health: 14416 / 1-800-891-4416
AASRA: 9152987821
`;

const detectEmergencyTool = ai.defineTool({
  name: 'detectEmergency',
  description: 'Detects if the user is in an emergency situation and needs immediate help.',
  inputSchema: z.object({
    message: z.string().describe('The user message to check for emergency situations.'),
  }),
  outputSchema: z.boolean().describe('True if the message indicates an emergency, false otherwise.'),
},
async (input) => {
    // Basic implementation for demonstration purposes.
    // In a real application, use a more sophisticated method.
    const message = input.message.toLowerCase();
    return message.includes('self-harm') || message.includes('panic') || message.includes('danger');
});


const aiChatSupportPrompt = ai.definePrompt({
  name: 'aiChatSupportPrompt',
  input: {schema: AIChatSupportInputSchema},
  output: {schema: AIChatSupportOutputSchema},
  tools: [detectEmergencyTool],
  prompt: `You are an empathetic AI assistant designed to provide support and guidance to users.

  If the user mentions self-harm, panic, or danger, use the detectEmergency tool. If the tool returns true, then immediately display the following helplines:
  ${emergencyHelplines}
  and encourage them to seek immediate help.

  Respond to the user message with empathy and understanding.

  User Message: {{{message}}}
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const aiChatSupportFlow = ai.defineFlow(
  {
    name: 'aiChatSupportFlow',
    inputSchema: AIChatSupportInputSchema,
    outputSchema: AIChatSupportOutputSchema,
  },
  async input => {
    const {output} = await aiChatSupportPrompt(input);
    return output!;
  }
);
