"use client"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { List, CheckCircle, XCircle, Shield, KeyRound } from "lucide-react";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const adminNavLinks = [
  { href: "/admin", label: "Pending Orders", icon: List },
  { href: "/admin/solved", label: "Solved Orders", icon: CheckCircle },
  { href: "/admin/denied", label: "Denied Orders", icon: XCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('adminAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Securely check against environment variable
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      toast({ title: 'Authentication Successful', description: 'Welcome, Admin!' });
    } else {
      toast({ title: 'Authentication Failed', description: 'Incorrect password.', variant: 'destructive' });
    }
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
              <Shield className="w-6 h-6" /> Admin Access
            </CardTitle>
            <CardDescription>
              Please enter the password to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-2">
                {adminNavLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.href}
                      asChild
                      variant={pathname === link.href ? "default" : "ghost"}
                      className="justify-start"
                    >
                      <Link href={link.href} className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </Link>
                    </Button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </aside>
        <main className="md:col-span-3">
            {children}
        </main>
      </div>
    </div>
  );
}