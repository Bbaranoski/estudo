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

    const router = useRouter()

    const register = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await api.post("/auth/register", user)
            console.log(response)
            router.push("/")
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div className="h-full w-full text-black flex items-center justify-center">
            <form className="flex flex-col bg-white"
            action="get"
            onSubmit={register}
            >
                <input className="p-2 border rounded"
                required
                placeholder="Nome" 
                type="text"
                value={user?.name || ""}
                onChange={(e) => {
                    setUser({...user, name: e.target.value})
                }}
                />
                <input className="p-2 border rounded"
                required
                placeholder="Email" 
                type="email"
                value={user?.email || ""}
                onChange={(e) => {
                    setUser({...user, email: e.target.value})
                }}
                />
                <input className="p-2 border rounded"
                required
                minLength={6}
                placeholder="Senha" 
                type="password"
                value={user?.password || ""}
                onChange={(e) => {
                    setUser({...user, password: e.target.value})
                }}
                />
                <button className="bg-green-500 hover:bg-green-600 text-white p-[12px] h-10 rounded-lg min-w-[10px] flex items-center justify-center shadow-lg"
                >Criar</button>
            </form>
        </div>
    )
}