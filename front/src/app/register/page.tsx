"use client";
import { useState } from "react";

interface User {
    name: string,
    email: string,
    password: string
}

export default function register () {

    const [user, setUser] = useState<User>({name: "", email: "", password: ""})

    return (
        <div className="h-full w-full text-black flex items-center justify-center">
            <form className="flex flex-col bg-white"
            action="get"
            >
                <input className="p-2 border rounded"
                placeholder="Nome" 
                type="text"
                value={user?.name || ""}
                onChange={(e) => {
                    setUser({...user, name: e.target.value})
                }}
                />
                <input className="p-2 border rounded"
                placeholder="Email" 
                type="email"
                value={user?.email || ""}
                onChange={(e) => {
                    setUser({...user, email: e.target.value})
                }}
                />
                <input className="p-2 border rounded"
                placeholder="Senha" 
                type="password"
                value={user?.password || ""}
                onChange={(e) => {
                    setUser({...user, password: e.target.value})
                }}
                />
            </form>
        </div>
    )
}