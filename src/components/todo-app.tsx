import useTodo from "../shared/hooks/use-todo";
import TodoItem from "./todo-item";
import TodoForm from "./todo-form";

function TodoApp() {
  const {
    filteredTodoList: todoList,
    createTodo,
    updateTodo,
    deleteTodo,
    setQ,
  } = useTodo();

  return (
    <div>
      <h2>Todo list</h2>
      <TodoForm createTodo={createTodo} setQ={setQ}/>
      <ul>
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
