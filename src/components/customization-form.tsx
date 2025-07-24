
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
import { Quote, Upload, Image as ImageIcon, Ruler, MessageSquare, BookImage, ImagePlay, Loader2 } from "lucide-react";
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
  landmark: z.string().optional(),
  villageOrCity: z.string().min(2, "City/Village is required."),
  phone: z.string().min(10, "A valid phone number is required.").max(20, "Phone number is too long."),
  email: z.string().email("A valid email address is required.").max(50, "Email address is too long."),
  size: z.string().min(3, "Size is required (e.g., 8x10 inches)."),
  customMessage: z.string().optional(),
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
  const [mode, setMode] = useState<'quote' | 'photo'>('quote');

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

  const photoOption = form.watch("photoOption");

  const handleModeChange = (isPhotoOnly: boolean) => {
    const newMode = isPhotoOnly ? 'photo' : 'quote';
    setMode(newMode);
    form.setValue('mode', newMode);
    // Clear validation errors when switching modes
    form.clearErrors(['quote', 'author', 'photoUrl']);
  }
  
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'sayan_quotes'); // Replace with your upload preset

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/djcalld2i/image/upload`, { // Replace with your cloud name
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            form.setValue('photoUrl', data.secure_url);
            toast({ title: 'Upload Successful', description: 'Your photo has been uploaded.' });
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        toast({ title: 'Upload Error', description: 'Failed to upload photo. Please try again.', variant: 'destructive' });
    } finally {
        setIsUploading(false);
    }
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
                    <Switch
                        id="mode-switch"
                        checked={mode === 'photo'}
                        onCheckedChange={handleModeChange}
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
                    <Input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} disabled={isUploading}/>
                    {isUploading && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin"/> Uploading...</div>}
                    {form.getValues('photoUrl') && !isUploading && (
                        <Alert variant="default" className="mt-2">
                            <Check className="h-4 w-4" />
                            <AlertTitle>Upload Complete</AlertTitle>
                             <AlertDescription>
                                <a href={form.getValues('photoUrl')} target="_blank" rel="noopener noreferrer" className="underline">View Uploaded Image</a>
                            </AlertDescription>
                        </Alert>
                    )}
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
            <FormField name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} maxLength={20} /></FormControl><FormMessage /></FormItem>)} />
            <FormField name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} maxLength={50} /></FormControl><FormMessage /></FormItem>)} />
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
                            <Textarea placeholder="E.g., use a specific font, add a small logo, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={form.formState.isSubmitting || isUploading}>
            {form.formState.isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Book a Demo'}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">After submitting, we'll contact you with a demo of your custom frame for your approval.</p>
      </form>
    </Form>
  );
}
