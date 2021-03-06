import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async () => {
    const data = await fetch("/api/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ desc: todo }),
    });
    setTodo("");
  };

  const getTodos = async () => {
    const response = await fetch("/api/getTodos");
    const data = await response.json();
    setTodos(data.todos);
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <div className={styles.container}>
      <Head>
        <title>TodoAlas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans text-xl">
          <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
              <h1 className="text-grey-darkest font-bold text-2xl">
                Todo List
              </h1>
              <div className="flex mt-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker hover:border-gray-400"
                  placeholder="Add Todo"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
                <button
                  className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-slate-800 hover:bg-teal hover:border-gray-400"
                  onClick={addTodo}
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              {Object.keys("todos").length > 0 ? (
                todos.map((todo) => {
                  return (
                    <div className="flex mb-4 items-center" key={todo._id}>
                      <p className="w-full text-grey-darkest" id="myTodo">
                        {todo.desc}
                      </p>
                      <span
                        className="text-red-700 ml-[10px] md:ml-0 lg:ml-0"
                        id="todoStatus"
                      >
                        Not Done
                      </span>
                      <button
                        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                        onClick={() => {
                          document.getElementById(
                            "myTodo"
                          ).innerHTML = `<del>${todo.desc}</del>`;
                          document.getElementById("todoStatus").innerHTML =
                            "Done";
                          document
                            .getElementById("todoStatus")
                            .classList.add("text-green-700");
                        }}
                      >
                        Done
                      </button>
                      <button
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                        onClick={async () => {
                          const data = await fetch("/api/removeTodo", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: todo._id }),
                          });
                          setTodo("");
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-grey-darkest">No todos yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}