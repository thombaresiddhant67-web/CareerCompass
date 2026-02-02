'use server';
/**
 * @fileOverview Provides personalized career path recommendations based on user input.
 *
 * - getPersonalizedCareerRecommendations - A function that generates career recommendations.
 * - PersonalizedCareerRecommendationsInput - The input type for the getPersonalizedCareerRecommendations function.
 * - PersonalizedCareerRecommendationsOutput - The return type for the getPersonalizedCareerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCareerRecommendationsInputSchema = z.object({
  educationLevel: z.string().describe('Current education level of the user.'),
  technicalSkills: z.string().describe('List of technical skills the user possesses.'),
  nonTechnicalSkills: z.string().describe('List of non-technical skills the user possesses.'),
  interests: z.string().describe('Areas of interest for the user.'),
  preferredIndustries: z.string().describe('Industries the user prefers to work in.'),
  experienceLevel: z.string().describe('Experience level of the user (student, fresher, professional).'),
  goals: z.string().describe('Short-term or long-term goals of the user.'),
});
export type PersonalizedCareerRecommendationsInput = z.infer<typeof PersonalizedCareerRecommendationsInputSchema>;

const CareerPathSchema = z.object({
  roleDescription: z.string().describe('Brief description of the career role.'),
  matchExplanation: z.string().describe('Explanation of why the career path matches the user profile.'),
  requiredSkills: z.string().describe('Technical and soft skills required for the career.'),
  recommendedLearningPath: z.string().describe('Recommended learning path including tools, technologies, or certifications.'),
  entryLevelJobTitles: z.string().describe('Entry-level job titles for the career.'),
});

const PersonalizedCareerRecommendationsOutputSchema = z.array(CareerPathSchema).describe('Array of personalized career path recommendations.');
export type PersonalizedCareerRecommendationsOutput = z.infer<typeof PersonalizedCareerRecommendationsOutputSchema>;

export async function getPersonalizedCareerRecommendations(input: PersonalizedCareerRecommendationsInput): Promise<PersonalizedCareerRecommendationsOutput> {
  return personalizedCareerRecommendationsFlow(input);
}

const personalizedCareerRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedCareerRecommendationsPrompt',
  input: {schema: PersonalizedCareerRecommendationsInputSchema},
  output: {schema: PersonalizedCareerRecommendationsOutputSchema},
  prompt: `You are an AI Career Counselor. Analyze the user's input to provide personalized career path recommendations.

  Consider the following information about the user:
  - Education Level: {{{educationLevel}}}
  - Technical Skills: {{{technicalSkills}}}
  - Non-Technical Skills: {{{nonTechnicalSkills}}}
  - Interests: {{{interests}}}
  - Preferred Industries: {{{preferredIndustries}}}
  - Experience Level: {{{experienceLevel}}}
  - Goals: {{{goals}}}

  Suggest 3-5 relevant career paths ranked by suitability. For each career, include:
  (1) A brief role description,
  (2) Why it matches the user’s profile,
  (3) Required skills (technical and soft skills),
  (4) Recommended learning path including tools, technologies, or certifications,
  (5) Entry-level job titles.

  Adapt your recommendations to current industry trends, but avoid guaranteed outcomes or unrealistic promises.
  Maintain an encouraging, honest, and motivational tone while clearly stating skill gaps and improvement areas.
  Keep responses concise, structured, and easy to read, using bullet points or numbered sections where helpful.
  Output should be a JSON array conforming to the PersonalizedCareerRecommendationsOutputSchema.
  `,
});

const personalizedCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCareerRecommendationsFlow',
    inputSchema: PersonalizedCareerRecommendationsInputSchema,
    outputSchema: PersonalizedCareerRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedCareerRecommendationsPrompt(input);
    return output!;
  }
);
