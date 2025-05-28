// app/eventos/page.tsx
export default async function EventosPage() {
    const res = await fetch('http://localhost:3000/api/eventos', { cache: 'no-store' });
    const eventos = await res.json();
    console.log(eventos)

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Eventos disponíveis</h2>
            {/* <ul className="space-y-2 mt-4">
                {eventos.map((evento: Evento) => (
                    <li key={evento.id} className="border p-4 rounded">
                        <p><strong>{evento.nome}</strong></p>
                        <p>Data: {new Date(evento.data).toLocaleString()}</p>
                        <p>Preço: R$ {evento.preco}</p>
                        <a href={`/eventos/${evento.id}/comprar`} className="text-blue-600 underline">Comprar</a>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}
