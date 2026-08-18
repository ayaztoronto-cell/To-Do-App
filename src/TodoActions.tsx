import type { ToDoActionsTypes } from "./todoTypes";
import { Button, Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { colors } from "./colors.ts";

export default function TodoActions(props: ToDoActionsTypes) {
  const done = props.tasks.filter((task) => task.checked === true);
  const score = `${done.length} of ${props.tasks.length} done`;
  let percent: number = (done.length / props.tasks.length) * 100;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: {xs: "100%", sm: "60%"},
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          mt: "1rem",
          height: "0px",
          width: {xs:"90%", sm:"75%"},
          borderTop: "1px solid #69696a",
        }}
      ></Box>
      <Box sx={{ width: "65%", display: "flex", align: "left", mt: "1rem" }}>
        <Typography
          sx={{
            color: colors.textSecondary,
            fontFamily: "Inter",
            textTransform: "uppercase",
            fontSize: "0.8rem",
            wordSpacing: 2,
          }}
        >
          {score}
        </Typography>
      </Box>
      <Box sx={{ width: "65%", mt: "0.7rem" }}>
        <LinearProgress
          variant="determinate"
          value={props.tasks.length === 0 ? 0 : percent}
          aria-label="Export data"
          sx={{ borderRadius: "4px" }}
        />
      </Box>
      <Box
        sx={{
          width: "65%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "0.8rem",
          gap: "0.8rem",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => props.clearDone()}
          sx={{
            width: "50%",
            borderRadius: "8px",
            textTransform: "none",
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "0.8rem",
            color: colors.textSecondary,
            borderColor: colors.textSecondary,
            "&:hover":{
                backgroundColor:"#343438"
            }
          }}
        >
          Clear done
        </Button>
        <Button
          variant="outlined"
          onClick={() => props.clearAll()}
          sx={{
            width: "50%",
            borderRadius: "8px",
            textTransform: "none",
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "0.8rem",
            color: colors.mainSecondary,
            borderColor: colors.mainSecondary,
            "&:hover":{
                backgroundColor:"#383434"
            }
          }}
        >
          Clear all
        </Button>
      </Box>
    </Box>
  );
}
