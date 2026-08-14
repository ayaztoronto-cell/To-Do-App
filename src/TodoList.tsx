import TodoRow from "./TodoInput.tsx";
import type { ToDoListTypes } from "./todoTypes.ts";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
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
        width: "100%",
        justifyContent: "center",
      }}
    >
      {props.tasks.map((task, index: number) => (
        <>
          <Box
            key={task.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "70%",
              justifyContent: "center",
            }}
          >
            <Checkbox
              size="large"
              checked={task.checked}
              onChange={() => props.checked(task.id)}
              icon={
                <RadioButtonUncheckedIcon sx={{ color: colors.mainPrimary }} />
              }
              checkedIcon={<CheckCircleIcon sx={{ color: colors.check }} />}
            />
            {task.checked ? (
              <Typography
                sx={{
                  color: colors.textSecondary,
                  width: "80%",
                  fontFamily: "Inter",
                  fontWeight: "300",
                  fontSize: "1rem",
                  textDecoration: "line-through",
                }}
              >
                {task.item}
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: colors.textPrimary,
                  width: "80%",
                  fontFamily: "Inter",
                  fontWeight: "300",
                  fontSize: "1rem",
                }}
              >
                {task.item}
              </Typography>
            )}
            <IconButton
              sx={{ width: "10%" }}
              onClick={() => props.removeTask(index)}
            >
              <DeleteIcon sx={{ color: colors.textSecondary }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              mt: "0.2rem",
              height: "0px",
              width: "65%",
              borderTop: "1px solid #69696a",
            }}
          ></Box>
        </>
      ))}
    </Box>
  );
}
