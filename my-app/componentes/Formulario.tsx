"use client"

import { deleteUser, saveUser } from "@/app/(servicos)/usuario"
import { usuarioProps } from "@/app/tipos"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Formulario({id, nome= "", email = ""}: usuarioProps){

    const [usuarioId, setUsuarioId] = useState(id)
    const [usuarioNome, setUsuarioNome] = useState(nome)
    const [usuarioEmail, setUsuarioEmail] = useState(email)
    const rota = useRouter();

    async function Submit(evento: React.FormEvent<HTMLFormElement>){
        evento.preventDefault()
        const form = {
            id: usuarioId,
            nome: usuarioNome,
            email: usuarioEmail
        }

        try {
            const metodo = usuarioId ? "PUT" : "POST"
            await saveUser(form,metodo)
            rota.push("/")

        } catch (error) {
            
        }
    }

    async function Deletar(){
        if(usuarioId){
            await deleteUser(usuarioId)
            rota.push("/")
        }

    }
    return(
        <div>
            <form onSubmit={Submit}>
                <input value={usuarioNome} onChange={(e) => setUsuarioNome(e.target.value)} type="text" placeholder="Digite o seu nome de Guerreiro" name="nome" />
                <input value={usuarioEmail} onChange={(e) => setUsuarioEmail(e.target.value)} type="email" placeholder="Digite o seu email de Paladino" name="email" />
                <button type="submit">Enviar</button>
                {usuarioId && <button onClick={Deletar}>Excluir</button>}
            </form>
        </div>
    )
}