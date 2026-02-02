import Link from "next/link";
import { Compass } from "lucide-react";

export default function Header() {
  return (
    <header className="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">Career Compass</span>
        </Link>
      </div>
    </header>
  );
}
