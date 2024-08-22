import { Box, Button } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function NewTransaction({
  setOpenSnackBar,
  setSnackBarMessage,
  setSnackBarSeverity,
  setState,
  state,
  allTransactions,
  setAllTransactions,
  setUser,
  user,
}) {
  //   console.log(allTransactions);
  //   const [value, setValue] = React.useState(allTransactions);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    title: "",
    amount: "",
  });
  const [formError, setFormError] = React.useState({
    title: null,
    amount: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormInfo({
      title: "",
      amount: "",
    });
    setFormError({ title: null, amount: null });
    setOpen(false);
  };
  //   console.log(allTransactions);
  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (formInfo?.title == "") {
      setFormError({
        ...formError,
        title: "Please provide a title for your transaction!",
      });
    } else if (formInfo?.amount == "") {
      setFormError({
        ...formError,
        amount: "Please provide a amount for your transaction!",
      });
    } else if (formInfo?.amount < 0) {
      setFormError({
        ...formError,
        amount: "Please provide a valid amount for your transaction!",
      });
    } else {
      const newId =
        allTransactions.length == 0
          ? 1
          : allTransactions[allTransactions.length - 1].id + 1;
      const fullData = {
        id: newId,
        ...formInfo,
        type,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      var updatedAmount;
      if (type == "Expense") {
        updatedAmount = parseFloat(user?.balance) - +fullData.amount;
      } else {
        updatedAmount = parseFloat(user?.balance) + +fullData.amount;
      }
      const updatedUser = { ...user, balance: updatedAmount };
      setUser(updatedUser);
      const updatedTransaction = [...allTransactions, fullData];
      setAllTransactions(updatedTransaction);
      localStorage.setItem("UserTracker", JSON.stringify(updatedUser));
      localStorage.setItem(
        "UserTransactions",
        JSON.stringify(updatedTransaction)
      );
      setOpenSnackBar(true);
      setSnackBarMessage("New transaction recorded successfully");
      setSnackBarSeverity("success");
      setState(!state);
      handleClose();
    }
  };
  return (
    <Box>
      <Button onClick={handleClickOpen} fullWidth>
        New Transaction
      </Button>
      <Dialog fullWidth open={open} onSubmit={handleSubmit}>
        <DialogTitle>Enter new transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Submit Transaction information like amount and title of transaction
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e) => {
              setFormError({ ...formError, [e.target.name]: null });
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
            }}
            value={formInfo?.title}
            helperText={formError?.title && formError?.title}
            error={!!formError?.title}
            name="title"
            label="Enter title for transaction"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e) => {
              setFormError({ ...formError, [e.target.name]: null });
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
            }}
            value={formInfo?.amount}
            helperText={formError?.amount && formError?.amount}
            error={!!formError?.amount}
            name="amount"
            label="Enter amount of transaction"
            fullWidth
            type="number"
            sx={{ mt: 1 }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, "Income")}
            type="submit"
            color="success"
          >
            Income
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, "Expense")}
            type="submit"
            color="error"
          >
            Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
