import React from "react";
import style from "../styles/todo-bottom-sheet.module.scss";


interface Props {
    visible: boolean
    completeAllTodo: () => void
    removeAllTodo: () => void
}

function TodoBottomSheet({visible, completeAllTodo, removeAllTodo}: Props) {
  return (
    <div
      className={
        "flex space-between items-center py-4 px-6 " +
        style["bulk-action"] +
        " " +
        style[`${visible ? "showing" : null}`]
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
  );
}

export default TodoBottomSheet;
