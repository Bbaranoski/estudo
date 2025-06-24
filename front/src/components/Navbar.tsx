'use client'
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [pathname])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <nav className="
      sticky top-0 z-10

      bg-gradient-to-r from-blue-500 to-purple-600
      shadow-lg border-b border-white/20

      backdrop-blur-sm bg-white/10

      transition-shadow duration-300 ease-in-out
      h-20 p-6

      flex justify-between items-center
    ">
      <h1 className="text-xl font-bold text-[clamp(1rem,1.5vw,2rem)]">
        ToDo
      </h1>
      <div className="gap-4 flex">
        {token &&(
          <a className="text-xl font-bold text-[clamp(15px,1vw,1.5rem)]"
          onClick={logout}
          href="/" 
          >Sair</a>
        )}
      </div>
    </nav>
  );
}