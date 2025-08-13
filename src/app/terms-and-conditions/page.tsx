import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Terms and Conditions</h1>
          <p className="text-lg text-muted-foreground mt-2">Please read these terms carefully before using our service.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">1. Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Welcome to Sayan Quotes ("we", "our", "us"). These Terms and Conditions govern your use of our website and the services we provide. By placing an order, you agree to be bound by these terms. Our service involves creating custom-designed frames for quotes and photos based on your specifications.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">2. Our Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>We offer a custom frame design service. You can provide a quote, author, and an optional photo, or use our "Photo Only" mode to frame an image without text. The final product is a physical, framed piece of art delivered to you.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">3. Order and Approval Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>
                    When you submit your customization details and place an order, you are making an offer to purchase a custom product.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Demo Creation:</strong> After receiving your order, we will create a digital demo (mockup) of your final frame design.</li>
                    <li><strong>Approval Required:</strong> We will send this demo to you via the contact information you provide (email or phone). The order is not confirmed until you approve this demo.</li>
                    <li><strong>Revisions:</strong> You may request reasonable changes to the demo. We will work with you to ensure the design meets your approval.</li>
                    <li><strong>Final Confirmation:</strong> Once you give final approval, we will proceed with production. No further changes can be made after this point.</li>
                </ul>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">4. Pricing and Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The prices displayed on the website are minimum estimates. The final price depends on factors like size, materials, and complexity. The final price will be confirmed during the demo approval stage. Payment options (online payment or cash on delivery) will also be provided at that time.
              </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">5. User-Provided Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you upload a photo or provide a quote, you represent and warrant that you have the right to use, reproduce, and display that content. You agree not to upload any content that is illegal, offensive, or infringes on the intellectual property rights of others. We reserve the right to refuse any order that we deem inappropriate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To the fullest extent permitted by law, Sayan Quotes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of our service. Our total liability for any claim arising out of these terms or our service will not exceed the total amount you paid us for the product in question.
              </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">7. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of our service after any such change constitutes your acceptance of the new Terms and Conditions.
              </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">8. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have any questions about these Terms and Conditions, please contact us through our <Link href="/contact" className="text-primary hover:underline font-semibold">Contact Page</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
