
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Frame, Facebook, Instagram, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function Header() {
  const pathname = usePathname();
  const [step, setStep] = useState(1);
  const [isFacebookLoggedIn, setIsFacebookLoggedIn] = useState(false);
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [isFacebookDialogOpen, setFacebookDialogOpen] = useState(false);
  const [isInstagramDialogOpen, setInstagramDialogOpen] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  const handleFacebookLogin = () => {
    setStep(2);
    setTimeout(() => {
      setIsFacebookLoggedIn(true);
      setFacebookDialogOpen(false);
      setStep(1);
    }, 1500);
  };

  const handleInstagramConnect = () => {
    setStep(2);
    setTimeout(() => {
        setIsInstagramConnected(true);
        setInstagramDialogOpen(false);
        setStep(1);
        setShowPermissions(false); // Reset on close
    }, 1500);
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
          {/* Facebook Login Dialog */}
          <Dialog open={isFacebookDialogOpen} onOpenChange={setFacebookDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Facebook className="mr-2 h-4 w-4" /> Login with Facebook
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">
                  {step === 1 ? 'Login with Facebook' : 'Choose Account'}
                </DialogTitle>
                <DialogDescription className="text-center">
                  {step === 1 && "This will connect your Facebook account to Sayan Quotes."}
                </DialogDescription>
              </DialogHeader>
              {step === 1 && (
                 <div className="flex flex-col items-center gap-4">
                    <Button onClick={handleFacebookLogin} className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90">
                        <Facebook className="mr-2 h-4 w-4" /> Continue with Facebook
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                        By continuing, you agree to our{' '}
                        <Link href="/privacy-policy" className="underline hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
              )}
               {step === 2 && (
                <div className="flex justify-center items-center p-8">
                     <Card className="w-full max-w-sm cursor-pointer hover:bg-muted" onClick={handleFacebookLogin}>
                        <CardContent className="p-4 flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                                <AvatarFallback>DU</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">Dummy User</p>
                                <p className="text-sm text-muted-foreground">Facebook Account</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Instagram Connect Dialog */}
          <Dialog open={isInstagramDialogOpen} onOpenChange={setInstagramDialogOpen}>
             <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex">
                    <Instagram className="mr-2 h-4 w-4" /> Connect Instagram
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {step === 1 ? 'Connect to Instagram' : 'Choose Account'}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {step === 1 && 'Connect your business account to manage messages.'}
                    </DialogDescription>
                </DialogHeader>
                 {step === 1 && (
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-4 space-y-4">
                               <div className="flex justify-between items-center">
                                  <h3 className="font-semibold">Permissions Requested</h3>
                                  <Button variant="ghost" size="sm" onClick={() => setShowPermissions(!showPermissions)}>
                                    <Settings2 className="mr-2 h-4 w-4" />
                                    Edit Access
                                  </Button>
                               </div>

                                {showPermissions && (
                                   <div className="space-y-4 pt-2">
                                       <div className="flex items-center justify-between">
                                            <Label htmlFor="manage-messages">Manage messages</Label>
                                            <Switch id="manage-messages" defaultChecked disabled />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="instagram-basic">Basic account info</Label>
                                            <Switch id="instagram-basic" defaultChecked disabled />
                                        </div>
                                   </div>
                                )}
                            </CardContent>
                        </Card>
                        <div className="flex flex-col items-center gap-4">
                            <Button onClick={handleInstagramConnect} className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:opacity-90">
                                <Instagram className="mr-2 h-4 w-4" /> Connect Instagram
                            </Button>
                             <p className="text-xs text-muted-foreground text-center">
                                Review our{' '}
                                <Link href="/privacy-policy" className="underline hover:text-primary">
                                    Privacy Policy
                                </Link>
                                {' '}to learn how we handle your data.
                            </p>
                        </div>
                    </div>
                 )}
                  {step === 2 && (
                    <div className="flex justify-center items-center p-8">
                         <Card className="w-full max-w-sm cursor-pointer hover:bg-muted" onClick={handleInstagramConnect}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://placehold.co/101x101.png" alt="User" />
                                    <AvatarFallback>DU</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">dummy_user</p>
                                    <p className="text-sm text-muted-foreground">Instagram Account</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </DialogContent>
          </Dialog>

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
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="outline" className="w-full justify-start">
                                <Facebook className="mr-2 h-4 w-4" /> Login with Facebook
                           </Button>
                        </DialogTrigger>
                     </Dialog>
                  </div>
                   <div>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                                <Instagram className="mr-2 h-4 w-4" /> Connect Instagram
                            </Button>
                        </DialogTrigger>
                     </Dialog>
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

