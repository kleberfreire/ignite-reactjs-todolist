import { ChangeEvent, FormEvent, useState } from "react";
import { Trash } from "phosphor-react";
import { CreateTodo } from "./components/CreateTodo";
import "./globals.css";
import styles from "./styles/App.module.css";
import { Todo } from "./components/Todo";

interface ITodo {
  id: number;
  status: "closed" | "open";
  description: string;
}

function App() {
  const [newTodoValue, setNewTodoValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  function handleNewTodoInput(event: ChangeEvent<HTMLInputElement>) {
    const newTodoValue = event.target.value;
    setNewTodoValue(newTodoValue);
    console.log(newTodoValue);
  }

  function handleTodoAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTodos((TodosValue) => [
      ...TodosValue,
      {
        id: TodosValue.length + 1,
        status: "open",
        description: newTodoValue,
      },
    ]);
    setNewTodoValue("");
  }

  function handleTodoDelete(id: number) {
    const todosUpdated = todos.filter((todo) => todo.id !== id);
    console.log(todosUpdated);
    setTodos(todosUpdated);
  }

  function handleTodoEditStatus(id: number) {
    return function todoEditStatus(event: ChangeEvent<HTMLInputElement>) {
      const todosUpdated = [...todos];
      const todoExists = todosUpdated.find((todo) => todo.id === id);
      if (!todoExists) {
        return;
      }

      todoExists.status = event.target.checked ? "closed" : "open";

      setTodos(todosUpdated);
    };
  }

  console.log(todos);

  const todosClosed = todos.filter((todo) => todo.status === "closed");

  return (
    <>
      <header className={styles.header}>
        <img src="/Logo.svg" alt="" />
      </header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <CreateTodo
            handleNewTodoInput={handleNewTodoInput}
            handleTodoAdd={handleTodoAdd}
            newTodoValue={newTodoValue}
          />
          <div className={styles.info}>
            <p className={styles.infoCreated}>
              Tarefas criadas <span>{todos.length}</span>
            </p>
            <p className={styles.infoSuccess}>
              {" "}
              Concluídas{" "}
              <span>
                {todosClosed.length} de {todos.length}
              </span>
            </p>
          </div>
          <div>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <Todo
                  key={todo.id}
                  data={todo}
                  handleTodoEditStatus={handleTodoEditStatus}
                  handleTodoDelete={handleTodoDelete}
                />
              ))
            ) : (
              <div className={styles.noTodosMenssage}>
                <img src="/Clipboard.svg" alt="" />
                <p>
                  Você ainda não tem tarefas cadastradas Crie tarefas e organize
                  seus itens a fazer
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
