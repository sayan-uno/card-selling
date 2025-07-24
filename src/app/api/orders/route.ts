
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
  // IMPORTANT: You need to add your MongoDB connection string to your environment variables.
  // Create a .env file in the root of your project and add the following line:
  // MONGODB_URI="your_mongodb_connection_string"
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }
  return mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newOrder = new Order({
      ...body,
      status: 'pending' // Explicitly set status
    });
    await newOrder.save();

    return NextResponse.json({ message: 'Order created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '5', 10);
        const sort = searchParams.get('sort') || 'asc';

        const skip = (page - 1) * limit;
        const sortOrder = sort === 'desc' ? -1 : 1;
        
        const query: { status?: string } = {};
        if (status && ['pending', 'solved', 'denied'].includes(status)) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .sort({ createdAt: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean();
        
        const total = await Order.countDocuments(query);

        return NextResponse.json({ orders, total, page, limit });

    } catch (error) {
        console.error('API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ message: errorMessage, error: true }, { status: 500 });
    }
}
