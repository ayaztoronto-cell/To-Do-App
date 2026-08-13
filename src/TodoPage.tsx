import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoActions from "./TodoActions";
import TodoList from "./TodoList";
import "./App.css";
import type { ToDoPageTasks } from "./todoTypes";

function TodoPage() {
  const tasks: ToDoPageTasks[] = [
    {
      id: 1,
      item: "Go to the gym",
      checked: false,
    },
    {
      id: 2,
      item: "Finish todo app",
      checked: false,
    },
  ];
  const [list, setList] = useState(tasks)

  function removeTask(index:number){
    const newlist = list.splice(index-1, 1)
    setList(newlist)
  }

  return (
    <div className="App">
      <Header />
      <TodoInput tasks={list} />
      <TodoList tasks={list} removeTask={removeTask}/>
      <TodoActions />
    </div>
  );
}

export default TodoPage;
