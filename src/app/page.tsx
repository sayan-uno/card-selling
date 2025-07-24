import { FrameGallery } from "@/components/frame-gallery";
import { Button } from "@/components/ui/button";
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
              Words That Resonate, Framed for Eternity
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your favorite quotes into timeless art. Choose a frame, share your words, and let us create a masterpiece for your walls that speaks volumes.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#gallery">Explore Frames</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 sm:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Choose Your Style</h2>
            <p className="text-lg text-muted-foreground mt-2">Select a frame that perfectly matches your space and sentiment.</p>
          </div>
          <FrameGallery />
        </div>
      </section>
    </div>
  );
}
