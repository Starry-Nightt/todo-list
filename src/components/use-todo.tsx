import { Todo } from "../shared/models/todo";
import { TodoPriority, TodoStatus } from "../shared/constants/todo";
import { LocalStorageKey } from "../shared/constants/local-storage-key";
import useLocalStorage from "../shared/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { getSortedArrayByKey } from "../shared/utils/helper";

export default function useTodo() {
  const [todoList, setTodoList] = useLocalStorage(LocalStorageKey.TODO, []) as [
    Todo[],
    React.SetStateAction<any>
  ];
  const [filteredTodoList, setFilteredTodoList] = useState(todoList)
  const [q, setQ] = useState('')

  useEffect(() => {
    const filteredList = getSortedArrayByKey(todoList, 'dueDate').reverse().filter(todo => todo.title.indexOf(q) !== -1)
    setFilteredTodoList(filteredList)
  }, [q, todoList])

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
      status: TodoStatus.IN_COMPLETE
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
      status?: TodoStatus
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

  return { filteredTodoList, createTodo, updateTodo, deleteTodo, setQ };
}
