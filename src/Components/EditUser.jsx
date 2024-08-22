import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
export default function EditUser({
  open,
  setOpen,
  setOpenSnackBar,
  setSnackBarMessage,
  setSnackBarSeverity,
  state,
  setState,
  setUser,
  user,
}) {
  const [formInfo, setFormInfo] = useState({ name: "", balance: "" });
  useEffect(() => {
    if (user) {
      setFormInfo({ name: user.name, balance: user.balance });
    } else {
      setFormInfo({ name: "", balance: "" });
    }
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (user) {
      setOpen(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formInfo);
    localStorage.setItem("UserTracker", JSON.stringify(formInfo));
    setState(!state);
    setOpenSnackBar(true);
    setSnackBarMessage("Profile updated");
    setSnackBarSeverity("success");
    setOpen(false);
  };
  return (
    <Box>
      <Box sx={{ px: 2 }}>
        <Tooltip arrow placement="top" title="Edit">
          <IconButton
            onClick={handleClickOpen}
            sx={{ float: "right", color: "white" }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        component={"form"}
        onSubmit={handleSubmit}
        fullWidth
      >
        <DialogTitle>{user ? "Edit" : "Fill"} User Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {user ? "Edit" : "Fill"} user information like user name & opening
            balance
          </DialogContentText>
          <TextField
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
            autoFocus
            required
            name="name"
            value={formInfo?.name}
            label="Enter your name"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
            required
            name="balance"
            value={formInfo?.balance}
            label="Enter opening balance"
            type="number"
            fullWidth
            variant="standard"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
