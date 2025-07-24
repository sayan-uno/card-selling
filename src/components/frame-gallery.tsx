
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CustomizationForm } from "./customization-form";
import { ScrollArea } from "./ui/scroll-area";
import { Eye } from "lucide-react";

const frames = [
  { id: 1, name: "Modern Black Frame", imageUrl: "/img/images1.png", hint: "wood frame", price: 250 },
  { id: 2, name: "Classic Gold Leaf", imageUrl: "/img/images2.png", hint: "modern frame", price: 350 },
  { id: 3, name: "Ornate Vintage Gold", imageUrl: "/img/images3.png", hint: "ornate frame", price: 550 },
  { id: 4, name: "Minimalist Matte Black", imageUrl: "/img/images4.png", hint: "white frame", price: 200 },
  { id: 5, name: "Natural Barnwood", imageUrl: "/img/images5.png", hint: "rustic frame", price: 400 },
  { id: 6, name: "Polished Silver Metal", imageUrl: "/img/images6.png", hint: "metal frame", price: 450 },
  { id: 7, name: "Rich Walnut Finish", imageUrl: "/img/images7.png", hint: "dark wood frame", price: 380 },
  { id: 8, name: "Deep Shadow Box", imageUrl: "/img/images8.png", hint: "deep frame", price: 600 },
  { id: 9, name: "Elegant Ornate Silver", imageUrl: "/img/images9.png", hint: "decorative frame", price: 580 },
  { id: 10, name: "Modern Gallery White", imageUrl: "/img/images10.png", hint: "gallery frame", price: 320 },
  { id: 11, name: "Rustic Reclaimed Wood", imageUrl: "/img/images11.png", hint: "reclaimed wood", price: 350 },
  { id: 12, name: "Sleek Polished Chrome", imageUrl: "/img/images12.png", hint: "chrome frame", price: 550 },
];

export function FrameGallery() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<(typeof frames)[0] | null>(null);
  const [isImageViewerOpen, setImageViewerOpen] = useState(false);
  const [viewingImage, setViewingImage] = useState<{src: string, alt: string} | null>(null);

  const handleChooseClick = (frame: (typeof frames)[0]) => {
    setSelectedFrame(frame);
    setDialogOpen(true);
  };

  const handleImageClick = (frame: (typeof frames)[0]) => {
    setViewingImage({src: frame.imageUrl, alt: frame.name});
    setImageViewerOpen(true);
  };


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {frames.map((frame) => (
          <Card key={frame.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">{frame.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div 
                className="relative aspect-square w-full mb-4 cursor-pointer group"
                onClick={() => handleImageClick(frame)}
              >
                 <Image
                    src={frame.imageUrl}
                    alt={frame.name}
                    fill
                    className="object-cover rounded-md"
                    data-ai-hint={frame.hint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
               <div className="flex justify-between items-center mt-auto">
                <div>
                  <p className="text-xl font-bold text-primary"><span style={{ fontFamily: "'Segoe UI', 'Arial', sans-serif" }}>from ₹{frame.price}</span></p>
                  <p className="text-xs text-muted-foreground">Price varies with size</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-transform duration-200" onClick={() => handleChooseClick(frame)}>
                Choose
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
            <ScrollArea className="max-h-[90vh]">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="font-headline text-2xl text-primary">Customize Your '{selectedFrame?.name}' Frame</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create your personalized quote frame.
                  </DialogDescription>
                </DialogHeader>
                <CustomizationForm frame={selectedFrame} />
              </div>
            </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isImageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="max-w-3xl h-[80vh] p-2 flex flex-col">
            <DialogHeader className="sr-only">
              <DialogTitle>Image Viewer: {viewingImage?.alt}</DialogTitle>
              <DialogDescription>A larger view of the selected frame.</DialogDescription>
            </DialogHeader>
            {viewingImage && (
                <div className="relative w-full h-full flex-grow">
                    <Image 
                        src={viewingImage.src} 
                        alt={viewingImage.alt} 
                        fill
                        className="object-contain" 
                    />
                </div>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
