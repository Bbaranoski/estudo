"use client";
import { useState, useEffect } from "react";

export default function Home() {
  interface Todo {
    titulo: string;
    descricao: string;
    data: string;
  }
  const [todo, setTodo] = useState<Todo>({titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]});
  const [lista, setLista] = useState<Todo[]>([{titulo: "Teste", descricao: "teste 2", data: new Date().toISOString().split("T")[0]}]);
  const [aberto, setAberto] = useState<boolean>(false);

  function addTodo() {
    setLista([...lista, todo]);
    setTodo({titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
  }

  function removeTodo(index: number) {
    let listaFiltrada = lista.filter((e, i) => i !== index);
    setLista(listaFiltrada);
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-[repeat(auto-fit,minmax(200px,40vh))] w-full gap-3 p-3">

      {lista.map((e, index) => (
        <div key={index} className="bg-blue-200 flex flex-col items-center justify-between p-4 rounded-md min-h-[200px]">
          <h2>{e.titulo}</h2>
          <p>{e.descricao}</p>

          <div className="flex gap-2">
            <button className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => {removeTodo(index)}}
            >Remover</button>
            <p>{e.data}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded"
            >faz nada</button>
          </div>
          
        </div>
      ))}

      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg" 
        onClick={() => setAberto(true)}
      >+</button>

      {aberto && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-blue-500 p-6 rounded-lg shadow-lg w-96">
            <input type="text"
              placeholder="Título"
              className="p-2 border rounded mb-2 w-full" 
              value={todo.titulo}
              onChange={(e) => 
                setTodo({...todo, titulo: e.target.value})
              }
            />

            <textarea className="p-2 border rounded mb-2 w-full min-h-[6rem] resize-none"
              placeholder="Descrição"
              value={todo.descricao}
              onChange={(e) => 
                setTodo({...todo, descricao: e.target.value}) 
              }
            />

            <div className="flex gap-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setTodo({...todo, titulo: "", descricao: "", data: new Date().toISOString().split("T")[0]})
                  setAberto(false)
                }}
              >X</button>

              <input className="p-2 border rounded mb-2 w-full"
                type="date" 
                value={todo.data}
                onChange={(e) => {
                  setTodo({...todo, data: e.target.value})
                }}
              />

              <button className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if(todo.titulo !== "" && todo.descricao !== "" && todo.data !== "") {
                    addTodo()
                    setAberto(false);
                  }
                }}
              >V</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}