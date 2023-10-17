import { useContext } from "react";
import TodoForm from "../components/todo-form";
import { TodoContext } from "../shared/contexts/todo-context";
import { Link } from "react-router-dom";

function TodoCreate() {
  const { createTodo } = useContext(TodoContext);

  return (
    <>
      <h1 className="text-center mb-5">New Task</h1>
      <div className="flex justify-end mb-5">
        <button className="btn">
          <Link to="/">View List</Link>
        </button>
      </div>
      <TodoForm createTodo={createTodo} />
    </>
  );
}

export default TodoCreate;
