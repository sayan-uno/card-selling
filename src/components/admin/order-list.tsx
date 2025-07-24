
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, Check, X, ArrowUpDown, Loader2, Download, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';
import { Badge } from '../ui/badge';

interface Order {
  _id: string;
  frameId: number;
  frameName: string;
  framePrice: number;
  quote?: string;
  author?: string;
  country: string;
  state: string;
  district: string;
  pinCode: string;
  landmark?: string;
  villageOrCity: string;
  phone: string;
  email: string;
  createdAt: string;
  photoOption: string;
  size?: string;
  customMessage?: string;
  mode: 'quote' | 'photo';
  photoUrl?: string;
}

const frames = [
  { id: 1, name: "Classic Oak", imageUrl: "/img/images1.png" },
  { id: 2, name: "Modern Black", imageUrl: "/img/images2.png" },
  { id: 3, name: "Vintage Gold", imageUrl: "/img/images3.png" },
  { id: 4, name: "Minimalist White", imageUrl: "/img/images4.jpg" },
  { id: 5, name: "Rustic Pine", imageUrl: "/img/images5.jpg" },
  { id: 6, name: "Sleek Silver", imageUrl: "/img/images6.png" },
  { id: 7, name: "Deep Walnut", imageUrl: "/img/images7.png" },
  { id: 8, name: "Shadow Box", imageUrl: "/img/images8.png" },
  { id: 9, name: "Ornate Silver", imageUrl: "/img/images9.jpg" },
  { id: 10, name: "Gallery White", imageUrl: "/img/images10.jpg" },
  { id: 11, name: "Barnwood Style", imageUrl: "/img/images11.png" },
  { id: 12, name: "Polished Chrome", imageUrl: "/img/images12.png" },
];

const getFrameById = (id: number) => frames.find(f => f.id === id);

export default function OrderList({ status }: { status: 'pending' | 'solved' | 'denied' }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders?status=${status}&page=1&limit=5&sort=${sortOrder}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders);
      setTotal(data.total);
      setPage(1);
    } catch (error) {
      toast({
        title: "Error Fetching Orders",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [status, sortOrder, toast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  const handleLoadMore = async () => {
    const newPage = page + 1;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders?status=${status}&page=${newPage}&limit=5&sort=${sortOrder}`);
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch more orders');
      }
      const data = await response.json();
      setOrders(prev => [...prev, ...data.orders]);
      setPage(newPage);

    } catch(error) {
       toast({
        title: "Error Loading More",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
        setIsLoading(false);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };
  
  const hasMore = orders.length < total;

  const handleUpdateStatus = async (id: string, newStatus: 'solved' | 'denied' | 'pending') => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error(`Failed to move order to ${newStatus}`);
      
      setOrders(prev => prev.filter(order => order._id !== id));
      setTotal(prev => prev -1);
      toast({
        title: "Success",
        description: `Order moved to ${newStatus}.`
      });

    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };
  
  const selectedFrameImage = selectedOrder ? getFrameById(selectedOrder.frameId)?.imageUrl : null;

  return (
    <div>
       <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={toggleSortOrder}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
        </Button>
      </div>

      {isLoading && orders.length === 0 ? (
        <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : orders.length === 0 ? (
        <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
                No {status} orders found.
            </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order._id}>
              <CardHeader>
                <CardTitle className="text-xl font-headline flex justify-between items-center">
                    <span>Order for {order.frameName}</span>
                     <div className='flex items-center gap-2'>
                        <Badge variant={order.mode === 'quote' ? 'default' : 'secondary'}>{order.mode === 'quote' ? "Quote" : "Photo Only"}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => handleViewDetails(order)}>
                            <Eye className="h-5 w-5" />
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Ordered on: {new Date(order.createdAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {order.mode === 'quote' ? (
                    <>
                        <p><strong>Quote:</strong> {order.quote}</p>
                        <p><strong>Author:</strong> {order.author}</p>
                    </>
                ) : (
                    <p><strong>Order Type:</strong> Photo Only</p>
                )}
                <p><strong>Contact:</strong> {order.email} / {order.phone}</p>
              </CardContent>
              {status === 'pending' && (
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(order._id, 'denied')}><X className="mr-2 h-4 w-4"/> Deny</Button>
                    <Button size="sm" onClick={() => handleUpdateStatus(order._id, 'solved')}><Check className="mr-2 h-4 w-4"/> Solve</Button>
                </CardFooter>
              )}
               {status !== 'pending' && (
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(order._id, 'pending')}>Move to Pending</Button>
                </CardFooter>
               )}
            </Card>
          ))}
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="mt-6 text-center">
            <Button onClick={handleLoadMore}>
                {'Load More'}
            </Button>
        </div>
      )}
       {isLoading && orders.length > 0 && <div className="flex justify-center mt-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/></div> }


      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-primary">Order Details</DialogTitle>
                    <DialogDescription>
                        Complete information for this order.
                    </DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                    <div className="mt-4 space-y-4 text-sm">
                        {selectedFrameImage && (
                            <div className="relative w-full aspect-square rounded-md overflow-hidden">
                                <Image src={selectedFrameImage} alt={selectedOrder.frameName} fill className="object-cover"/>
                            </div>
                        )}
                        <Card>
                            <CardHeader><CardTitle className='text-lg flex items-center justify-between'>
                                Frame Details <Badge variant="secondary">Mode: {selectedOrder.mode}</Badge>
                                </CardTitle></CardHeader>
                            <CardContent className="space-y-1">
                                <p><strong>Frame:</strong> {selectedOrder.frameName} (ID: {selectedOrder.frameId})</p>
                                <p><strong>Price:</strong> ₹{selectedOrder.framePrice} (minimum)</p>
                                {selectedOrder.size && <p><strong>Requested Size:</strong> {selectedOrder.size}</p>}

                                {selectedOrder.mode === 'quote' && (
                                    <>
                                        {selectedOrder.quote && <p><strong>Quote:</strong> "{selectedOrder.quote}"</p>}
                                        {selectedOrder.author && <p><strong>Author:</strong> {selectedOrder.author}</p>}
                                        <p><strong>Photo Option:</strong> {selectedOrder.photoOption}</p>
                                    </>
                                )}

                                {selectedOrder.photoUrl && (
                                    <div className='pt-2'>
                                        <p><strong>Uploaded Photo:</strong></p>
                                        <div className='relative aspect-video w-full rounded-md overflow-hidden my-2 bg-muted'>
                                            <Image src={selectedOrder.photoUrl} alt="User upload" fill className='object-contain' />
                                        </div>
                                        <Button asChild size="sm">
                                            <a href={selectedOrder.photoUrl} download={`order-${selectedOrder._id}.png`} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4"/> Download Photo
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {selectedOrder.customMessage && (
                            <Card>
                                <CardHeader><CardTitle className='text-lg flex items-center gap-2'><MessageSquare /> Custom Message</CardTitle></CardHeader>
                                <CardContent>
                                    <p>{selectedOrder.customMessage}</p>
                                </CardContent>
                            </Card>
                        )}
                        
                        <Card>
                            <CardHeader><CardTitle className='text-lg'>Shipping Address</CardTitle></CardHeader>
                            <CardContent className="space-y-1">
                                <p><strong>Address:</strong> {selectedOrder.villageOrCity}, {selectedOrder.landmark}</p>

                                <p><strong>District:</strong> {selectedOrder.district}</p>
                                <p><strong>State:</strong> {selectedOrder.state}, {selectedOrder.country}</p>
                                <p><strong>PIN Code:</strong> {selectedOrder.pinCode}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className='text-lg'>Contact Information</CardTitle></CardHeader>
                            <CardContent className="space-y-1">
                                <p><strong>Email:</strong> {selectedOrder.email}</p>
                                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
