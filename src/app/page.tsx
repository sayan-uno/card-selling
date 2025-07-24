import { FrameGallery } from "@/components/frame-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, Hand, Send, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="absolute inset-0 bg-primary opacity-10"></div>
          <div className="relative z-10">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary mb-4">
              Your Memories, Beautifully Framed
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your favorite quotes and photos into timeless art. Choose a frame, share your vision, and let us create a masterpiece for your walls that speaks volumes.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-transform duration-200">
              <Link href="#gallery">Explore Frames</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 sm:py-24 bg-background">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">How It Works</h2>
              <p className="text-lg text-muted-foreground mt-2">Create your perfect frame in four simple steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary rounded-full text-primary-foreground mb-4">
                  <Paintbrush className="w-8 h-8"/>
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">1. Choose Your Style</h3>
                <p className="text-muted-foreground">Browse our gallery and select the perfect frame that matches your aesthetic.</p>
              </div>
               <div className="flex flex-col items-center">
                <div className="p-4 bg-primary rounded-full text-primary-foreground mb-4">
                  <Hand className="w-8 h-8"/>
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">2. Personalize It</h3>
                <p className="text-muted-foreground">Enter your quote, upload a photo, or both! Tell us exactly what you want.</p>
              </div>
               <div className="flex flex-col items-center">
                <div className="p-4 bg-primary rounded-full text-primary-foreground mb-4">
                  <Send className="w-8 h-8"/>
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">3. Approve the Demo</h3>
                <p className="text-muted-foreground">We'll send you a digital demo of your design. You can request changes until it's perfect.</p>
              </div>
               <div className="flex flex-col items-center">
                <div className="p-4 bg-primary rounded-full text-primary-foreground mb-4">
                  <Smile className="w-8 h-8"/>
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">4. Receive Your Art</h3>
                <p className="text-muted-foreground">Once approved, we'll craft and deliver your final, beautiful frame right to your doorstep.</p>
              </div>
            </div>
         </div>
      </section>

      <section id="gallery" className="py-16 sm:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Choose Your Frame</h2>
            <p className="text-lg text-muted-foreground mt-2">Select a frame that perfectly matches your space and sentiment.</p>
          </div>
          <FrameGallery />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Why Choose Sayan Quotes?</h2>
            <p className="text-lg text-muted-foreground mt-2">We are passionate about quality and customer satisfaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We use high-quality materials to ensure your framed art is durable and looks stunning.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Fully Personalized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your vision is our blueprint. From quotes to photos and custom sizes, we make it uniquely yours.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Satisfaction Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">With our demo approval process, you see exactly what you're getting. We don't build it until you love it.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
