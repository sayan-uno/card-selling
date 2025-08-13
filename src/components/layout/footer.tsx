import Link from "next/link";
import { Frame } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Frame className="h-6 w-6" />
              <span className="font-bold text-lg font-headline">Sayan Quotes</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">&copy; {currentYear} Sayan Quotes. All rights reserved.</p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-headline text-lg font-semibold mb-2">Quick Links</h3>
             <div className="flex flex-col space-y-2 text-sm">
                <Link href="/" className="hover:underline text-primary-foreground/80">Home</Link>
                <Link href="/about" className="hover:underline text-primary-foreground/80">About Us</Link>
                <Link href="/contact" className="hover:underline text-primary-foreground/80">Contact</Link>
             </div>
          </div>
          <div className="md:col-span-1">
             <h3 className="font-headline text-lg font-semibold mb-2">Policies</h3>
             <div className="flex flex-col space-y-2 text-sm">
                <Link href="/privacy-policy" className="hover:underline text-primary-foreground/80">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="hover:underline text-primary-foreground/80">Terms & Conditions</Link>
                <Link href="/shipping-policy" className="hover:underline text-primary-foreground/80">Shipping Policy</Link>
                <Link href="/refund-policy" className="hover:underline text-primary-foreground/80">Refund Policy</Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
