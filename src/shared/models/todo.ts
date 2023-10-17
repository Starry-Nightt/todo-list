import { TodoPriority, TodoStatus } from "../constants/todo";

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TodoPriority;
  status: TodoStatus
}
