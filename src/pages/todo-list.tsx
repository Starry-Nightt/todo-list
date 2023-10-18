import  {
  useContext,
  useEffect,
  useState,
} from "react";
import { TodoContext } from "../shared/contexts/todo-context";
import TodoItem from "../components/todo-item";
import TodoSearch from "../components/todo-search";
import { Link, useSearchParams } from "react-router-dom";
import { Todo } from "../shared/models/todo";
import { getSortedArrayByKey } from "../shared/utils/helper";
import style from "../styles/todo-list.module.scss";

function TodoList() {
  const { todoList, updateTodo, deleteTodo, completeAllTodo, removeAllTodo } =
    useContext(TodoContext);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>(todoList);
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const [q, setQ] = useState(searchParams.get("q"));

  useEffect(() => {
    setSearchParams(
      (prev) => {
        prev.set("q", q);
        return prev;
      },
      { replace: true }
    );
  }, [q]);

  useEffect(() => {
    const _filteredTodoList = getSortedArrayByKey(todoList, "dueDate")
      .filter((todo) => todo.title.indexOf(q) !== -1);
    setFilteredTodoList(_filteredTodoList);
  }, [q, todoList]);

  return (
    <>
      <h1 className="text-center mb-5">Todo List</h1>
      <div className="flex justify-end mb-5">
        <button className="btn">
          <Link to="/create">Create</Link>
        </button>
      </div>
      <TodoSearch q={q} setQ={setQ} />
      <ul>
        {filteredTodoList.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <div
        className={
          "flex space-between items-center py-6 px-6 " + style["bulk-action"]
        }
      >
        <span>Bluk Action: </span>
        <div className="flex btn-group">
          <button className="btn btn-info mx-3" onClick={completeAllTodo}>
            Done
          </button>
          <button className="btn btn-danger mx-3" onClick={removeAllTodo}>
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoList;
