import { LocalStorageKey } from "../shared/constants/local-storage-key";
import { TodoPriority } from "../shared/constants/todo";
import useLocalStorage from "../shared/hooks/use-local-storage";
import { Todo } from "../shared/models/todo";

const [data, setData] = useLocalStorage(LocalStorageKey.TODO) as [Todo[], any];

class TodoService {
  getAllTodo(): Promise<Todo[]> {
    return new Promise((resolve) => resolve(data));
  }

  getTodoById(id: number): Promise<Todo> {
    const item = data.find((item) => item.id === id);
    return new Promise((resolve) => resolve(item));
  }

  createTodo(
    title: string,
    description: string,
    dueDate: Date,
    priority: TodoPriority
  ): Promise<Todo> {
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 100000),
      title,
      description,
      dueDate,
      priority,
    };
    setData((prev) => [newTodo, ...prev]);
    return new Promise((resolve) => resolve(newTodo));
  }

  updateTodo(
    id: number,
    todo: {
      title?: string;
      description?: string;
      dueDate?: Date;
      priority?: TodoPriority;
    }
  ): Promise<void> {
    const newData = data.map((item) => {
      if (item.id === id) return { ...item, ...todo };
      return item;
    });
    setData(newData);
    return new Promise((resolve) => resolve());
  }

  deleteTodo(id: number): Promise<void> {
    const newData = data.reduce((prev, cur) => {
      if (cur.id === id) return prev;
      return [...prev, cur];
    }, []);
    setData(newData);
    return new Promise((resolve) => resolve());
  }
}

export default new TodoService();
