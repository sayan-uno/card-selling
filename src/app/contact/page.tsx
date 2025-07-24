import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Get In Touch</h1>
          <p className="text-lg text-muted-foreground mt-2">We'd love to hear from you. For feedback, support, or inquiries.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="font-headline text-2xl text-primary">Contact Information</h2>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Support Phone</h3>
                    <a href="tel:+919907703991" className="text-muted-foreground hover:text-primary transition-colors">+91 99077 03991</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-primary text-primary-foreground p-3 rounded-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Support Email</h3>
                    <a href="mailto:sm187966@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">sm187966@gmail.com</a>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                   <div className="bg-primary text-primary-foreground p-3 rounded-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">We Operate From</h3>
                    <p className="text-muted-foreground">Basirhat, North 24 Parganas,<br/>West Bengal, India</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="font-headline text-2xl text-primary">Business Hours</h2>
                 <div className="text-muted-foreground">
                    <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM (IST)</p>
                    <p><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM (IST)</p>
                    <p><span className="font-semibold">Sunday:</span> Closed</p>
                </div>
                <Separator/>
                 <p className="text-sm text-muted-foreground pt-4">
                    Our website is fully trusted and we are committed to providing the best service to our customers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
