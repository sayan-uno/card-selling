"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CustomizationForm } from "./customization-form";
import { ScrollArea } from "./ui/scroll-area";

const frames = [
  { id: 1, name: "Classic Oak", imageUrl: "https://placehold.co/400x500", hint: "wood frame" },
  { id: 2, name: "Modern Black", imageUrl: "https://placehold.co/400x500", hint: "modern frame" },
  { id: 3, name: "Vintage Gold", imageUrl: "https://placehold.co/400x500", hint: "ornate frame" },
  { id: 4, name: "Minimalist White", imageUrl: "https://placehold.co/400x500", hint: "white frame" },
  { id: 5, name: "Rustic Pine", imageUrl: "https://placehold.co/400x500", hint: "rustic frame" },
  { id: 6, name: "Sleek Silver", imageUrl: "https://placehold.co/400x500", hint: "metal frame" },
];

export function FrameGallery() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<(typeof frames)[0] | null>(null);

  const handleChooseClick = (frame: (typeof frames)[0]) => {
    setSelectedFrame(frame);
    setDialogOpen(true);
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
              <div className="relative aspect-[4/5] w-full mb-4">
                 <Image
                    src={frame.imageUrl}
                    alt={frame.name}
                    fill
                    className="object-cover rounded-md"
                    data-ai-hint={frame.hint}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleChooseClick(frame)}>
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
    </>
  );
}
