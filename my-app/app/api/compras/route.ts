// app/api/compras/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { evento_id, nome_cliente, email_cliente } = await req.json();

    await db.query(
        'INSERT INTO compras (evento_id, nome_cliente, email_cliente) VALUES (?, ?, ?)',
        [evento_id, nome_cliente, email_cliente]
    );

    return NextResponse.json({ message: 'Compra realizada com sucesso!' });
}
