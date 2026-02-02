'use server';
/**
 * @fileOverview An AI-powered skill gap analysis flow.
 *
 * - analyzeSkillGaps - A function that analyzes skill gaps for a given career path based on a user's profile.
 * - AnalyzeSkillGapsInput - The input type for the analyzeSkillGaps function.
 * - AnalyzeSkillGapsOutput - The return type for the analyzeSkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSkillGapsInputSchema = z.object({
  careerPath: z.string().describe('The career path to analyze skill gaps for.'),
  userProfile: z.string().describe('The user profile including skills, interests, education, and experience.'),
});
export type AnalyzeSkillGapsInput = z.infer<typeof AnalyzeSkillGapsInputSchema>;

const AnalyzeSkillGapsOutputSchema = z.object({
  skillGaps: z.string().describe('A detailed analysis of the skill gaps for the specified career path based on the user profile.'),
  recommendedSkills: z.array(z.string()).describe('A list of recommended skills to acquire to fill the skill gaps.'),
});
export type AnalyzeSkillGapsOutput = z.infer<typeof AnalyzeSkillGapsOutputSchema>;

export async function analyzeSkillGaps(input: AnalyzeSkillGapsInput): Promise<AnalyzeSkillGapsOutput> {
  return analyzeSkillGapsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSkillGapsPrompt',
  input: {schema: AnalyzeSkillGapsInputSchema},
  output: {schema: AnalyzeSkillGapsOutputSchema},
  prompt: `You are an AI career counselor specializing in identifying skill gaps for various career paths.

You will receive a career path and a user profile. Your task is to analyze the user's skills and experience against the requirements of the specified career path and provide a detailed skill gap analysis and a list of recommended skills to acquire.

Career Path: {{{careerPath}}}
User Profile: {{{userProfile}}}

Analyze the skill gaps and provide a list of recommended skills that the user should acquire to pursue the specified career path. The skill gaps MUST be very detailed.
`, 
});

const analyzeSkillGapsFlow = ai.defineFlow(
  {
    name: 'analyzeSkillGapsFlow',
    inputSchema: AnalyzeSkillGapsInputSchema,
    outputSchema: AnalyzeSkillGapsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
