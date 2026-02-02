"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { careerFormSchema, type CareerFormSchema } from "@/lib/schema";
import { EXPERIENCE_LEVELS } from "@/lib/constants";

interface CareerFormProps {
  onSubmit: (data: CareerFormSchema) => void;
  isLoading: boolean;
}

export default function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
  const form = useForm<CareerFormSchema>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      educationLevel: "",
      technicalSkills: "",
      nonTechnicalSkills: "",
      interests: "",
      preferredIndustries: "",
      experienceLevel: "student",
      goals: "",
    },
  });

  return (
    <section id="form" className="bg-muted/40 py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <Card className="mx-auto max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">
              Tell Us About Yourself
            </CardTitle>
            <CardDescription>
              The more details you provide, the better our recommendations will
              be.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="educationLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Bachelor's in Computer Science"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EXPERIENCE_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="technicalSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technical Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List your technical skills, separated by commas (e.g., Python, React, SQL, AWS)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nonTechnicalSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Non-Technical Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List your soft skills (e.g., Communication, Teamwork, Problem-solving)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What are you passionate about? (e.g., AI, mobile development, data visualization)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredIndustries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Industries</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., FinTech, Healthcare, E-commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Career Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your short-term and long-term career aspirations."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        What do you want to achieve in your career?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  size="lg"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Generate Recommendations"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
