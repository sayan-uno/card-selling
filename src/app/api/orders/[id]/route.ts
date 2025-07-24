
import { NextResponse } from 'next/server';
import mongoose, { Model } from 'mongoose';

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  frameId: { type: Number, required: true },
  frameName: { type: String, required: true },
  framePrice: { type: Number, required: true },
  quote: { type: String, required: true },
  author: { type: String, required: true },
  photoOption: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  pinCode: { type: String, required: true },
  landmark: { type: String },
  villageOrCity: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending, solved, denied
}, { timestamps: true });


// Create a model from the schema
const Order = (mongoose.models.Order as Model<any>) || mongoose.model('Order', orderSchema);

// Connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }
  return mongoose.connect(process.env.MONGODB_URI as string);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const { status } = await request.json();

    if (!['solved', 'denied', 'pending'].includes(status)) {
        return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
