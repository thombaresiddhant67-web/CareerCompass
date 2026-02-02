'use server';

/**
 * @fileOverview A career suggestion AI agent that adapts to current industry trends.
 *
 * - adaptiveCareerSuggestions - A function that provides career suggestions based on user input and current industry trends.
 * - AdaptiveCareerSuggestionsInput - The input type for the adaptiveCareerSuggestions function.
 * - AdaptiveCareerSuggestionsOutput - The return type for the adaptiveCareerSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveCareerSuggestionsInputSchema = z.object({
  educationLevel: z.string().describe('The user\'s current education level (e.g., high school, bachelor\'s, master\'s).'),
  technicalSkills: z.string().describe('A comma-separated list of the user\'s technical skills.'),
  nonTechnicalSkills: z.string().describe('A comma-separated list of the user\'s non-technical skills (e.g., communication, teamwork).'),
  interests: z.string().describe('A comma-separated list of the user\'s interests.'),
  preferredIndustries: z.string().describe('A comma-separated list of the user\'s preferred industries.'),
  experienceLevel: z.string().describe('The user\'s experience level (e.g., student, fresher, professional).'),
  goals: z.string().describe('The user\'s short-term and long-term career goals.'),
});
export type AdaptiveCareerSuggestionsInput = z.infer<typeof AdaptiveCareerSuggestionsInputSchema>;

const AdaptiveCareerSuggestionsOutputSchema = z.object({
  careerSuggestions: z.array(
    z.object({
      roleDescription: z.string().describe('A brief description of the career role.'),
      matchReason: z.string().describe('Why this career matches the user\'s profile.'),
      requiredSkills: z.string().describe('The technical and soft skills required for the career.'),
      recommendedLearningPath: z.string().describe('A recommended learning path including tools, technologies, or certifications.'),
      entryLevelJobTitles: z.string().describe('Examples of entry-level job titles for this career.'),
    })
  ).describe('A list of career suggestions adapted to current industry trends.'),
});
export type AdaptiveCareerSuggestionsOutput = z.infer<typeof AdaptiveCareerSuggestionsOutputSchema>;

export async function adaptiveCareerSuggestions(input: AdaptiveCareerSuggestionsInput): Promise<AdaptiveCareerSuggestionsOutput> {
  return adaptiveCareerSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveCareerSuggestionsPrompt',
  input: {schema: AdaptiveCareerSuggestionsInputSchema},
  output: {schema: AdaptiveCareerSuggestionsOutputSchema},
  prompt: `You are an intelligent, friendly, and highly professional AI Career Counselor designed to help users identify suitable career paths based on their skills, interests, education, experience level, and goals. Your primary objective is to analyze the user’s input, ask clarifying questions when needed, and provide realistic, personalized, and actionable career guidance.

  The user has the following profile:
  Education Level: {{{educationLevel}}}
  Technical Skills: {{{technicalSkills}}}
  Non-Technical Skills: {{{nonTechnicalSkills}}}
  Interests: {{{interests}}}
  Preferred Industries: {{{preferredIndustries}}}
  Experience Level: {{{experienceLevel}}}
  Goals: {{{goals}}}

  Suggest 3–5 relevant career paths ranked by suitability, and for each career include:
  (1) a brief role description,
  (2) why it matches the user’s profile,
  (3) required skills (technical and soft skills),
  (4) recommended learning path including tools, technologies, or certifications, and
  (5) entry-level job titles.

  Adapt your recommendations to current industry trends, but avoid guaranteed outcomes or unrealistic promises. Maintain an encouraging, honest, and motivational tone while clearly stating skill gaps and improvement areas. Never provide medical, legal, or psychological diagnoses.

  Format your response as a JSON object conforming to the following schema:
  ${JSON.stringify(AdaptiveCareerSuggestionsOutputSchema.shape, null, 2)}`,
});

const adaptiveCareerSuggestionsFlow = ai.defineFlow(
  {
    name: 'adaptiveCareerSuggestionsFlow',
    inputSchema: AdaptiveCareerSuggestionsInputSchema,
    outputSchema: AdaptiveCareerSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
