import { Typography, Box } from "@mui/material";
import { colors } from "./colors";

export default function Header() {
  interface DateTypes {
    month: number;
    date: number;
    dayOfWeek: number;
  }
  const today: Date = new Date();

  const todayInfo: DateTypes = {
    month: today.getMonth(),
    date: today.getDate(),
    dayOfWeek: today.getDay(),
  };

  const days: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shortenedDays: Array<string> = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const months: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateHeading: string = `${days[todayInfo.dayOfWeek]},      ${months[todayInfo.month]} ${todayInfo.date}`;

  return (
    <div className="header">
      <Box
        sx={{
          color: colors.mainPrimary,
          width: 80,
          height: 80,
          border: "3px solid",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          transform: 'rotate(-4deg)',
          
        }}
      >
        <Box
          sx={{
            mb:"4px",
            height: "0",
            width: "85%",
            borderTop: "1px solid #8fb5e4",
            
          }}
        ></Box>
          <Typography
            sx={{
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              letterSpacing: "1px",
              
              lineHeight: "0.9",
            }}
          >
            {shortenedDays[todayInfo.dayOfWeek]}
          </Typography>
          <Typography
            sx={{
              color: colors.textPrimary,
              fontSize: "1.5rem",
              fontFamily: "Georgia",
              lineHeight: "0.9",
            }}
          >
            {todayInfo.date}
          </Typography>
          <Box
          sx={{
            mt:"6px",
            height: "0",
            width: "85%",
            borderTop: "1px solid #8fb5e4",
            
          }}
        >
        </Box>
      </Box>
      <Typography
        variant="h4"
        sx={{ mt:2,color: colors.textPrimary, fontFamily: "Georgia", fontSize:"1.8rem" }}
      >
        Today's tasks
      </Typography>
      <Typography
        variant="body2"
        sx={{ mt:0.5, color: colors.textSecondary, fontFamily: "Inter", fontSize:"0.8rem" }}
      >
        {dateHeading}
      </Typography>
      <Box
        sx={{
          mt:"2rem", height:"0px",width: "70%", borderTop: "1.5px solid #69696a"}}>
      </Box>
    </div>
  );
}
