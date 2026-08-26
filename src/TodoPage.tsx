import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoActions from "./TodoActions";
import TodoList from "./TodoList";
import "./App.css";
import type { ToDoTask } from "./todoTypes";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";

function TodoPage() {
  const [list, setList] = useState<ToDoTask[]>(() => {
    const savedTasks: ToDoTask[] = JSON.parse(
      localStorage.getItem("savedTasks") ?? "[]",
    );

    const savedDate = localStorage.getItem("date");

    if (savedDate !== getTodayDate()) {
      return savedTasks.map((task) => ({
        ...task,
        checked: false,
      }));
    }

    return savedTasks;
  });

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
  function editTask(id: number, newText: string) {
    const editedList = list.map((task) => {
      if (task.id === id) {
        return { ...task, item: newText };
      }
      return task;
    });
    setList(editedList);
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
    const doneList = list.filter((task) => task.checked === false);
    console.log(doneList);
    setList(doneList);
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

  function rearrange(event: DragEndEvent) {
    const rearranged = [...list];
    const { source } = event.operation;
    if (event.canceled) return;
    if (isSortable(source)) {
      if (source.initialIndex !== source.index)
        moveItemInPlace(rearranged, source.initialIndex, source.index);
      setList(rearranged);
    }
  }
  function getTodayDate() {
    const today = new Date();

    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }
  useEffect(() => {
    localStorage.setItem("savedTasks", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    localStorage.setItem("date", getTodayDate());
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoInput tasks={list} addTask={addTask} />
      <DragDropProvider
        onDragEnd={(event) => {
          rearrange(event);
        }}
      >
        <TodoList
          tasks={list}
          removeTask={removeTask}
          checked={checked}
          editTask={editTask}
        />
      </DragDropProvider>

      <TodoActions tasks={list} clearDone={clearDone} clearAll={clearAll} />
    </div>
  );
}

export default TodoPage;
