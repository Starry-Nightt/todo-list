import React, { useEffect, useState } from "react";
import { TodoPriority } from "../shared/constants/todo";
import { getCurrentDateString } from "../shared/utils/helper";

interface Props {
  createTodo: (title: string, description: string, dueDate: string, priority: TodoPriority) => void
  setQ: React.Dispatch<React.SetStateAction<string>>
}

function TodoForm({createTodo, setQ}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(TodoPriority.NORMAL);

  useEffect(() => {
    setQ(title)
  }, [title])

  const onChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value) as TodoPriority
    setPriority(value)
  }

  const onCreate = () => {
    createTodo(title, description, dueDate, priority)
    resetField()
  }

  const resetField = () => {
    setTitle("");
    setDescription("");
    setDueDate("")
    setPriority(TodoPriority.NORMAL)
  }

  return (
    <form>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        max={getCurrentDateString()}
      />
      <select value={priority} onChange={onChangePriority}>
        <option value={TodoPriority.LOW}>Low</option>
        <option value={TodoPriority.NORMAL}>Normal</option>
        <option value={TodoPriority.HIGH}>High</option>
      </select>
      <button onClick={onCreate}>Create</button>
    </form>
  );
}

export default TodoForm;
