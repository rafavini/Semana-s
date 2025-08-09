import Link from "next/link"
import { usuarioProps } from "./tipos"
import { deleteUser } from "./servicos/usuario"



export default async function Index() {
  const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/usuario`)
  const usuarios: usuarioProps[] = await resposta.json()
  console.log(usuarios)
  return (
    <div>
      <Link className="bg-sky-500 text-white p-1 rounded" href={"/cadastro"}>Cadastrar</Link>
      <div>
        {usuarios.map((item) => (
          <div key={item.id}>
            <h1>{item.nome} - {item.email}</h1>
            <Link className="bg-sky-500 text-white p-1 rounded" href={`/editar/${item.id}`}>Editar</Link>
          </div>
        ))}
      </div>
    </div>
  )
}