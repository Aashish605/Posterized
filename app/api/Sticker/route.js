import { connectDB } from "@/Db/ConnectDb";
import Sticker from '@/models/Sticker.model'
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB(); // Connect to DB
    const Stickers = await Sticker.find(); // Get data from MongoDB
    return new Response(JSON.stringify(Stickers), { status: 200 });
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log('data recieved received', body);
        const { name, type, subtype, url,sizes } = body || {};
        // Basic validation
        if (!type || !url) {
            return NextResponse.json({ error: 'Missing required fields: type and url' }, { status: 400 });
        }
        const data = new Sticker({
            name,
            subtype,
            type,
            url,
            sizes
        });
        await data.save();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('POST /api/Sticker error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}