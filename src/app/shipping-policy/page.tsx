import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Clock } from "lucide-react";
import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Shipping Policy</h1>
          <p className="text-lg text-muted-foreground mt-2">How we get your custom frame to you.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Clock className="w-6 h-6"/> Order Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our frames are custom-made with care. After you give final approval on your digital demo, please allow **3-5 business days** for us to produce, assemble, and package your order. We'll notify you via email or phone as soon as your order is ready for dispatch.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Package className="w-6 h-6"/> Shipping Methods & Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>We partner with reliable courier services to ensure your order arrives safely. The shipping method and final cost will be determined based on your location and the size/weight of your order.</p>
                <p><strong>All shipping costs will be clearly communicated and confirmed with you during the demo approval process before you make a payment.</strong></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Truck className="w-6 h-6"/> Estimated Delivery Time</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
                <p>
                    Once dispatched, the estimated delivery time is as follows:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                    <li><strong>Metros & Tier 1 Cities:</strong> 3-5 business days</li>
                    <li><strong>Tier 2 & 3 Cities:</strong> 5-8 business days</li>
                    <li><strong>Remote Locations:</strong> 8-12 business days</li>
                </ul>
                <p className="mt-4 text-sm">
                    Please note that these are estimates. Delivery times may vary due to weather conditions, local holidays, or unforeseen courier delays. We will provide you with a tracking number to monitor your shipment's progress.
                </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Please ensure that the shipping address you provide is complete and accurate. We are not responsible for delays or losses due to an incorrect or incomplete address. Any charges for re-shipping an order due to an address error will be the responsibility of the customer.
              </p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Questions?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                If you have any questions about your order's shipping, please don't hesitate to reach out through our <Link href="/contact" className="text-primary hover:underline font-semibold">Contact Page</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
