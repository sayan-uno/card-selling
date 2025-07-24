
"use client";

import { useState } from "react";
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
import { Quote, Upload, Image as ImageIcon, Ruler, MessageSquare, BookImage, ImagePlay, Loader2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const formSchema = z.object({
  quote: z.string().max(500).optional(),
  author: z.string().max(100).optional(),
  photoOption: z.enum(["none", "upload", "suggest"]),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  district: z.string().min(2, "District is required."),
  pinCode: z.string().regex(/^\d{6}$/, "A valid 6-digit PIN code is required."),
  landmark: z.string().min(2, "Landmark is required."),
  villageOrCity: z.string().min(2, "City/Village is required."),
  phone: z.string().min(10, "A valid phone number is required.").max(20, "Phone number is too long."),
  email: z.string().email("A valid email address is required.").max(50, "Email address is too long."),
  size: z.string().min(3, "Size is required (e.g., 8x10 inches)."),
  customMessage: z.string().max(1000).optional(),
  mode: z.enum(["quote", "photo"]),
  photoUrl: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.mode === 'quote') {
        if (!data.quote || data.quote.length < 10) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Quote must be at least 10 characters.",
                path: ['quote']
            });
        }
        if (!data.author || data.author.length < 2) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Author name is required.",
                path: ['author']
            });
        }
        if(data.photoOption === 'upload' && !data.photoUrl) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please upload a photo when this option is selected.",
                path: ['photoUrl']
            });
        }
    }
    
    if (data.mode === 'photo' && !data.photoUrl) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please upload a photo for photo-only mode.",
            path: ['photoUrl']
        });
    }
});

type CustomizationFormProps = {
  frame: { id: number; name: string, price: number } | null;
};

export function CustomizationForm({ frame }: CustomizationFormProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      size: "",
      customMessage: "",
      mode: 'quote',
      photoUrl: ""
    },
  });

  const mode = form.watch("mode");
  const photoOption = form.watch("photoOption");

  const handleModeChange = (isPhotoOnly: boolean) => {
    const newMode = isPhotoOnly ? 'photo' : 'quote';
    form.setValue('mode', newMode);
    // Clear validation errors when switching modes
    form.clearErrors(['quote', 'author', 'photoUrl']);
  }
  
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64 = reader.result as string;
        form.setValue('photoUrl', base64, { shouldValidate: true });
        setIsUploading(false);
        toast({ title: 'Upload Successful', description: 'Your photo has been prepared.' });
    };
    reader.onerror = (error) => {
        console.error("File reading error:", error);
        setIsUploading(false);
        toast({ title: 'Upload Error', description: 'Failed to read the photo. Please try again.', variant: 'destructive' });
    };
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!frame) {
        toast({
            title: "Error",
            description: "No frame selected.",
            variant: "destructive"
        })
        return;
    }
    
    setIsSubmitting(true);

    const orderData = {
        frameId: frame.id,
        frameName: frame.name,
        framePrice: frame.price,
        ...values,
    };

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
              title: "Demo Booked!",
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
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Select Mode</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center space-x-2">
                    <BookImage className="text-muted-foreground" />
                    <FormField
                      control={form.control}
                      name="mode"
                      render={({ field }) => (
                        <Switch
                          id="mode-switch"
                          checked={field.value === 'photo'}
                          onCheckedChange={(checked) => handleModeChange(checked)}
                        />
                      )}
                    />
                    <ImagePlay className="text-muted-foreground" />
                </div>
                <Label htmlFor="mode-switch" className="mt-2 text-center block text-sm text-muted-foreground">
                    {mode === 'quote' ? 'Frame with Quote' : 'Frame with Photo Only'}
                </Label>
            </CardContent>
        </Card>
        
        {mode === 'quote' ? (
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
                    <Textarea placeholder="E.g., 'The only way to do great work is to love what you do.'" {...field} rows={4} maxLength={500}/>
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
                    <Input placeholder="E.g., Steve Jobs" {...field} maxLength={100} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        ) : null}
        
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><ImageIcon className="w-5 h-5" />
          {mode === 'quote' ? 'Author Photo' : 'Your Photo'}
          </CardTitle></CardHeader>
          <CardContent>
            {mode === 'quote' ? (
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
            ) : null}

            {(mode === 'photo' || photoOption === 'upload') && (
                 <div className="mt-4 space-y-2">
                    <Label htmlFor="photo-upload">Upload your image</Label>
                    <FormControl>
                        <Input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} disabled={isUploading}/>
                    </FormControl>
                    {isUploading && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin"/> Uploading...</div>}
                    <FormField
                      control={form.control}
                      name="photoUrl"
                      render={({ field }) => (
                        <>
                          {field.value && !isUploading && (
                              <Alert variant="default" className="mt-2">
                                  <Check className="h-4 w-4" />
                                  <AlertTitle>Upload Complete</AlertTitle>
                                  <AlertDescription>
                                      Image is ready to be submitted with your order.
                                  </AlertDescription>
                              </Alert>
                          )}
                          <FormMessage />
                        </>
                      )}
                    />
                 </div>
            )}
             {mode === 'quote' && photoOption === 'suggest' && (
                <Alert className="mt-4" variant="default">
                    <ImageIcon className="h-4 w-4" />
                    <AlertTitle>Photo Suggestion</AlertTitle>
                    <AlertDescription>We will find a suitable image for your quote and include it in the demo we send you for approval.</AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle className="font-headline flex items-center gap-2"><Ruler/>Frame Size</CardTitle></CardHeader>
            <CardContent>
                <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Required Size</FormLabel>
                        <FormControl>
                            <Input placeholder="E.g., 12x16 inches, A4, 30x40 cm" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline">Shipping Address</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="district" render={({ field }) => (<FormItem><FormLabel>District</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="pinCode" render={({ field }) => (<FormItem><FormLabel>PIN Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="villageOrCity" render={({ field }) => (<FormItem><FormLabel>Village/City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="landmark" render={({ field }) => (<FormItem><FormLabel>Landmark</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline">Contact Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} maxLength={20} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} maxLength={50} /></FormControl><FormMessage /></FormItem>)} />
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="font-headline flex items-center gap-2"><MessageSquare/>Custom Message (Optional)</CardTitle></CardHeader>
            <CardContent>
                 <FormField
                    control={form.control}
                    name="customMessage"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Any special instructions?</FormLabel>
                        <FormControl>
                            <Textarea placeholder="E.g., use a specific font, add a small logo, etc." {...field} maxLength={1000} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={isSubmitting || isUploading}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Book a Demo'}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">After submitting, we'll contact you with a demo of your custom frame for your approval.</p>
      </form>
    </Form>
  );
}
