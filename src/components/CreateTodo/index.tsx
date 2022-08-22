import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent } from "react";

import styles from "./CreateTodo.module.css";

interface ICreateTodo {
  handleNewTodoInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTodoAdd: (event: FormEvent<HTMLFormElement>) => void;
  newTodoValue: string;
}

export function CreateTodo({
  handleNewTodoInput,
  handleTodoAdd,
  newTodoValue,
}: ICreateTodo) {
  return (
    <form className={styles.container} onSubmit={handleTodoAdd}>
      <input
        className={styles.inputCreate}
        type="text"
        placeholder="Adicione uma nova tarefa"
        onChange={handleNewTodoInput}
        value={newTodoValue}
        required
      />
      <button className={styles.buttonCreate}>
        Criar <PlusCircle />
      </button>
    </form>
  );
}
