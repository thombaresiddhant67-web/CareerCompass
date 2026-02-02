import Link from "next/link";
import { RESOURCE_LINKS } from "@/lib/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export default function ResourceLinks() {
  return (
    <section className="bg-muted/40 py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Helpful Resources
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Explore these platforms to learn new skills and find job
            opportunities.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {RESOURCE_LINKS.map((link) => (
            <Link
              href={link.url}
              key={link.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full transition-colors group-hover:border-primary group-hover:bg-card/90">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {link.name}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
