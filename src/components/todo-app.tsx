import  { useEffect, useState } from "react";
import useTodo from "./use-todo";
import { TodoPriority } from "../shared/constants/todo";

function TodoApp() {
  const {
    filteredTodoList: todoList,
    createTodo,
    updateTodo,
    deleteTodo,
    setQ,
  } = useTodo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(TodoPriority.NORMAL);

  const onChangePriority = (e) => {
    setPriority(e.target.value)
  }

  const onCreate = () => {
    createTodo(title, description, dueDate, priority)
  }

  useEffect(() => {
    setQ(title)
  }, [title])

  return (
    <div>
      <h2>Todo list</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />
      <select value={priority} onChange={onChangePriority}>
        <option value={TodoPriority.LOW}>Low</option>
        <option value={TodoPriority.NORMAL}>Normal</option>
        <option value={TodoPriority.HIGH}>High</option>
      </select>
      <button onClick={onCreate}>Create</button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
