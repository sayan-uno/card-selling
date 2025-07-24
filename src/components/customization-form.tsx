"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Quote, Upload, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const formSchema = z.object({
  quote: z.string().min(10, {
    message: "Quote must be at least 10 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name is required.",
  }),
  photoOption: z.enum(["none", "upload", "suggest"], {
    required_error: "You need to select a photo option.",
  }),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  district: z.string().min(2, "District is required."),
  pinCode: z.string().regex(/^\d{6}$/, "A valid 6-digit PIN code is required."),
  landmark: z.string().optional(),
  villageOrCity: z.string().min(2, "City/Village is required."),
  phone: z.string().min(10, "A valid phone number is required."),
  email: z.string().email("A valid email address is required."),
});

type CustomizationFormProps = {
  frame: { id: number; name: string, price: number } | null;
};

export function CustomizationForm({ frame }: CustomizationFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: "",
      author: "",
      photoOption: "none",
      country: "India",
      state: "West Bengal",
      district: "",
      pinCode: "",
      landmark: "",
      villageOrCity: "",
      phone: "",
      email: "",
    },
  });

  const photoOption = form.watch("photoOption");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!frame) {
        toast({
            title: "Error",
            description: "No frame selected.",
            variant: "destructive"
        })
        return;
    }
    const orderData = {
        frameId: frame.id,
        frameName: frame.name,
        framePrice: frame.price,
        ...values
    }

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            toast({
              title: "Order Submitted!",
              description: "Thank you for your order! We will contact you shortly with a demo of the frame. Once you approve the design, we will deliver it to your address.",
            });
            form.reset();
        } else {
            const errorData = await response.json();
            toast({
                title: "Error submitting order",
                description: errorData.message || "Something went wrong.",
                variant: "destructive"
            });
        }
    } catch (error) {
        toast({
            title: "Error submitting order",
            description: "An unexpected error occurred.",
            variant: "destructive"
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><Quote className="w-5 h-5" />Quote & Author</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Quote</FormLabel>
                  <FormControl>
                    <Textarea placeholder="E.g., 'The only way to do great work is to love what you do.'" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Steve Jobs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><ImageIcon className="w-5 h-5" />Author Photo</CardTitle></CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="photoOption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">No Photo</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="upload" />
                        </FormControl>
                        <FormLabel className="font-normal">Upload Photo</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="suggest" />
                        </FormControl>
                        <FormLabel className="font-normal">Suggest a photo in demo</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {photoOption === 'upload' && (
                <Alert className="mt-4">
                  <Upload className="h-4 w-4"/>
                  <AlertTitle>Coming Soon!</AlertTitle>
                  <AlertDescription>The photo upload feature is not yet available. We'll contact you via email to collect the photo after you submit your order.</AlertDescription>
                </Alert>
            )}
             {photoOption === 'suggest' && (
                <Alert className="mt-4" variant="default">
                    <ImageIcon className="h-4 w-4" />
                    <AlertTitle>Photo Suggestion</AlertTitle>
                    <AlertDescription>We will find a suitable image for your quote and include it in the demo we send you for approval.</AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline">Shipping Address</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField name="district" render={({ field }) => (<FormItem><FormLabel>District</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField name="pinCode" render={({ field }) => (<FormItem><FormLabel>PIN Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField name="villageOrCity" render={({ field }) => (<FormItem><FormLabel>Village/City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField name="landmark" render={({ field }) => (<FormItem><FormLabel>Landmark (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline">Contact Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">Submit Order</Button>
        <p className="text-xs text-center text-muted-foreground mt-2">After submitting, we'll contact you with a demo of your custom frame for your approval.</p>
      </form>
    </Form>
  );
}
