export interface ToDoTask {
  id: number;
  item: string;
  checked: boolean;
}



export interface ToDoListTypes {
  
  tasks: ToDoTask[];
  removeTask: (index: number) => void;
  checked: (indes: number) => void;
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
