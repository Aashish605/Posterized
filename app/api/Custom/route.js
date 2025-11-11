import { NextResponse } from 'next/server';
import { connectDB } from "@/Db/ConnectDb";
import Custom from "@/models/Custom.model";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log('custom received', body);
        const { type, size, Quantity, quantity, url } = body || {};
        const qty = Quantity ?? quantity ?? 1;

        // Basic validation
        if (!type || !url) {
            return NextResponse.json({ error: 'Missing required fields: type and url' }, { status: 400 });
        }

        const data = new Custom({
            type,
            size,
            Quantity: qty,
            url,
        });

        await data.save();

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('POST /api/custom error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
