import { useEffect, useState } from "react";
import { Todo } from "../shared/models/todo";
import todoServices from "../services/todo-services";

export default function useTodo(){
    const [todoList, setTodoList] = useState<Todo[]>([]);

    async function getAllTodo(){
        const data = await todoServices.getAllTodo();
        setTodoList(data)
    }

    useEffect(() => {
        getAllTodo();        
    }, [])

    return {todoList}
}