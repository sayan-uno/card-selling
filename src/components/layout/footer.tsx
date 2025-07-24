import Link from "next/link";
import { Frame } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Frame className="h-6 w-6" />
              <span className="font-bold text-lg font-headline">Sayan Quotes</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">&copy; {currentYear} Sayan Quotes. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="text-sm hover:underline text-primary-foreground/80">Privacy Policy</Link>
            <Link href="/contact" className="text-sm hover:underline text-primary-foreground/80">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
