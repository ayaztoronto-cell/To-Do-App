import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoActions from "./TodoActions";
import TodoList from "./TodoList";
import "./App.css";
import type { ToDoTask } from "./todoTypes";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";

function TodoPage() {
  const savedTasks =
    JSON.parse(localStorage.getItem("savedTasks") ?? "null") ?? [];
  const tasks: ToDoTask[] = savedTasks ?? [];
  const [list, setList] = useState<ToDoTask[]>(tasks);

  function removeTask(id: number) {
    const lessList: ToDoTask[] = list.filter((task) => task.id !== id);

    setList(lessList);
  }

  const topId = Math.max(0, ...list.map((task) => task.id));

  function addTask(task: string) {
    if (task.trim() !== "") {
      const moreList: ToDoTask[] = [...list];
      moreList.push({ id: topId + 1, item: task, checked: false });
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
  function moveItemInPlace(
    arr: ToDoTask[],
    fromIndex: number,
    toIndex: number,
  ) {
    // Remove the item from its current position
    const [item] = arr.splice(fromIndex, 1);

    // Insert the item into the new position
    arr.splice(toIndex, 0, item);

    return arr;
  }

  function rearrange(event) {
    const rearranged = [...list];
    const { source } = event.operation;
    if (event.canceled) return;
    if (isSortable(source)) {
      if (source.initialIndex !== source.index)
        moveItemInPlace(rearranged, source.initialIndex, source.index);
      setList(rearranged);
    }
  }
  console.log(list);
  useEffect(() => {
    localStorage.setItem("savedTasks", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <Header />
      <TodoInput tasks={list} addTask={addTask} />
      <DragDropProvider
        onDragEnd={(event) => {
          rearrange(event);
        }}
      >
        <TodoList tasks={list} removeTask={removeTask} checked={checked} />
      </DragDropProvider>

      <TodoActions tasks={list} clearDone={clearDone} clearAll={clearAll} />
    </div>
  );
}

export default TodoPage;
