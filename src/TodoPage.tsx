import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoActions from "./TodoActions";
import TodoList from "./TodoList"
import "./App.css";
import type { ToDoPageTasks } from "./todoTypes";

function TodoPage() {
  return (
    <div className="App">
      <Header />
      <TodoInput />
      <TodoList />
      <TodoActions />
    </div>
  );
}

export default TodoPage;
