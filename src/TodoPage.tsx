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
  const [list, setList] = useState(tasks);

  function removeTask(index: number) {
    const lesslist = list.toSpliced(index, 1);
    setList(lesslist);
  }
  function addTask(task: string) {
    if (task.trim() !== "") {
      let newId = (list[list.length - 1]?.id ?? 0) + 1;
      const moreList: any = [...list];
      moreList.push({ id: newId, item: task, checked: false });
      setList(moreList);
    } else {
      null;
    }
  }
  function checked(index:number){
    const checkList: any = [...list]
    checkList[index].checked = !checkList[index].checked
    setList(checkList);
    console.log(list)
  }
  function clearDone(){
    const doneList: any = [...list]
    doneList.map((task:any) => task.checked = false)
    setList(doneList)
  }
  function clearAll(){
    let clearedList: any =[...list]
    clearedList = []
    setList(clearedList)
  }

  return (
    <div className="App">
      <Header />
      <TodoInput tasks={list} addTask={addTask} />
      <TodoList tasks={list} removeTask={removeTask} checked={checked}/>
      <TodoActions tasks={list} clearDone={clearDone} clearAll={clearAll}/>
    </div>
  );
}

export default TodoPage;
