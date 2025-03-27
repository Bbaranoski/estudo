"use client";
import { useState, useEffect } from "react";

export default function Home() {
  interface Todo {
    titulo: string;
    descricao: string;
  }
  const [todo, setTodo] = useState<Todo>({titulo: "", descricao: ""});
  const lista: Todo[] = [{titulo: "Teste", descricao: "teste 2"}];

  useEffect(() => {
    {lista.map((e, index) => (
      <div key={index} className="bg-blue-200 p-4 rounded-md">
        <p>{e.titulo}</p>
        <p>{e.descricao}</p>
      </div>
    ))}
  }, [lista]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full gap-4 p-4">
        <div className="bg-purple-500 p-4 rounded-md order-2">
          <input type="text" 
          value={todo.titulo}
          onChange={(e) => setTodo({...todo, titulo: e.target.value})}
          />
          <input type="text" 
          value={todo.descricao}
          onChange={(e) => setTodo({...todo, descricao: e.target.value})}
          />
          <input type="date" />
          <button>X</button>
          <button onClick={() => {console.log(lista) 
              if(todo.titulo != ''){
                lista.push(todo)
              }
            }}
          >V</button>
        </div>
    </div>
  );
}