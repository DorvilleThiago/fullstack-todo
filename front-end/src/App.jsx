import { useState, useEffect } from "react"

import Todo from "./Todo"

function App() {

  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  }

    const getTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/todos");
        const jsonData = await response.json();
        setTodos(jsonData)
      } catch (error) {
        console.error(error.message);
      }
    }
  
  const deleteTodo = async (id) => { 
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      console.log(deleteTodo)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos();
    },[]);

  return (
    <main className="flex flex-col items-center h-screen w-screen">
      
      <section style={{width: '80vw'}} className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">TODO APP</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            className=""
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>
      </section>

      <section style={{width: '80vw'}}  className="flex flex-col items-center mt-5">
        {todos.map((todo,index) => (
          <div key={todo.todo_id} className="flex flex-row mt-1">
            <h1>{index}. {todo.description}</h1>
            <button className="bg-blue-500 rounded-xl ml-2 p-1">edit</button>
            <button onClick={async () => { await deleteTodo(todo.todo_id); getTodos(); }} className="bg-red-500 rounded-xl ml-2 p-1">delete</button>
          </div>
        ))}
      </section>

    </main>
  )
}

export default App
