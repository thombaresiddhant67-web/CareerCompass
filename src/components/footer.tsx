export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background/80">
      <div className="container flex h-16 items-center justify-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} Career Compass. All rights reserved.</p>
      </div>
    </footer>
  );
}
