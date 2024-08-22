import logo from "./logo.svg";
import "./App.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Account from "./Components/Account";
import Transactions from "./Components/Transactions";
import Charts from "./Components/Charts";
import EditUser from "./Components/EditUser";
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [report, setReport] = useState(null);
  const [state, setState] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("");

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  useEffect(() => {
    if (localStorage.getItem("UserTransactions") == null) {
      localStorage.setItem("UserTransactions", JSON.stringify([]));
    } else {
      let all = JSON.parse(localStorage.getItem("UserTransactions"));
      setAllTransactions(all);
      let dateWiseData = all?.reduce((acc, item) => {
        let date = item?.date;

        if (!acc[date]) {
          acc[date] = { date, income: 0, expenses: 0 };
        }

        if (item.type === "Income") {
          acc[date].income += parseFloat(item.amount);
        } else if (item.type === "Expense") {
          acc[date].expenses += parseFloat(item.amount);
        }

        return acc;
      }, {});

      let result = Object.values(dateWiseData);
      setReport(result);
    }
    if (localStorage.getItem("UserTracker") != null) {
      setUser(JSON.parse(localStorage.getItem("UserTracker")));
    } else {
      setOpen(true);
      setUser(null);
    }
  }, [state]);
  console.log(report);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#282c34", minHeight: "103vh" }}>
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item sm={12} xs={12}>
          <Account data={user} />
          <EditUser
            setOpenSnackBar={setOpenSnackBar}
            setSnackBarMessage={setSnackBarMessage}
            setSnackBarSeverity={setSnackBarSeverity}
            setState={setState}
            state={state}
            open={open}
            setOpen={setOpen}
            setUser={setUser}
            user={user}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Transactions
            setOpenSnackBar={setOpenSnackBar}
            setSnackBarMessage={setSnackBarMessage}
            setSnackBarSeverity={setSnackBarSeverity}
            setState={setState}
            state={state}
            allTransactions={allTransactions}
            setAllTransactions={setAllTransactions}
            setUser={setUser}
            user={user}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Item
            sx={{
              borderRadius: "20px",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography>Income & expense report</Typography>
            </Box>
            <Box
              sx={{
                minHeight: report?.length == 0 ? "170px" : "0px",
                display: report?.length == 0 ? "flex" : "block",
                justifyContent: report?.length == 0 ? "center" : "center",
                alignItems: report?.length == 0 ? "center" : "center",
              }}
            >
              {report && report?.length > 0 ? (
                <Charts report={report} />
              ) : (
                <Typography>No data available</Typography>
              )}
            </Box>
          </Item>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
