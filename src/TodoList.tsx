import TodoRow from "./TodoInput.tsx";
import type { ToDoListTypes } from "./todoTypes.ts";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, Box, Typography, IconButton } from "@mui/material";
import { colors } from "./colors.ts";

export default function TodoList(props: any) {
  console.log(props.tasks);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {props.tasks.map((task: string, index: number) => (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Checkbox
              size="large"
              icon={
                <RadioButtonUncheckedIcon sx={{ color: colors.mainPrimary }} />
              }
              checkedIcon={<CheckCircleIcon sx={{ color: colors.check }} />}
            />
            <Typography
              sx={{
                color: colors.textPrimary,
                width: "48%",
                fontFamily: "Inter",
                fontWeight: "300",
                fontSize: "1.1rem",
              }}
            >
              {task.item}
            </Typography>
            <IconButton
              sx={{ width: "6%" }}
              onClick={() => props.removeTask(index)}
            >
              <DeleteIcon sx={{ color: colors.textSecondary }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              mt: "0.2rem",
              height: "0px",
              width: "60%",
              borderTop: "1px solid #69696a",
            }}
          ></Box>{" "}
        </>
      ))}
    </Box>
  );
}
