"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import '../globals.css'

interface Todo {
  id: number
  idTodo: number
  titulo: string
  descricao: string
  data: string
}
interface Filtro {
  idTodo?: string
  titulo?: string
  descricao?: string
  data?: string
}
interface Edita {
  index: number
  alterar: boolean,
  idTodo?: number
}

export default function Home() {

  const [todo, setTodo] = useState<Todo>({id: 0, idTodo: 0, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
  const [lista, setLista] = useState<Todo[]>([])
  const [aberto, setAberto] = useState<boolean>(false)
  const [modalDelete, setModalDelete] = useState<Edita>({index: 0, alterar: false})
  const [edita, setEdita] = useState<Edita>({index: 0, alterar: false})
  const [windowWidth, setWindowWidth] = useState(0)
  const [filtro, setFiltro] = useState<Filtro>({})
  const [ordem, setOrdem] = useState<boolean>(false)

  // função que pega o objeto da array para ser editado
  function editaTodo(index: number){
    const alteraObj: Todo = lista[index]
    setTodo({id: alteraObj.id, idTodo: alteraObj.idTodo, titulo: alteraObj.titulo, descricao: alteraObj.descricao, data: alteraObj.data})
    setEdita({index: index, alterar: true})
    setAberto(true)
  }

  // cria variavel do tamanho da tela para utilizar em breakpoints
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // submit do form
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if(edita.alterar == false){
      handleSubmit()
      setAberto(false)
    } else {
      handeleUpdate(todo.id, todo)
      setAberto(false)
    }
  }

  // faz o crete para o back-end
  const handleSubmit = async () => {
    console.log(todo)
    try {
      const response = await api.post("/todos", todo)
      fetchTodo()
    } catch (error) {
      console.error("deu ruim cria", error)
    }
  }

  // faz o get do back-end
  const fetchTodo = async () => {
    try {
      const response = await api.get("/todos")
      console.log(response)
      ordemID(response.data)
      setTodo({id: 0, idTodo: 0, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
      setAberto(false)
    } catch (error) {
      console.error("deu ruim", error)
    }
  }

  useEffect(() => {
    fetchTodo()
  },[])

  // faz o delete para o back-end
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`)
      fetchTodo()
    } catch (error) {
      console.error("deu ruim", error)
    }
  }
  
  // faz o patch para o back-end
  const handeleUpdate = async (id: number, data: {titulo?: string, descricao?: string, data?: string}) => {
    try {
      await api.patch(`/todos/${id}`, data)
      setEdita({index: 0, alterar: false})
      fetchTodo()
    } catch (error) {
      console.error("deu ruim", error)
    }
  }

  // função que filtra a lista
  const filtrar = async (e: React.FormEvent) => {
    e.preventDefault()
    try{ 
      const response = await api.post("/todos/filtro", filtro)
      ordemID(response.data)
    } catch (error) {
      console.error("deu ruim", error)
    }
  } 

  // função onde limpa os filtros e faz um get
  function limpa(){
    setFiltro({})
    fetchTodo()
  }

  // função ordena
  function ordemID(data: Array<Todo>) {
    let temp = ordem == false 
    ? [...data].sort((a, b) => a.idTodo - b.idTodo)
    : [...data].sort((a, b) => b.idTodo - a.idTodo)
    setLista(temp)
  } 

  useEffect(() => {
    ordemID(lista)
  },[ordem])

  return (
    <div className="flex flex-col items-center w-full">

      {/* MENU FILTROS */}

      <div className="flex gap-2 w-full p-3 flex-col items-start">

          <form className={"flex w-full"}
            onSubmit={filtrar}
          >
            <div className={`flex gap-2 items-center ${
              windowWidth < 640
              ? "flex-col"
              : "flex-row"
            }`}>
              <div className="flex gap-2 items-center">
                <input className="bg-white border-1 rounded-lg w-12 h-8 pl-1 text-black shadow-lg"
                  type="number"
                  value={filtro?.idTodo || ""}
                  placeholder="ID"
                  maxLength={4}
                  onChange={(e) => {
                    setFiltro({...filtro, idTodo: e.target.value})
                  }}
                />
                <input className={`bg-white border-1 rounded-lg h-8 pl-1 text-black shadow-lg ${
                  windowWidth < 640
                  ? "w-24"
                  : "w-36"
                }`}
                  type="text"
                  value={filtro?.titulo || ""}
                  placeholder="TITULO"
                  maxLength={11}
                  onChange={(e) => {
                    setFiltro({...filtro, titulo: e.target.value.toUpperCase()})
                  }}
                />
              </div>
              <input className="bg-white border-1 rounded-lg w-36 h-8 pl-1 text-black shadow-lg"
                type="date"
                value={filtro?.data || ""}
                onChange={(e) => {
                  setFiltro({...filtro, data: e.target.value})
                }}
              />
            </div>

            {/* BOTOES DA PARTE DE CIMA */}

            <div className={`flex gap-2 justify-between items-center w-full ${
              windowWidth < 460
              ? "flex-col items-end"
              : "flex-row"
            }`}>
              <div className="flex items-center gap-2 pl-2">
                <button className="hover:bg-gray-300 text-white p-[8px] h-8 rounded-lg min-w-[10px] flex items-center justify-center"
                  type="submit"
                ><img
                    src="/icons/lupa.png" 
                    alt="Remover" 
                    width={17}/>
                </button>

                <button className="bg-red-500 hover:bg-red-600 text-white p-[8px] h-8 rounded-lg min-w-[10px] flex items-center justify-center shadow-lg"
                  type="button"
                  onClick={limpa}
                >Limpar</button>
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white p-[12px] h-10 rounded-lg min-w-[10px] flex items-center justify-center shadow-lg" 
                type="button"
                onClick={() => {setAberto(true)}}
              >Adicionar+</button>
            </div>
          </form>
            <button className="hover:bg-gray-300 text-black p-[8px] h-8 rounded-lg min-w-[10px] flex items-center justify-center"
              onClick={() => {
                setOrdem(!ordem)
              }}
            >ID
            <img className="pb-1"
                src={`${
                  ordem
                  ? "/icons/acima.png"
                  : "/icons/abaixo.png"
                }`}
                alt="Seta" 
                width={15}/>
            </button>
      </div>
      
      {/* BREAKPOINTS GRID */}

      <div className={`grid w-full gap-3 p-3 
        grid-rows-[repeat(auto-fit,200px)] h-full
        ${
          windowWidth <= 425
          ? "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]" 
          : windowWidth <= 864
            ? lista.length <= 2
              ? "grid-cols-[repeat(auto-fit,minmax(200px,19vw))]"
              : "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
            : windowWidth <= 1620
              ?  lista.length <= 4
                ? "grid-cols-[repeat(auto-fit,minmax(200px,19vw))]" 
                : "grid-cols-[repeat(auto-fit,minmax(225px,1fr))]"
              : lista.length <= 5
                ? "grid-cols-[repeat(auto-fit,minmax(200px,19vw))] grid-rows-[repeat(auto-fit,275px)]"
                : "grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-[repeat(auto-fit,275px)]" }
      `}>

        {/* LISTA DE TODOS (PRINCIPAL) */}
        
        {lista.map((e, index) => (
          <div key={index} className="bg-white flex flex-col items-start justify-start rounded-md min-h-[200px] shadow-lg">
            <div className="flex justify-between w-full pl-6">
              <p className="pt-2 text-[clamp(0.75rem,1.1vw,1.5rem)] text-black">{e.idTodo}</p>
              <div className="flex">
                <button className="hover:bg-gray-100 text-white p-[8px] rounded-lg min-w-[10px] flex items-center justify-center"
                    onClick={() => setModalDelete({index: e.id, alterar: true, idTodo: e.idTodo})}
                  ><img
                    src="/icons/trash.png" 
                    alt="Remover" 
                    width={17}/>
                </button>

                <button className="hover:bg-gray-100 text-white p-[8px] rounded-lg min-w-[10px] flex items-center justify-center"
                    onClick={() => {editaTodo(index)}}
                  ><img
                  src="/icons/pencil.png" 
                  alt="Remover" 
                  width={17}/>
                </button>
              </div>
            </div>

            <div/>

            <div className="flex flex-col gap-3 w-full pl-6 pr-6">
              <h2 className="text-black font-bold text-[clamp(1rem,1.5vw,2rem)]"
              >{e.titulo}</h2>

              <div className="flex justify-start w-full">
                
                <p className="flex text-neutral-500 items-center justify-center text-xl text-[clamp(0.75rem,1.1vw,1.5rem)]"
                >{new Date(e.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>

              </div>

              <div className="relative">
                <p className="text-black whitespace-pre-wrap break-words text-[clamp(0.75rem,1vw,1.5rem)] max-h-20 overflow-y-auto hide-scrollbar pb-1"
                >{e.descricao}</p>

                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white/80 to transparent"></div>
              </div>
            </div>
            
          </div>
        ))}

        {lista.length < 1 &&(
          <div>
            <div className="bg-white flex flex-col items-start justify-start rounded-md min-h-[200px] shadow-lg pt-8">

              <div className="flex flex-col gap-3 w-full pl-6 pr-6">
                <h2 className="text-black font-bold text-[clamp(1rem,1.5vw,2rem)]"
                >Exemplo</h2>

                <div className="flex justify-start w-full">
                  
                  <p className="flex text-neutral-500 items-center justify-center text-xl text-[clamp(0.75rem,1.1vw,1.5rem)]"
                  >{new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>

                </div>

                <div className="relative h-32">
                  <p className="text-black whitespace-pre-wrap break-words text-[clamp(0.75rem,1vw,1.5rem)] max-h-20 overflow-y-auto hide-scrollbar pb-1"
                  >Você pode criar um ToDo clicando em Adicionar +</p>

                  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white/80 to transparent"></div>
                </div>
              </div>
              
            </div>
          </div>
        )}

        {/* MODAL DE ADICIONAR */}

        {aberto && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center text-black">
            <form className="flex flex-col justify-around gap-4 bg-white p-6 rounded-lg shadow-lg w-[clamp(300px,40vw,60vw)] h-[clamp(500px,40vh,75vh)]"
            onSubmit={submit}
            >
              <h1 className="self-center text-[clamp(15px,1.5vw,1.5rem)] font-bold"
              >{edita.alterar ? "Editar" : "Criar"} ToDo</h1>
              <div className={`flex justify-between gap-4 ${
                windowWidth >= 900 ? "flex-row" : "flex-col" 
              }`}>
                <div>
                  <h2 className="text-[clamp(12px,1.25vw,1.25rem)]"
                  >Título</h2>
                  <input className={`p-2 border rounded text-[clamp(12px,1.25vw,1.25rem)] ${
                    windowWidth >= 900 ? "w-[15vw]" 
                    : "w-full"
                    }`}
                    type="text"
                    placeholder=""
                    value={todo.titulo}
                    maxLength={11}
                    onChange={(e) => {
                      setTodo({...todo, titulo: e.target.value})
                    }}
                    required
                  />
                </div>
    
                <div>
                  <h2 className="text-[clamp(12px,1.25vw,1.25rem)]"
                  >Data</h2>
                  <input className={`p-2 border rounded text-[clamp(12px,1.25vw,1.25rem)] ${
                    windowWidth >= 900 ? "w-[15vw]" 
                    : "w-full"
                    }`}
                    type="date" 
                    value={todo.data}
                    onChange={(e) => {
                      setTodo({...todo, data: e.target.value})
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="text-[clamp(12px,1.25vw,1.25rem)]"
                >Descrição</h2>
                <textarea className="p-2 border rounded w-full min-h-[9rem] resize-none text-[clamp(12px,1.25vw,1.25rem)]"
                  placeholder=""
                  value={todo.descricao}
                  onChange={(e) => {            
                    setTodo({...todo, descricao: e.target.value}) 
                  }}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button className="bg-green-500 hover:bg-green-600 text-white p-[1rem] rounded-md min-w-[40px] h-11 flex items-center justify-center shadow-lg"
                  type="submit"
                >CONFIRMAR</button>

                <button className="bg-red-500 hover:bg-red-600 text-white p-[1rem] rounded-md min-w-[40px] h-11 flex items-center justify-center shadow-lg"
                  type="button"
                  onClick={() => {
                    setTodo({...todo, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
                    setAberto(false)
                    setEdita({index: 0, alterar: false})
                  }}
                >CANCELAR</button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL DE EXCLUIR */}

        {modalDelete.alterar && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-48 flex flex-col justify-around">
              <h2 className="text-black font-bold text-[clamp(1rem,1.5vw,2rem)]">Tem certeza que deseja excluir? ({modalDelete.idTodo})</h2>
              <div className="flex justify-between">
                <button className="bg-red-500 hover:bg-red-600 text-white p-[10px] rounded-md min-w-[50px] flex items-center justify-center shadow-lg"
                onClick={() => {
                    setModalDelete({index: 0, alterar: false})
                  }}
                >
                  NÃO
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white p-[10px] rounded-md min-w-[50px] flex items-center justify-center shadow-lg"
                onClick={() => {
                  handleDelete(modalDelete.index)
                  setModalDelete({index: 0, alterar: false})
                }}
                >
                  SIM
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>    
  );
}