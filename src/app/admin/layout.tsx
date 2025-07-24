"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { List, CheckCircle, XCircle } from "lucide-react";

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
