import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

export default function ResultsSkeleton() {
  return (
    <div className="container px-4 md:px-6">
      <div className="mb-8 text-center md:mb-12">
        <Skeleton className="mx-auto mb-4 h-10 w-3/4" />
        <Skeleton className="mx-auto h-6 w-1/2" />
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Accordion type="single" collapsible className="w-full space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </Accordion>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
