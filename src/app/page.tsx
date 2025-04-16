"use client";
import { useState, useEffect } from "react";

export default function Home() {
  interface Todo {
    titulo: string
    descricao: string
    data: string
  }
  interface Edita {
    index: number
    alterar: boolean
  }
  const [todo, setTodo] = useState<Todo>({titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
  const [lista, setLista] = useState<Todo[]>([{titulo: "Teste", descricao: "teste 2", data: new Date().toISOString().split("T")[0]}])
  const [aberto, setAberto] = useState<boolean>(false)
  const [edita, setEdita] = useState<Edita>({index: 0, alterar: false})
  const [erro, setErro] = useState<string>("")

  function addTodo() {
    if (todo.titulo.trim() === "" || todo.descricao.trim() === "") {
      setErro("Preencha todos os campos!")
      return
    }
    setLista([...lista, todo]);
    setTodo({titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
    setAberto(false)
    setErro("")
  }

  function removeTodo(index: number) {
    let listaFiltrada = lista.filter((e, i) => i !== index);
    setLista(listaFiltrada)
  }

  function editaTodo(index: number){
    const alteraObj: Todo = lista[index]
    setTodo({titulo: alteraObj.titulo, descricao: alteraObj.descricao, data: alteraObj.data})
    setEdita({index: index, alterar: true})
    setAberto(true)
  }

  function editar(){
    if (todo.titulo.trim() === "" || todo.descricao.trim() === "") {
      setErro("Preencha todos os campos!")
      return
    }
    let listaAlterada = lista
    listaAlterada[edita.index] = todo
    setLista(listaAlterada)
    setTodo({titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
    setEdita({index: 0, alterar: false})
    setAberto(false)
    setErro("")
  }

  const teste = 1
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex gap-2 w-full justify-end p-3">
      <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg" 
          onClick={() => setAberto(true)}
        >Adicionar+</button>
      </div>

      <div className={`grid w-full gap-3 p-3 
        sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] 
        grid-rows-[repeat(auto-fit,minmax(200px,35vh))] 
        ${
          lista.length <= 4
          ? "lg:grid-cols-[repeat(auto-fit,minmax(200px,18vw))]" 
          : "lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
        }`}
      >

        {lista.map((e, index) => (
          <div key={index} className="bg-white flex flex-col items-start justify-start rounded-md min-h-[200px] shadow-lg">
            <div className="flex justify-end w-full">

              <button className="hover:bg-gray-100 text-white p-[8px] rounded-lg min-w-[10px] flex items-center justify-center"
                  onClick={() => {removeTodo(index)}}
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
              <h2 className="font-bold text-[clamp(1rem,1.5vw,2rem)]"
              >{e.titulo}</h2>

              <div className="flex justify-start w-full">
                
                <p className="flex text-neutral-500 items-center justify-center text-xl text-[clamp(0.75rem,1.1vw,1.5rem)]"
                >{new Date(e.data).toLocaleDateString('pt-BR')}</p>

              </div>

              <p className="whitespace-pre-wrap break-words text-[clamp(0.75rem,1vw,1.5rem)] h-full"
              >{e.descricao}</p>
            </div>
            
          </div>
        ))}

        {aberto && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-blue-500 p-6 rounded-lg shadow-lg w-96">
              <input className="p-2 border rounded mb-2 w-full"
                type="text"
                placeholder="Título"
                value={todo.titulo}
                maxLength={18}
                onChange={(e) => 
                  setTodo({...todo, titulo: e.target.value})
                }
              />
              <textarea className="p-2 border rounded mb-2 w-full min-h-[6rem] resize-none"
                placeholder="Descrição"
                value={todo.descricao}
                maxLength={120}
                onChange={(e) => 
                  setTodo({...todo, descricao: e.target.value}) 
                }
              />

              <div className="flex gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white p-[8px] rounded-md min-w-[50px] flex items-center justify-center"
                  onClick={() => {
                    setTodo({...todo, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
                    setAberto(false)
                    setErro("")
                  }}
                >X</button>

                <input className="p-2 border rounded mb-2 w-full"
                  type="date" 
                  value={todo.data}
                  onChange={(e) => {
                    setTodo({...todo, data: e.target.value})
                  }}
                />

                <button className="bg-green-500 hover:bg-green-600 text-white p-[8px] rounded-md min-w-[50px] flex items-center justify-center"
                  onClick={() => {
                    if(edita.alterar == false) {
                      addTodo()
                    }else if(edita.alterar == true) {
                      editar()
                    }
                  }}
                >V</button>
              </div>
              {erro && <p className="text-red-500 text-sm mb-2 justify-self-center">{erro}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}