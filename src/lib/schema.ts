import { z } from "zod";

export const careerFormSchema = z.object({
  educationLevel: z.string().min(3, "Education level is required."),
  technicalSkills: z
    .string()
    .min(3, "Please list at least one technical skill."),
  nonTechnicalSkills: z
    .string()
    .min(3, "Please list at least one non-technical skill."),
  interests: z.string().min(3, "Please list your interests."),
  preferredIndustries: z
    .string()
    .min(3, "Please list your preferred industries."),
  experienceLevel: z.enum(["student", "fresher", "professional"], {
    required_error: "You need to select an experience level.",
  }),
  goals: z.string().min(10, "Please describe your goals in more detail."),
});

export type CareerFormSchema = z.infer<typeof careerFormSchema>;
