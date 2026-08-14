import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoActions from "./TodoActions";
import TodoList from "./TodoList";
import "./App.css";
import type { ToDoTask } from "./todoTypes";

function TodoPage() {
  const savedTasks =
    JSON.parse(localStorage.getItem("savedTasks") ?? "null") ?? [];
  const tasks: ToDoTask[] = savedTasks ?? [];
  const [list, setList] = useState<ToDoTask[]>(tasks);

  function removeTask(index: number) {
    const lesslist = list.toSpliced(index, 1);
    setList(lesslist);
  }
  function addTask(task: string) {
    if (task.trim() !== "") {
      let newId = (list[list.length - 1]?.id ?? 0) + 1;
      const moreList: ToDoTask[] = [...list];
      moreList.push({ id: newId, item: task, checked: false });
      setList(moreList);
    } else {
      null;
    }
  }
  function checked(id: number) {
    const checkList: ToDoTask[] = list.map((task) => {
      if (task.id === id) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setList(checkList);
  }
  function clearDone() {
    const doneList: ToDoTask[] = [...list];
    const notDoneList = doneList.filter((task) => task.checked === false);
    console.log(doneList);
    setList(notDoneList);
  }
  function clearAll() {
    let clearedList: ToDoTask[] = [...list];
    clearedList = [];
    setList(clearedList);
  }

  localStorage.setItem("savedTasks", JSON.stringify(list));

  return (
    <div className="App">
      <Header />
      <TodoInput tasks={list} addTask={addTask} />
      <TodoList tasks={list} removeTask={removeTask} checked={checked} />
      <TodoActions tasks={list} clearDone={clearDone} clearAll={clearAll} />
    </div>
  );
}

export default TodoPage;
