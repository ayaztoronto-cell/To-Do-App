import { Checkbox, Box, Typography, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { colors } from "./colors.ts";
import { SortableTodoTypes } from "./todoTypes.ts";
import { useSortable } from "@dnd-kit/react/sortable";

export default function SortableTodo(props: SortableTodoTypes) {
  const { ref, handleRef } = useSortable({
    id: props.task.id,
    index: props.index,
  });
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: { xs: "80%", sm: "100%" },
          justifyContent: "center",
        }}
      >
        <DragIndicatorIcon
          sx={{ color: colors.textSecondary }}
          ref={handleRef}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: { xs: "100%", sm: "70%" },
            justifyContent: "center",
          }}
        >
          <Checkbox
            size="large"
            checked={props.task.checked}
            onChange={() => props.checked(props.task.id)}
            icon={
              <RadioButtonUncheckedIcon sx={{ color: colors.mainPrimary }} />
            }
            checkedIcon={<CheckCircleIcon sx={{ color: colors.check }} />}
          />
          {props.task.checked ? (
            <Typography
              sx={{
                color: colors.textSecondary,
                width: { xs: "62%", sm: "80%" },
                fontFamily: "Inter",
                fontWeight: "300",
                fontSize: "1rem",
                textDecoration: "line-through",
              }}
            >
              {props.task.item}
            </Typography>
          ) : (
            <Typography
              sx={{
                color: colors.textPrimary,
                width: { xs: "62%", sm: "80%" },
                fontFamily: "Inter",
                fontWeight: "300",
                fontSize: "1rem",
              }}
            >
              {props.task.item}
            </Typography>
          )}
          <IconButton
            sx={{ width: { xs: "28%", sm: "15%" }, }}
            onClick={() => props.removeTask(props.task.id)}
          >
            <DeleteIcon sx={{ color: colors.textSecondary }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "0.2rem",
          height: "0px",
          width: "65%",
          borderTop: "1px solid #69696a",
        }}
      ></Box>
    </Box>
  );
}
