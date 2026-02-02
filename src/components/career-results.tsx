import type { PersonalizedCareerRecommendationsOutput } from "@/ai/flows/personalized-career-recommendations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Target,
  Puzzle,
  GitBranch,
  GraduationCap,
} from "lucide-react";

interface CareerResultsProps {
  recommendations: PersonalizedCareerRecommendationsOutput;
}

const iconMapping: { [key: string]: React.ElementType } = {
  "Why it's a match": Target,
  "Skills You'll Need": Puzzle,
  "Your Learning Roadmap": GitBranch,
  "Entry-Level Jobs": Briefcase,
};

function formatText(text: string) {
  return text.split('\n').map((item, index) => {
    if (item.trim() === '') return null;
    return <p key={index} className="mb-2 last:mb-0">{item.replace(/^- /, '• ')}</p>;
  });
}

export default function CareerResults({ recommendations }: CareerResultsProps) {
  return (
    <section className="bg-background/80 py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Your Personalized Career Paths
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Based on your profile, here are some career paths that could be a
            great fit for you.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec, index) => (
            <Card key={index} className="flex flex-col shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl">
                      {rec.roleDescription
                        .split(":")[0]
                        .replace("Role Description", "")
                        .trim()}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {rec.roleDescription.substring(
                        rec.roleDescription.indexOf(":") + 1
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="match">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Why it's a match
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none text-foreground/80">
                      {formatText(rec.matchExplanation)}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="skills">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Puzzle className="h-5 w-5 text-primary" />
                        Skills You'll Need
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none text-foreground/80">
                      {formatText(rec.requiredSkills)}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="roadmap">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-primary" />
                        Your Learning Roadmap
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none text-foreground/80">
                      {formatText(rec.recommendedLearningPath)}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex-col items-start gap-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="h-4 w-4" /> Entry-Level Job Titles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rec.entryLevelJobTitles.split(",").map((title) => (
                    <Badge key={title.trim()} variant="secondary">
                      {title.trim()}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
