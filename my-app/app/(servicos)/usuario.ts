export const saveUser = async (data: any, method: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/usuario`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro na requisição');
  };

  export const deleteUser = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/usuario`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error('Erro na exclusão');
  };