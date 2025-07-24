import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mt-2">Your trust and privacy are important to us.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This Privacy Policy outlines how Sayan Quotes ("we," "our," or "us") collects, uses, and protects your personal information when you use our website and services. We are committed to ensuring that your privacy is protected and that your data is handled responsibly. Our website is fully trusted, and this policy explains our practices in detail.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>When you place an order on our website, we collect the following information to process and deliver your custom frame:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Customization Details:</strong> The quote and author name you provide.</li>
                    <li><strong>Address Information:</strong> Country, state, district, PIN code, landmark, and village/city name.</li>
                    <li><strong>Contact Information:</strong> Your phone number and email address.</li>
                </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    The information we collect is used exclusively for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                    <li>To process your order and manufacture your custom item.</li>
                    <li>To ship and deliver your order to the correct address.</li>
                    <li>To communicate with you regarding your order status, including confirmations and shipping updates.</li>
                    <li>To provide customer support and respond to your inquiries.</li>
                </ul>
                <p className="mt-4 font-semibold text-foreground">
                    We want to be crystal clear: we do not misuse or sell your personal information to third parties under any circumstances.
                </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Order &amp; Demo Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                After you submit an order, we will contact you using the provided contact details to share a demo of the frame design. We will show you the design for your approval and accommodate any changes you might need. Once you accept the final design, we will proceed with creating and delivering the frame to your address.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Communications via Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you contact us through Instagram Direct Messages (DM), we may collect your messages and profile information. This data is used solely to understand your needs and provide you with better, more personalized service. We handle this information with the same level of care and confidentiality as data collected through our website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We are committed to ensuring that your information is secure. We have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online to prevent unauthorized access or disclosure.
              </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have any questions or feedback regarding this privacy policy or our practices, please do not hesitate to contact us through our <a href="/contact" className="text-primary hover:underline font-semibold">Contact Page</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
