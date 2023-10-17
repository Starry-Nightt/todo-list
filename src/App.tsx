import { Route, Routes } from "react-router-dom";
import TodoCreate from "./pages/todo-create";
import TodoList from "./pages/todo-list";
import TodoProvider from "./shared/contexts/todo-context";

function App() {
  return (
    <TodoProvider>
      <div className="container py-5">
        <Routes>
          <Route path='/' element={<TodoList/>}></Route>
          <Route path='/create' element={<TodoCreate/>}></Route>
        </Routes>
      </div>
    </TodoProvider>
  );
}

export default App;
