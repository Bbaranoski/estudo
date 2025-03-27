"use client";
import { useState } from "react";

export default function Home() {
  interface Todo {
    titulo: string;
    descricao: string;
  }
  const [todo, setTodo] = useState<Todo>({titulo: "", descricao: ""});
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full gap-4 p-4">
        <div className="bg-purple-500 p-4 rounded-md">Item 1</div>
        <div className="bg-white p-4 rounded-md">Item 2</div>
        <div className="bg-white p-4 rounded-md">Item 3</div>
        <div className="bg-white p-4 rounded-md">Item 4</div>
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
          <button onClick={() => console.log(todo)}
          >V</button>
        </div>
    </div>
  );
}