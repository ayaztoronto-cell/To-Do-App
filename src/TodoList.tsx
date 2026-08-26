import SortableTodo from "./SortableTodo.tsx";
import type { ToDoListTypes } from "./todoTypes.ts";

import { Checkbox, Box, Typography, IconButton } from "@mui/material";
import { colors } from "./colors.ts";

export default function TodoList(props: ToDoListTypes) {
  return (
    <Box
      sx={{
        mt: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "90%", sm: "60%" },
        justifyContent: "center",
      }}
    >
      {props.tasks.map((task, index) => (
        <SortableTodo
          key={task.id}
          task={task}
          editTask={props.editTask}
          removeTask={props.removeTask}
          checked={props.checked}
          index={index}
        />
      ))}
    </Box>
  );
}
