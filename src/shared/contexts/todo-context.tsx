import { createContext,  useMemo} from "react";
import React from "react";
import { LocalStorageKey } from "../constants/local-storage-key";
import { TodoPriority, TodoStatus } from "../constants/todo";
import useLocalStorage from "../hooks/use-local-storage";
import { Todo } from "../models/todo";

export const TodoContext = createContext(null);

function TodoProvider({ children }) {
  const [todoList, setTodoList] = useLocalStorage(LocalStorageKey.TODO, []) as [
    Todo[],
    React.Dispatch<React.SetStateAction<Todo[]>>
  ];

  function createTodo(
    title: string,
    description: string,
    dueDate: string,
    priority: TodoPriority
  ) {
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 100000),
      title,
      description,
      dueDate,
      priority,
      status: TodoStatus.IN_COMPLETE,
    };
    setTodoList((prev) => [newTodo, ...prev]);
  }

  function updateTodo(
    id: number,
    todo: {
      title?: string;
      description?: string;
      dueDate?: string;
      priority?: TodoPriority;
      status?: TodoStatus;
    }
  ) {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) return { ...item, ...todo };
      return item;
    });
    setTodoList(newTodoList);
  }

  function deleteTodo(id: number) {
    const newTodoList = todoList.reduce((prev, cur) => {
      if (cur.id === id) return prev;
      return [...prev, cur];
    }, []);
    setTodoList(newTodoList);
  }

  function completeAllTodo() {
    const newTodoList = todoList.map(todo => ({...todo, status: TodoStatus.COMPLETE}))
    setTodoList(newTodoList)
  }

  function removeAllTodo(){
    setTodoList([])
  }

  const contextValue = useMemo(
    () => ({
      todoList,
      createTodo,
      updateTodo,
      deleteTodo,
      completeAllTodo,
      removeAllTodo
    }),
    [todoList, createTodo, deleteTodo, updateTodo, completeAllTodo, removeAllTodo]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}

export default TodoProvider;
