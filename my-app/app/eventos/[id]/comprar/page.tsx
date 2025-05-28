// app/eventos/[id]/comprar/page.tsx
'use client';

import type { Evento } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ComprarPage() {
    const { id } = useParams();
    const router = useRouter();

    // Diga ao TS que evento pode ser Evento ou null
    const [evento, setEvento] = useState<Evento | null>(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetch(`/api/eventos/${id}`)
            .then((res) => res.json())
            .then((data: Evento) => setEvento(data));
    }, [id]);

    const comprar = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch('/api/compras', {
            method: 'POST',
            body: JSON.stringify({
                evento_id: id,
                nome_cliente: nome,
                email_cliente: email
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        router.push('/eventos');
    };

    if (!evento) return <p>Carregando evento...</p>;

    return (
        <form onSubmit={comprar} className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Comprar ingresso: {evento.nome}</h2>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className="border p-2 w-full" required />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Seu email" className="border p-2 w-full" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Confirmar Compra</button>
        </form>
    );
}
