export interface ToDoTask {
  id: number;
  item: string;
  checked: boolean;
}



export interface ToDoListTypes {
  
  tasks: ToDoTask[];
  removeTask: (id: number) => void;
  checked: (id: number) => void;
}

export interface ToDoInputTypes {
  tasks: ToDoTask[];
  addTask: (task: string) => void;
}


export interface ToDoActionsTypes {
  tasks: ToDoTask[];
  clearDone: () => void;
  clearAll: () => void;
}

export interface SortableTodoTypes {
  task: ToDoTask;
  index: number;
  removeTask: (id: number) => void;
  checked: (id: number) => void;
}
