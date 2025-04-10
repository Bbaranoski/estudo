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
  return (
    <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-[repeat(auto-fit,minmax(200px,40vh))] w-full gap-3 p-3">

      {lista.map((e, index) => (
        <div key={index} className="bg-blue-200 flex flex-col items-center justify-between p-4 rounded-md min-h-[200px]">
          <h2 className="font-bold"
          >{e.titulo}</h2>
          <p className="whitespace-pre-wrap break-words"
          >{e.descricao}</p>

          <div className="flex justify-between w-full">
            <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-md min-w-[50px] flex items-center justify-center"
              onClick={() => {removeTodo(index)}}
            ><img
              src="/icons/trash.png" 
              alt="Remover" 
              width={20}/></button>

            <p className="flex items-center justify-center text-xl"
            >{new Date(e.data).toLocaleDateString('pt-BR')}</p>

            <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded min-w-[50px] flex items-center justify-center"
              onClick={() => {editaTodo(index)}}
            ><img
            src="/icons/pencil.png" 
            alt="Remover" 
            width={20}/></button>
          </div>
          
        </div>
      ))}

      <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg" 
        onClick={() => setAberto(true)}
      >+</button>

      {aberto && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-blue-500 p-6 rounded-lg shadow-lg w-96">
            <input className="p-2 border rounded mb-2 w-full"
              type="text"
              placeholder="Título"
              value={todo.titulo}
              maxLength={20}
              onChange={(e) => 
                setTodo({...todo, titulo: e.target.value})
              }
            />
            <textarea className="p-2 border rounded mb-2 w-full min-h-[6rem] resize-none"
              placeholder="Descrição"
              value={todo.descricao}
              maxLength={150}
              onChange={(e) => 
                setTodo({...todo, descricao: e.target.value}) 
              }
            />

            <div className="flex gap-2">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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

              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
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
  );
}