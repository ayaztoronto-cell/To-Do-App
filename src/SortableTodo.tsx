import {
  Checkbox,
  Box,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { colors } from "./colors.ts";
import { SortableTodoTypes } from "./todoTypes.ts";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState, useRef, useEffect } from "react";

export default function SortableTodo(props: SortableTodoTypes) {
  const { ref, handleRef } = useSortable({
    id: props.task.id,
    index: props.index,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(props.task.item);
  const inputRef = useRef<HTMLInputElement>(null);
  function handleEdited() {
    props.editTask(props.task.id, draftText);
    setIsEditing(false);
  }
  useEffect(() => {
  if (isEditing) {
    inputRef.current?.focus();
  }
}, [isEditing]);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "100%", sm: "65%" },
        justifyContent: "center",

        
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: { xs: "100%", sm: "100%" },
          justifyContent: "center",
        }}
      >
        <DragIndicatorIcon
          sx={{ color: colors.textSecondary, fontSize: "1.3rem", width: "7%" }}
          ref={handleRef}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",

            width: { xs: "100%", sm: "100%", gap: "3px" },
            justifyContent: "center",
            
          }}
        >
          {isEditing ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: { xs: "100%", sm: "100%" },
                justifyContent: "center",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Edit Task"
                inputRef={inputRef}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEdited();
                  }
                }}
                sx={{
                  fontFamily: "Inter",
                  width: { xs: "80%", sm: "90%" },
                  mr: "10px",

                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2b2e37",
                    borderColor: "white",
                    height: "2.5rem",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.textSecondary,
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.mainPrimary,
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.mainPrimary,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: colors.textPrimary,
                  },

                  "& input::placeholder": {
                    color: colors.textSecondary,
                    fontSize: "0.9rem",
                  },
                }}
              />
              <IconButton
                sx={{ width: { xs: "17%", sm: "11%" } }}
                onClick={() => handleEdited()}
              >
                <CheckIcon
                  sx={{ color: colors.textSecondary, fontSize: "1.2rem" }}
                />
              </IconButton>
              <Box sx={{ width: { xs: "7%", sm: "0%" } }}></Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: { xs: "100%", sm: "100%", gap: "3px" },
                justifyContent: "center",
                
              }}
            >
              <Checkbox
                size="large"
                checked={props.task.checked}
                onChange={() => props.checked(props.task.id)}
                sx={{ width: { xs: "10%", sm: "7%" } }}
                icon={
                  <RadioButtonUncheckedIcon
                    sx={{ color: colors.mainPrimary }}
                  />
                }
                checkedIcon={<CheckCircleIcon sx={{ color: colors.check }} />}
              />
              {props.task.checked ? (
                <Typography
                  sx={{
                    color: colors.textSecondary,
                    width: { xs: "80%", sm: "90%" },
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
                    width: { xs: "80%", sm: "90%" },
                    fontFamily: "Inter",
                    fontWeight: "300",
                    fontSize: "1rem",
                  }}
                >
                  {props.task.item}
                </Typography>
              )}
              <IconButton
                sx={{ width: { xs: "7%", sm: "5%" } }}
                onClick={() => setIsEditing(true)}
              >
                <EditIcon
                  sx={{ color: colors.textSecondary, fontSize: "1.2rem" }}
                />
              </IconButton>
              <IconButton
                sx={{ width: { xs: "7%", sm: "5%"} }}
                onClick={() => props.removeTask(props.task.id)}
              >
                <DeleteIcon sx={{ color: colors.textSecondary }} />
              </IconButton>
              <Box sx={{ width: { xs: "10%", sm: "0%"},  }}></Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          mt: "0.2rem",
          height: "0px",
          width: {xs:"85%", sm:"100%"},
          borderTop: "1px solid #69696a",
        }}
      ></Box>
    </Box>
  );
}
