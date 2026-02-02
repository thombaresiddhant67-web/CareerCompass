"use server";

import {
  getPersonalizedCareerRecommendations,
  type PersonalizedCareerRecommendationsInput,
} from "@/ai/flows/personalized-career-recommendations";

export async function generateRecommendationsAction(
  input: PersonalizedCareerRecommendationsInput
) {
  try {
    const recommendations = await getPersonalizedCareerRecommendations(input);
    if (!recommendations || recommendations.length === 0) {
      throw new Error(
        "Could not generate recommendations. Please try again with different inputs."
      );
    }
    return recommendations;
  } catch (error) {
    console.error("Error in generateRecommendationsAction:", error);
    throw new Error(
      "An unexpected error occurred while generating recommendations. Please try again later."
    );
  }
}
