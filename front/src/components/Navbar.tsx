import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between flex-col content-center items-center">
            <h1 className="text-x1 font-bold text-[clamp(1rem,1.5vw,2rem)]">ToDo</h1>
            <div className="space-x-4 flex gap-4">
                <Link href="/">Início</Link>
                <Link href="/dashboard">Sobre</Link>
            </div>
        </nav>
    )
}