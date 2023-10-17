import React from 'react'
import { Todo } from '../shared/models/todo'

interface Props {
  todo: Todo,
  updateTodo: (id: number, data: any) => void
  deleteTodo: (id: number) => void
}

function TodoItem({todo}: Props) {
  return (
    <li>{todo.title}</li>
  )
}

export default TodoItem