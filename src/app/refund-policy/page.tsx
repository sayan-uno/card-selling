import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PackageX, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Refund & Return Policy</h1>
          <p className="text-lg text-muted-foreground mt-2">Our commitment to your satisfaction.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">

          <Alert variant="default" className="bg-primary/5 border-primary/20">
            <ShieldCheck className="h-4 w-4 !text-primary" />
            <AlertTitle className="text-primary font-bold">Your Approval is Key</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Because every frame is custom-made just for you, we have a unique return policy. We ensure your satisfaction by sending a digital demo for your approval before we start production. **No order is produced without your final sign-off.**
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                <PackageX className="w-6 h-6"/> Returns & Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Due to the personalized nature of our products, we cannot offer returns or refunds for reasons such as a change of mind or if you dislike the design you previously approved.
              </p>
              <p>
                However, your satisfaction is our top priority. We will issue a **full refund or a free replacement** under the following circumstances:
              </p>
               <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>The final product is significantly different from the demo you approved.</li>
                    <li>The product arrives damaged or with a manufacturing defect.</li>
                    <li>You received the wrong item.</li>
                </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">How to Request a Refund or Replacement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>If your order qualifies for a return based on the criteria above, please follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Contact us within **48 hours** of receiving your order via our <Link href="/contact" className="text-primary hover:underline font-semibold">Contact Page</Link>.</li>
                  <li>In your message, please include your order number and a clear description of the issue.</li>
                  <li><strong>Crucially, please attach clear photos or a short video</strong> showing the damage, defect, or discrepancy. This is required for us to process your request.</li>
                </ol>
                <p>
                  Once we receive your request and verify the issue, we will initiate the replacement or refund process promptly.
                </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                <HelpCircle className="w-6 h-6"/> Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
                <p>
                    We want you to be delighted with your custom frame. If you have any concerns or questions about our policy or your order, please do not hesitate to get in touch.
                </p>
                <p className="mt-4">
                  <Link href="/contact" className="text-primary hover:underline font-semibold">Contact our support team here.</Link>
                </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
