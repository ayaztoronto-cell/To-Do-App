import type { ToDoInputTypes } from "./todoTypes.ts";
import { Button, TextField, Box, Typography } from "@mui/material";
import { colors } from "./colors";
import React, { useState, useRef } from "react";

export default function TodoInput(props: ToDoInputTypes) {
  const [task, setTask] = useState<string>("");
  const [empty, setEmpty] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function checkEmpty(task: string): void {
    if (task.trim() === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }
  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.addTask(task);
    setTask("");
    checkEmpty(task);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  return (
    <form onSubmit={handleAdd} className="todoinput">
      <Box className="todoinput" sx={{ width: { xs: "100%", sm: "60%" } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            justifyContent: "center",
            width: { xs: "78%", sm: "65%" },
            mb: "6px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Add something for today"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              if (e.target.value !== "") {
                setEmpty(false);
              }
            }}
            inputRef={inputRef}
            onFocus={() => {
              setTimeout(() => {
                inputRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 300);
            }}
            sx={{
              fontFamily: "Inter",
              width: "90%",

              "& .MuiOutlinedInput-root": {
                backgroundColor: "#2b2e37",
                borderColor: "white",
                height: "2.5rem",
                borderRadius: "10px",
                // Normal border
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.textSecondary,
                },

                // Hover border
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.mainPrimary,
                },

                // Clicked / focused border
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
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "10%",
              textTransform: "none",
              backgroundColor: colors.mainPrimary,
              color: "colors.textPrimary",
              height: "2.5rem",
              borderRadius: "10px",
              fontFamily: "Inter",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: colors.check,
              },
            }}
          >
            Add
          </Button>
        </Box>
        {empty && (
          <Box sx={{ width: "65%" }}>
            <Typography
              sx={{
                color: colors.mainSecondary,
                fontSize: "0.65rem",
                letterSpacing: 0.9,
                fontWeight: "300",
                fontFamily: "inter",
              }}
            >
              Enter a task first.
            </Typography>
          </Box>
        )}
        {props.tasks.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "3rem",
              mb: "3rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: colors.textPrimary,
                fontFamily: "Georgia",
                fontSize: "1.2rem",
                mb: "6px",
              }}
            >
              Nothing on the list yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.textSecondary,
                fontFamily: "Inter",
                fontSize: "0.8rem",
              }}
            >
              Add the things you want done today
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.textSecondary,
                fontFamily: "Inter",
                fontSize: "0.8rem",
              }}
            >
              All tasks will carry over tomorrow, unchecked.
            </Typography>
          </Box>
        )}
      </Box>
    </form>
  );
}
