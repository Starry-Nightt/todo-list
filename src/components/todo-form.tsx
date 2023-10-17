import React, { useEffect, useState } from "react";
import { TodoPriority, TodoStatus } from "../shared/constants/todo";
import { getCurrentDateString } from "../shared/utils/helper";
import style from "../styles/todo-form.module.scss";
import { Todo } from "../shared/models/todo";

interface Props {
  createTodo?: (
    title: string,
    description: string,
    dueDate: string,
    priority: TodoPriority
  ) => void;
  isEdit?: boolean;
  data?: Todo;
  updateTodo?: (
    id: number,
    todo: {
      title?: string;
      description?: string;
      dueDate?: string;
      priority?: TodoPriority;
      status?: TodoStatus;
    }
  ) => void;
}

function TodoForm({ createTodo, isEdit, data, updateTodo }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(getCurrentDateString());
  const [priority, setPriority] = useState(TodoPriority.NORMAL);
  const [error, setError] = useState("");

  useEffect(() => {
    if (title.trim().length) setError("");
  }, [title]);

  useEffect(() => {
    if (!isEdit) return;
    setTitle(data.title);
    setDescription(data.description);
    setDueDate(data.dueDate);
    setPriority(data.priority);
  }, []);

  const onChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value) as TodoPriority;
    setPriority(value);
  };

  const onCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    createTodo(title, description, dueDate, priority);
    resetField();
  };

  const onUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEdit) return;
    if (!validateForm()) return;
    updateTodo(data.id, { title, description, dueDate, priority });
  };

  const resetField = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority(TodoPriority.NORMAL);
    setError("")
  };

  const validateForm = (): boolean => {
    if (title.trim().length) return true;
    setError("Title is required");
    return false;
  };

  return (
    <form>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={style["form-title"]}
        placeholder="Add a new task"
      />
      <div className="h-10">
        {!!error.length && <p className="text-danger">{error}</p>}
      </div>
      <b className="mb-2">Description</b>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={style["form-description"]}
        rows={15}
      />

      <div className={"flex space-between mb-10 " + style["form-row"]}>
        <div className={style["form-date-picker"]}>
          <b className="w-full mb-2">Due Date</b>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={getCurrentDateString()}
            className={style["form-date-picker-input"]}
          />
        </div>
        <div className={style["form-select"]}>
          <b className="w-full mb-2">Priority</b>
          <select
            value={priority}
            onChange={onChangePriority}
            className={style["form-select-input"]}
          >
            <option value={TodoPriority.LOW}>Low</option>
            <option value={TodoPriority.NORMAL}>Normal</option>
            <option value={TodoPriority.HIGH}>High</option>
          </select>
        </div>
      </div>
      {isEdit ? (
        <button onClick={onUpdate} className="btn btn-success w-full">
          Update
        </button>
      ) : (
        <button onClick={onCreate} className="btn btn-success w-full">
          Create
        </button>
      )}
    </form>
  );
}

export default TodoForm;
