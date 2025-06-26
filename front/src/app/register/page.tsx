"use client";
import { useState } from "react";
import api from "@/services/api"
import { useRouter } from "next/navigation";

interface User {
    name: string,
    email: string,
    password: string
}

export default function Register () {

    const [user, setUser] = useState<User>({name: "", email: "", password: ""})
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const register = async (e: React.FormEvent) => {
        e.preventDefault()
        if(user.password != confirm){
            setError("As senhas não coincidem")
            return
        }

        try{
            const response = await api.post("/auth/register", user)
            console.log(response)
            router.push("/")
        } catch(error: any) {
            setError(error.response?.data?.message || 'Erro de conexão ou servidor indisponível')
        }
    }
    return (
        <div className="h-full w-full text-black flex items-center justify-center">
            <div className="flex justify-between bg-white h-[60vh] w-[60vw] min-w-[450px] rounded-lg p-8 shadow-lg">
                <div className="flex flex-col justify-start items-start h-full gap-12">
                    <img className="hover:bg-gray-200 text-white rounded-lg min-w-[15px]"
                    src="/icons/voltar.png" 
                    alt="Voltar" 
                    width={17}
                    onClick={() => {router.push("/")}}/>

                    <img
                    src="/img/muhehehe.jpg" 
                    alt="Cat" 
                    width={300}/>
                </div>   

                <div className="flex flex-col h-full gap-2">
                    <h1 className="self-center font-bold pt-6 text-[clamp(1rem,1.5vw,2rem)]"
                    >Cadastro</h1>

                    <form className="flex flex-col h-full gap-4 justify-center"
                    action="get"
                    onSubmit={register}
                    >
                        <input className="p-2 border rounded w-[20vw] min-w-[200px] shadow-md"
                        required
                        placeholder="Nome" 
                        type="text"
                        value={user?.name || ""}
                        onChange={(e) => {
                            setUser({...user, name: e.target.value})
                        }}
                        />
                        <input className="p-2 border rounded w-[20vw] min-w-[200px] shadow-md"
                        required
                        placeholder="Email" 
                        type="email"
                        value={user?.email || ""}
                        onChange={(e) => {
                            setUser({...user, email: e.target.value})
                        }}
                        />
                        <input className="p-2 border rounded w-[20vw] min-w-[200px] shadow-md"
                        required
                        minLength={6}
                        placeholder="Senha" 
                        type="password"
                        value={user?.password || ""}
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                        />
                        <input className="p-2 border rounded w-[20vw] min-w-[200px] shadow-md"
                        required
                        minLength={6}
                        placeholder="Confirme a Senha" 
                        type="password"
                        value={confirm}
                        onChange={(e) => {
                            setConfirm(e.target.value)
                        }}
                        />
                        <button className="shadow-md bg-green-500 hover:bg-green-600 text-white p-[12px] h-10 rounded-lg min-w-[10px] flex items-center justify-center shadow-lg"
                        >Criar</button>
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}