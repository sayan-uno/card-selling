"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Frame, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function Header() {
  const pathname = usePathname();

  const handleFacebookLogin = () => {
    // Redirect to our new login API route
    window.location.href = '/api/auth/facebook/login';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Frame className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">Sayan Quotes</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                (pathname.startsWith(link.href) && link.href !== "/") ||
                  pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={handleFacebookLogin}>
            <Facebook className="mr-2 h-4 w-4" /> Login with Facebook
          </Button>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-lg",
                          (pathname.startsWith(link.href) &&
                            link.href !== "/") ||
                            pathname === link.href
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="pt-4 border-t">
                     <Button variant="outline" className="w-full justify-start" onClick={handleFacebookLogin}>
                          <Facebook className="mr-2 h-4 w-4" /> Login with Facebook
                     </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
