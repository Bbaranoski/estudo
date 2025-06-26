"use client";
import api from "@/services/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    email: string,
    password: string
}

export default function Login() {

    const[user, setUser] = useState<User>({email: "", password: ""})
    const[erro, setErro] = useState("")
    
    const router = useRouter()

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/auth/login", user)
            const token = response.data.access_token
            localStorage.setItem('token', token)
            router.push("/todo")
        } catch (error: any) {
            setErro(error.response?.data?.message || 'Erro de conexão ou servidor indisponível')
        }
    }
    return (
        <div className="h-full w-full text-black flex items-center justify-center">
            <div className="flex justify-between bg-white h-[60vh] w-[60vw] min-w-[450px] rounded-lg p-8 shadow-lg">
                <div className="flex flex-col justify-center items-center h-full">
                    <img
                    src="/img/catTongue.jpg" 
                    alt="Cat" 
                    width={300}/>
                </div>
                <div className="h-full flex flex-col justify-around items-end gap-2">
                    <h1 className="self-center font-bold pt-6 text-[clamp(1rem,1.5vw,2rem)]"
                    >Login</h1>

                    <form className="flex flex-col h-full gap-4 justify-center"
                    onSubmit={login}
                    action="get"
                    >   
                        <input className="p-2 border rounded w-[20vw] min-w-[200px] shadow-md"
                        type="email"
                        placeholder="Email"
                        value={user?.email || ""} 
                        onChange={(e) => {
                            setUser({...user, email: e.target.value})
                        }}
                        />
                        <input className="p-2 border rounded w-[20vw] min-w-[200px] shadow-md"
                        type="password"
                        placeholder="Senha"
                        value={user?.password || ""}
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                        />
                        <button className="shadow-md bg-green-500 hover:bg-green-600 text-white p-[12px] h-10 rounded-lg min-w-[10px] flex items-center justify-center"
                        >Entrar</button>
                        <p className="text-red-500 text-sm">
                            {erro}
                        </p>
                        <div className="flex justify-between">
                            <a className="text-blue-600 visited:text-purple-600"
                            href="/register">Cadastrar</a>
                            <p>Esqueceu a senha?</p>
                        </div>
                    </form>
                    <div className="w-[200px]">
                        <p className="text-[9px]"
                        >Criado por: Breno Baranoski</p>
                        <p className="text-[9px]"
                        >Testado por: Gabriel Alves, Lucas Paim, Riccardo Bortolotto, Erik Saretta, Michael Segalla</p>
                    </div>
                </div>
            </div>
        </div>
    )
}