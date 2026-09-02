import type { ReminderFunc } from "./todoTypes";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Box,
  Switch,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  DialogActions,
} from "@mui/material";
import { colors } from "./colors";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ReminderSettings(props: ReminderFunc) {
  const [open, setOpen] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("19:00");
  const [reminderType, setReminderType] = useState("unfinished");

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);
  function handleSave() {
    setOpen(false);
    props.reminderSet(notificationsEnabled, reminderTime, reminderType);
  }
  async function enableNotifications() {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications.");
      setNotificationsEnabled(false);
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.error("This browser does not support service workers.");
      setNotificationsEnabled(false);
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        console.log("Notification permission was not granted.");
        setNotificationsEnabled(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      await registration.showNotification("Today's Tasks", {
        body: "Notifications are working!",
      });

      setNotificationsEnabled(true);
    } catch (error) {
      console.error("Could not show the notification:", error);
      setNotificationsEnabled(false);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",

        display: "flex",

        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mr: { xs: "10rem", sm: "35rem" },
        }}
      >
        <IconButton
          onClick={handleOpen}
          sx={{
            mr: 2,
          }}
        >
          <AccessAlarmsIcon sx={{ color: colors.textSecondary }} />
        </IconButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              border: `1px solid ${colors.textSecondary}`,
              backgroundColor: "#1f1f25",
              boxShadow: "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.settingsBack,
            color: colors.textPrimary,
            fontFamily: "Georgia",
            borderBottom: "0 !important",
            boxShadow: "none",
          }}
        >
          Reminders{" "}
          <IconButton
            onClick={handleClose}
            aria-label="Close reminders"
            size="small"
            sx={{ color: colors.textSecondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: colors.settingsBack,
            color: colors.textPrimary,
            minWidth: { xs: "270px", sm: "380px" },
          }}
        >
          <Typography
            sx={{
              color: colors.textSecondary,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              mb: 1,
              mt: 1,
              fontFamily: "Inter",
            }}
          >
            Notifications
          </Typography>

          <Box
            sx={{
              border: "1px solid #3b3b45",
              borderRadius: "12px",
              px: 1.8,
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              backgroundColor: colors.background,
            }}
          >
            <Typography
              sx={{
                color: colors.textPrimary,
                fontSize: "1rem",
                fontFamily: "Inter",
              }}
            >
              Enable notifications
            </Typography>

            <Switch
              checked={notificationsEnabled}
              onChange={async (e) => {
                if (e.target.checked) {
                  await enableNotifications();
                } else {
                  setNotificationsEnabled(false);
                }
              }}
            />
          </Box>

          <Typography
            sx={{
              color: colors.textSecondary,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              mb: 1,
              fontFamily: "Inter",
            }}
          >
            Daily reminder
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={dayjs(`2026-01-01T${reminderTime}`)}
              onChange={(newValue) => {
                if (newValue) {
                  setReminderTime(newValue.format("HH:mm"));
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    backgroundColor: colors.background,
                    borderRadius: "12px",
                    mb: 2,

                    "& .MuiPickersInputBase-root": {
                      backgroundColor: colors.background,
                      borderRadius: "12px",
                      color: colors.textPrimary,
                    },

                    "& .MuiPickersOutlinedInput-notchedOutline": {
                      borderColor: "#3b3b45",
                    },

                    "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                      borderColor: colors.mainPrimary,
                    },

                    "& .Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                      borderColor: colors.mainPrimary,
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>

          <Typography
            sx={{
              color: colors.textSecondary,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              mb: 0.5,
              fontFamily: "Inter",
            }}
          >
            Remind me when:
          </Typography>

          <RadioGroup
            value={reminderType}
            onChange={(e) => setReminderType(e.target.value)}
          >
            <FormControlLabel
              value="unfinished"
              control={<Radio />}
              label="Tasks are unfinished"
              sx={{
                fontFamily: "Inter",
                color: colors.textPrimary,
              }}
            />

            <FormControlLabel
              value="daily"
              control={<Radio />}
              label="Every day"
              sx={{
                fontFamily: "Inter",
                color: colors.textPrimary,
              }}
            />
          </RadioGroup>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: colors.settingsBack,
            display: "flex",
            justifyContent: "center",

            px: 2,
          }}
        >
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              width: "100%",
              mr: "0.5rem",
              ml: "0.5rem",
              backgroundColor: colors.mainPrimary,
              color: "black",
              borderRadius: "8px",
              fontFamily: "Inter",

              "&:hover": {
                backgroundColor: colors.check,
              },
              mb: "1rem",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
