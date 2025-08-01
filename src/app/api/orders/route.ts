
import { NextResponse, NextRequest } from 'next/server';
import mongoose, { Model } from 'mongoose';

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  frameId: { type: Number, required: true },
  frameName: { type: String, required: true },
  framePrice: { type: Number, required: true },
  quote: { type: String, maxLength: 500 },
  author: { type: String, maxLength: 100 },
  photoOption: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  pinCode: { type: String, required: true },
  landmark: { type: String },
  villageOrCity: { type: String, required: true },
  phone: { type: String, required: true, maxLength: 20 },
  email: { type: String, required: true, maxLength: 50 },
  status: { type: String, default: 'pending' }, // pending, solved, denied
  size: { type: String },
  customMessage: { type: String, maxLength: 1000 },
  mode: { type: String, required: true }, // 'quote' or 'photo'
  photoUrl: { type: String } // For uploaded photos (Base64)
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

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const newOrder = new Order({
      ...body,
      status: 'pending'
    });
    
    await newOrder.save();

    return NextResponse.json({ message: 'Order created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const { searchParams } = request.nextUrl;
        
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '5', 10);
        const sort = searchParams.get('sort') || 'desc';

        const skip = (page - 1) * limit;
        const sortOrder = sort === 'asc' ? 1 : -1;
        
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
