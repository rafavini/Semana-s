// app/api/eventos/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    // const [eventos] = await db.query('SELECT * FROM eventos');
    return NextResponse.json({"teste": "adawd"});
}
