import { Box } from "@mui/material";
import React from "react";
import ChartBar from "./ChartBar";

export default function Charts({ report }) {
  return (
    <Box sx={{ p: 1 }}>
      <ChartBar report={report} />
    </Box>
  );
}
