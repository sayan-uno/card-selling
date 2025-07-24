import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, BookOpen } from "lucide-react";
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
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        At Sayan Quotes, we believe that powerful words and cherished photos deserve a special place in your home. Our mission is to provide you with high-quality, beautifully crafted frames that turn your favorite memories into works of art. Whether it's for inspiration, motivation, or a precious moment, our frames are designed to be a perfect fit for any space.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">What We Offer</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                   <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-md mt-1">
                          <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                          <h3 className="font-semibold text-lg text-foreground">Frames with Quotes</h3>
                          <p>Immortalize your favorite sayings, poems, or motivational quotes. You can provide the author's name and even a photo to accompany the text, creating a piece that is both personal and inspiring.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-md mt-1">
                          <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                          <h3 className="font-semibold text-lg text-foreground">Frames with "Photo Only" Mode</h3>
                          <p>Have a beautiful photo that speaks for itself? Our "Photo Only" mode is perfect for you. Simply use the toggle on the customization form to switch modes, upload your image, and we'll create a stunning photo frame without any text. It's the perfect way to let your pictures shine.</p>
                      </div>
                   </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Our Process & Promise</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>
                        We are a custom frame design service dedicated to bringing your vision to life. We handle every order with the utmost care, from the moment you share your idea to the final delivery.
                    </p>
                    <p>
                        We collect your details—such as your address and contact information—for the sole purpose of fulfilling your order and ensuring it reaches you safely. We are committed to protecting your privacy; we do not misuse or sell your information. Your trust is our top priority.
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
