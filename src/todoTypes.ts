export interface ToDoPageTasks {
  id: number;
  item: string;
  checked: boolean;
  
}

export interface ToDoListTypes {
  
  
  
  tasks: ToDoPageTasks[];
 
 handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;

  handleCheckChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  handleEnter: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;

  removeTask: (index: number) => void;
}


export interface ToDoRowTypes {
  task: ToDoPageTasks;
  index: number;
  
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;

  handleCheckChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  handleEnter: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;

  removeTask: (index: number) => void;
}

export interface ToDoActions {
  onAdd:() => void;
  onCheckClear:() => void;
  onClear:() => void;
}