import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../shared/contexts/todo-context";
import TodoItem from "../components/todo-item";
import TodoSearch from "../components/todo-search";
import { Link, useSearchParams } from "react-router-dom";
import { Todo } from "../shared/models/todo";
import { getSortedArrayByKey } from "../shared/utils/helper";
import TodoBottomSheet from "../components/todo-bottom-sheet";

function TodoList() {
  const { todoList, updateTodo, deleteTodo, completeAllTodo, removeAllTodo } =
    useContext(TodoContext);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>(todoList);
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const [q, setQ] = useState(searchParams.get("q"));
  const [hasCheckedOne, setHasCheckedOne] = useState(false);

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
    const _filteredTodoList = getSortedArrayByKey(todoList, "dueDate").filter(
      (todo) => todo.title.indexOf(q) !== -1
    );
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
      <ul className="pb-4">
        {filteredTodoList.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            setHasCheckedOne={setHasCheckedOne}
          />
        ))}
      </ul>
      <TodoBottomSheet
        visible={hasCheckedOne}
        completeAllTodo={completeAllTodo}
        removeAllTodo={removeAllTodo}
      />
    </>
  );
}

export default TodoList;
