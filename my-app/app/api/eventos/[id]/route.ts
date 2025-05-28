// app/api/eventos/[id]/route.ts
import { db } from '@/lib/db';
import type { Evento } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const [rows] = await db.query('SELECT * FROM eventos WHERE id = ?', [params.id]);
    const evento = (rows as Evento[])[0];

    if (!evento) {
        return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 });
    }

    return NextResponse.json(evento);
}
