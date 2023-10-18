import React from "react";
import { Todo } from "../shared/models/todo";
import style from "../styles/todo-item.module.scss";
import useToggle from "../shared/hooks/use-toggle";
import TodoForm from "./todo-form";

interface Props {
  todo: Todo;
  updateTodo: (id: number, data: any) => void;
  deleteTodo: (id: number) => void;
}

function TodoItem({ todo, updateTodo, deleteTodo }: Props) {
  const [visible, toggle] = useToggle(false);

  const onCheckTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo(todo.id, { status: e.target.checked });
  };

  const onRemoveTodo = () => {
    deleteTodo(todo.id);
  };

  const onUpdateTodo = (id: number, data: any) => {
    updateTodo(id, data)
    toggle()
  }

  return (
    <li className={style["wrapper"]}>
      <div className="flex space-between items-center p-4">
        <div className="flex">
          <input
            type="checkbox"
            onChange={onCheckTodo}
            checked={todo.status ? true : false}
          />
          {todo.title}
        </div>
        <div className={"flex btn-group"}>
          <button className="btn btn-info mx-2" onClick={toggle}>Detail</button>
          <button className="btn btn-danger mx-2" onClick={onRemoveTodo}>
            Remove
          </button>
        </div>
      </div>
      {visible && (
        <div className={"py-6 px-7 " + style["border-top"]} >
          <TodoForm updateTodo={onUpdateTodo} isEdit data={todo} />
        </div>
      )}
    </li>
  );
}

export default TodoItem;
