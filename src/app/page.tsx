"use client";

import type { PersonalizedCareerRecommendationsOutput } from "@/ai/flows/personalized-career-recommendations";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { generateRecommendationsAction } from "@/app/actions";
import CareerForm from "@/components/career-form";
import CareerResults from "@/components/career-results";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ResourceLinks from "@/components/resource-links";
import ResultsSkeleton from "@/components/results-skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { CareerFormSchema } from "@/lib/schema";

export default function Home() {
  const [recommendations, setRecommendations] =
    useState<PersonalizedCareerRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const heroImage = PlaceHolderImages.find((p) => p.id === "hero");

  const handleFormSubmit = async (data: CareerFormSchema) => {
    setIsLoading(true);
    setRecommendations(null);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const result = await generateRecommendationsAction(data);
      setRecommendations(result);
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          e.message || "Failed to generate recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col dark:bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative flex h-[60vh] w-full items-center justify-center text-center text-white md:h-[80vh]">
          <div className="absolute inset-0 bg-black/40" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover -z-10"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="container relative px-4 md:px-6">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your Future with Career Compass
            </h1>
            <p className="mx-auto my-6 max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Your personal AI career counselor. Chart a course to your dream
              job with tailored recommendations and actionable roadmaps.
            </p>
            <Button
              size="lg"
              onClick={handleScrollToForm}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Get Started
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <div ref={formRef}>
          <CareerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>

        <div ref={resultsRef} className="py-12 md:py-20">
          {isLoading && <ResultsSkeleton />}
          {recommendations && (
            <CareerResults recommendations={recommendations} />
          )}
        </div>

        <ResourceLinks />
      </main>
      <Footer />
    </div>
  );
}
