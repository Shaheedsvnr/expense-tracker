import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NewTransaction from "./NewTransaction";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Transactions({
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
  const [search, setSearch] = useState("");
  const handleDelete = (data) => {
    console.log(data);
    const remainingTransactions = allTransactions.filter(
      (item) => item.id != data.id
    );
    var updatedAmount;
    if (data?.type == "Expense") {
      updatedAmount = parseFloat(user?.balance) + +data.amount;
    } else {
      updatedAmount = parseFloat(user?.balance) - +data.amount;
    }
    const updatedUser = { ...user, balance: updatedAmount };
    setUser(updatedUser);
    localStorage.setItem("UserTracker", JSON.stringify(updatedUser));
    setAllTransactions(remainingTransactions);
    localStorage.setItem(
      "UserTransactions",
      JSON.stringify(remainingTransactions)
    );
    setOpenSnackBar(true);
    setSnackBarMessage("Transaction deleted successfully");
    setSnackBarSeverity("error");
    setState(!state);
  };
  const filtered =
    search == ""
      ? allTransactions
      : allTransactions.filter((item) =>
          item?.title?.toLowerCase().includes(search?.toLowerCase())
        );

  return (
    <Paper sx={{ p: 4, borderRadius: "20px" }}>
      <Box>
        <Box>
          <Typography sx={{ fontWeight: "600" }}>Transactions</Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <NewTransaction
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
        </Box>
        <Box sx={{ p: 1 }}>
          <TextField
            size="small"
            label={"Search transactions "}
            placeholder="search transaction by name"
            fullWidth
            variant="filled"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Box sx={{ maxHeight: "315px", overflow: "auto" }}>
          {filtered?.length > 0 ? (
            filtered
              ?.slice()
              .reverse()
              .map((item, index) => {
                return (
                  <Box sx={{ p: 1 }} key={index}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontWeight: "600" }} variant="body1">
                          {item?.title}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          textAlign: "end",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            color: item?.type == "Expense" ? "red" : "green",
                          }}
                          variant="body2"
                        >
                          ₹ {item?.amount}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <Typography color="text.secondary" fontSize={"10px"}>
                            {item?.time} {""} {item?.date}
                          </Typography>
                          <Box>
                            <Tooltip
                              arrow
                              placement="right"
                              title="Delete transaction"
                            >
                              <IconButton
                                onClick={() => handleDelete(item)}
                                sx={{ float: "right", width: 10 }}
                                color="error"
                              >
                                <DeleteIcon sx={{ fontSize: "17px" }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                );
              })
          ) : (
            <Box
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="text.secondary">
                No transaction found!
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
