"use client";
import { useState, useEffect } from "react";

export default function Home() {
  interface Todo {
    titulo: string;
    descricao: string;
  }
  const [todo, setTodo] = useState<Todo>({titulo: "", descricao: ""});
  const [lista, setLista] = useState<Todo[]>([{titulo: "Teste", descricao: "teste 2"}]);

  const addTodo = () => {
    if(todo.titulo !== "" && todo.descricao !== "") {
      setLista([...lista, todo]);
      setTodo({titulo: "", descricao: ""});
    }
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[repeat(auto-fit,minmax(250,1fr))] w-full gap-3 p-3">
      {lista.map((e, index) => (
        <div key={index} className="bg-blue-200 p-4 rounded-md">
          <p>{e.titulo}</p>
          <p>{e.descricao}</p>
        </div>
      ))}
        <div className="bg-purple-500 p-4 rounded-md order-2">
          <input type="text"
            placeholder="Título"
            className="p-2 border rounded mb-2 w-full" 
            value={todo.titulo}
            onChange={(e) => setTodo({...todo, titulo: e.target.value})}
          />
          <input type="text"
            placeholder="Descrição"
            className="p-2 border rounded mb-2 w-full"
            value={todo.descricao}
            onChange={(e) => setTodo({...todo, descricao: e.target.value})}
          />
          <input type="date" className="p-2 border rounded mb-2 w-full"/>
          <div className="flex gap-2">
            <button className="bg-red-500 text-white px-4 py-2 rounded">X</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={addTodo}
            >V</button>
          </div>
        </div>
    </div>
  );
}