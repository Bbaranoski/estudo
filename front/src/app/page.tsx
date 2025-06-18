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
    
    const router = useRouter()

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/auth/login", user)
            const token = response.data.access_token
            localStorage.setItem('token', token)
            router.push("/todo")
        } catch (error) {
            console.log("putz", error)
        }
    }
    return (
        <div className="h-full w-full bg-white text-black flex">
            <div>
                <a href="/register">teste</a>
            </div>
            <form className="flex flex-col"
            onSubmit={login}
            action="get"
            >
                <input className="p-2 border rounded"
                type="email"
                placeholder="Email"
                value={user?.email || ""} 
                onChange={(e) => {
                    setUser({...user, email: e.target.value})
                }}
                />
                <input className="p-2 border rounded"
                type="password"
                placeholder="Senha"
                value={user?.password || ""}
                onChange={(e) => {
                    setUser({...user, password: e.target.value})
                }}
                />
                <button className="bg-green-500 hover:bg-green-600 text-white p-[12px] h-10 rounded-lg min-w-[10px] flex items-center justify-center shadow-lg"
                >Entrar</button>
            </form>
        </div>
    )
}