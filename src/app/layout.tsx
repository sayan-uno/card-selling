import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL('https://sayan-quotes.vercel.app'), // Replace with your actual domain
  title: {
    default: "Sayan Quotes - Custom Framed Quotes & Photos",
    template: "%s | Sayan Quotes",
  },
  description: "Get beautiful, custom-made image frames for your favorite quotes and photos. High-quality, personalized frames perfect for any wall. Turn memories into art.",
  keywords: ["quote frames", "image frames", "custom photo frames", "personalized frames", "wall art", "home decor", "Sayan Quotes"],
  openGraph: {
      title: "Sayan Quotes - Custom Framed Quotes & Photos",
      description: "Transform your favorite words and photos into timeless framed art.",
      images: [
        {
          url: '/img/images1.png', // Replace with a link to a great OG image
          width: 1200,
          height: 630,
          alt: 'A beautiful custom quote frame from Sayan Quotes.',
        },
      ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayan Quotes - Custom Framed Quotes & Photos",
    description: "Get beautiful, custom-made image frames for your favorite quotes and photos.",
    images: ['/img/images1.png'], // Replace with a link to a great Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
