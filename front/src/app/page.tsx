"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";

interface Todo {
  id: number
  titulo: string
  descricao: string
  data: string
}
interface Edita {
  index: number
  alterar: boolean
}

export default function Home() {

  const [todo, setTodo] = useState<Todo>({id: 0, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
  const [lista, setLista] = useState<Todo[]>([])
  const [aberto, setAberto] = useState<boolean>(false)
  const [edita, setEdita] = useState<Edita>({index: 0, alterar: false})
  const [windwoWidth, setWindwoWidth] = useState(0)
  const [filtro, setFiltro] = useState<boolean>(true)

  // função que pega o objeto da array para ser editado
  function editaTodo(index: number){
    const alteraObj: Todo = lista[index]
    setTodo({id: alteraObj.id, titulo: alteraObj.titulo, descricao: alteraObj.descricao, data: alteraObj.data})
    setEdita({index: index, alterar: true})
    setAberto(true)
  }

  // cria variavel do tamanho da tela para utilizar em breakpoints
  useEffect(() => {
    setWindwoWidth(window.innerWidth)
    const handleResize = () => setWindwoWidth(window.innerWidth)
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
    try {
      const response = await api.post("/todos", todo)
      fetchTodo()
    } catch (error) {
      console.error("deu ruim cria", error)
    }
  }

  // faz o get do back-end
  const fetchTodo = async () => {
    console.log(filtro)
    try {
      const response = await api.get(`/todos?ordem=${filtro ? "asc" : "desc"}`)
      setLista(response.data)
      setTodo({id: 0, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
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
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex gap-2 w-full justify-between p-3">
        <button className="hover:bg-gray-300 text-black p-4 rounded-lg font-bold" 
          onClick={() => {
            setFiltro(!filtro) 
            fetchTodo()
          }}
        >ID
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg" 
          onClick={() => {setAberto(true)}}
        >Adicionar+</button>
      </div>

      <div className={`grid w-full gap-3 p-3 
        grid-rows-[repeat(auto-fit,minmax(200px,35vh))]
        ${
          windwoWidth <= 425
          ? "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]" 
          : windwoWidth <= 864
            ? lista.length <= 2
              ? "grid-cols-[repeat(auto-fit,minmax(200px,18vw))]"
              : "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
            : lista.length <= 4
              ? "grid-cols-[repeat(auto-fit,minmax(200px,18vw))]" 
              : "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"}
      `}>

        {lista.map((e, index) => (
          <div key={index} className="bg-white flex flex-col items-start justify-start rounded-md min-h-[200px] shadow-lg">
            <div className="flex justify-end w-full">

              <button className="hover:bg-gray-100 text-white p-[8px] rounded-lg min-w-[10px] flex items-center justify-center"
                  onClick={() => {handleDelete(e.id)}}
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
                width={17}/></button>
              </div>

            <div/>

            <div className="flex flex-col gap-3 w-full pl-6 pr-6">
              <h2 className="text-black font-bold text-[clamp(1rem,1.5vw,2rem)]"
              >{e.titulo}</h2>

              <div className="flex justify-start w-full">
                
                <p className="flex text-neutral-500 items-center justify-center text-xl text-[clamp(0.75rem,1.1vw,1.5rem)]"
                >{new Date(e.data).toLocaleDateString('pt-BR')}</p>

              </div>

              <p className="text-black whitespace-pre-wrap break-words text-[clamp(0.75rem,1vw,1.5rem)] h-full"
              >{e.descricao}</p>
            </div>
            
          </div>
        ))}

        {aberto && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <form className="bg-blue-500 p-6 rounded-lg shadow-lg w-96"
            onSubmit={
              submit
            }
            >
              <input className="p-2 border rounded mb-2 w-full"
                type="text"
                placeholder="Título"
                value={todo.titulo}
                maxLength={11}
                onChange={(e) => {
                  const temp = e.target.value.toUpperCase().replace(/\n/g, "")
                  setTodo({...todo, titulo: temp})
                }}
                required
              />
              <textarea className="p-2 border rounded mb-2 w-full min-h-[6rem] resize-none"
                placeholder="Descrição"
                value={todo.descricao}
                maxLength={83}
                onChange={(e) => {
                  const temp = e.target.value.replace(/\n/g,"")
                  const temp2 = temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase()
                  setTodo({...todo, descricao: temp2}) 
                }}
                required
              />

              <div className="flex gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white p-[8px] rounded-md min-w-[50px] flex items-center justify-center"
                  type="button"
                  onClick={() => {
                    setTodo({...todo, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
                    setAberto(false)
                    setEdita({index: 0, alterar: false})
                  }}
                >X</button>

                <input className="p-2 border rounded mb-2 w-full"
                  type="date" 
                  value={todo.data}
                  onChange={(e) => {
                    setTodo({...todo, data: e.target.value})
                  }}
                  required
                />

                <button className="bg-green-500 hover:bg-green-600 text-white p-[8px] rounded-md min-w-[50px] flex items-center justify-center"
                  type="submit"
                >V</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}