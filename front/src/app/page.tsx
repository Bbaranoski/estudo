export default function Login() {
    return (
        <div className="h-full w-full bg-white text-black flex">
            <div>

            </div>
            <form className="flex flex-col"
            action="get">
                <input className="p-2 border rounded"
                type="email"
                placeholder="Email" />
                <input className="p-2 border rounded"
                type="password"
                placeholder="Senha" />
                <button className="bg-green-500 hover:bg-green-600 text-white p-[12px] h-10 rounded-lg min-w-[10px] flex items-center justify-center shadow-lg"
                >Entrar</button>
            </form>
        </div>
    )
}