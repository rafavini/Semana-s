import db from "@/app/api/database";

export async function GET(){
    try {
        const [rows] = await db.query<any>("SELECT * FROM usuarios");
        if(rows.length > 0){
            return new Response(JSON.stringify(rows))
        }else{
            return new Response(JSON.stringify({erro: "usuarios nao encontrado"}))
        }
    } catch (error) {
        return new Response(JSON.stringify({erro: error}))
    }
}

export async function POST(request: Request){
    const {nome, email} = await request.json();

    try {
        const [resultado] = await db.query<any>("INSERT INTO usuarios (nome,email) VALUES (?,?)",[nome,email])    
        return Response.json({id: resultado.insertId,nome,email})
    } catch (error) {
        
    }
}

export async function PUT(request:Request){
    const {id,nome,email} = await request.json();

    await db.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [nome,email,id])
    return Response.json({sucesso: true})
}

export async function DELETE(request:Request){
    const {id} = await request.json();

    await db.query("DELETE FROM usuarios WHERE id = ?", [id])
    return Response.json({sucesso: true})
    

}


