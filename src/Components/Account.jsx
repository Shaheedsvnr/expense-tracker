import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export default function Account({ data }) {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Box>
          <Typography variant="body2">Account Holder</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "900", fontSize: "20px" }}>
            {data ? data?.name : "..."}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Box>
          <Typography variant="body2">Balance</Typography>
        </Box>
        <Box>
          {data ? (
            <Typography
              sx={{ fontWeight: "900", fontSize: "20px" }}
              color={"green"}
            >
              ₹{data?.balance}
            </Typography>
          ) : (
            "..."
          )}
        </Box>
      </Box>
    </Paper>
  );
}
