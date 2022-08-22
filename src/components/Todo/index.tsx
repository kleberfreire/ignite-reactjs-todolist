import { Trash } from "phosphor-react";
import { ChangeEvent } from "react";
import styles from "./Todo.module.css";

interface ITodoProps {
  data: {
    id: number;
    status: "closed" | "open";
    description: string;
  };
  handleTodoEditStatus: (
    id: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleTodoDelete: (id: number) => void;
}

export function Todo({
  data,
  handleTodoEditStatus,
  handleTodoDelete,
}: ITodoProps) {
  const { id, status, description } = data;
  return (
    <div className={styles.todoContainer} key={id}>
      <div className={styles.round}>
        <input
          type="checkbox"
          id={`checkbox${id}`}
          onChange={handleTodoEditStatus(id)}
        />
        <label htmlFor={`checkbox${id}`}></label>
      </div>
      <p className={status === "closed" ? styles.closed : ""}>{description}</p>
      <button onClick={() => handleTodoDelete(id)}>
        <Trash width={14} height={14} />
      </button>
    </div>
  );
}
