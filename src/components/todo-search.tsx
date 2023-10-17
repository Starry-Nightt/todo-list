import React from "react";
import style from '../styles/todo-search.module.scss';

interface Props {
  q: string;
  setQ: React.Dispatch<React.SetStateAction<string>>;
}

function TodoSearch({ q, setQ }: Props) {
  return (
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      className={style["search-bar"]}
      placeholder="Search..."
    />
  );
}

export default TodoSearch;
