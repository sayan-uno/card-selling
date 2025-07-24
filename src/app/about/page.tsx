import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">About Sayan Quotes</h1>
          <p className="text-lg text-muted-foreground mt-2">Crafting memories, one frame at a time.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
            <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="p-6 flex flex-col justify-center">
                        <h2 className="font-headline text-2xl text-primary mb-3">Our Mission</h2>
                        <p className="text-muted-foreground">
                            At Sayan Quotes, we believe that powerful words deserve a special place in your home. Our mission is to provide you with high-quality, beautifully crafted image frames that turn your favorite quotes into works of art. Whether it's for inspiration, motivation, or a cherished memory, our frames are designed to be a perfect fit for any wall or space.
                        </p>
                    </div>
                    <div className="relative h-64 md:h-auto">
                        <Image src="https://placehold.co/600x400" alt="Crafting a frame" layout="fill" objectFit="cover" data-ai-hint="workshop art" />
                    </div>
                </div>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Our Process & Promise</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>
                        We are a quotes image frame selling website dedicated to bringing your words to life. We handle every order with the utmost care, from the moment you share your quote to the final delivery.
                    </p>
                    <p>
                        We collect your details—such as your address and contact information—for the sole purpose of fulfilling your order and ensuring it reaches you safely. We are committed to protecting your privacy; we do not misuse or sell your information. Your trust is our top priority.
                    </p>
                    <p>
                        If you reach out to us via Instagram DM, we collect message and profile information strictly to provide you with better, more personalized service. All interactions are handled with confidentiality and professionalism.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p>
                        We are just getting started! We will be coming very soon with a wider variety of frame styles, materials, and customization options to give you even more ways to express yourself. Stay tuned for exciting new additions to our collection!
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
