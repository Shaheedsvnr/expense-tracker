import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";

export default function ChartBar({ report }) {
  const dates = report?.map((item) => item.date) || [];
  const incomeData = report?.map((item) => item.income) || [];
  const expenseData = report?.map((item) => item.expenses) || [];

  //   console.log("Dates:", dates);
  //   console.log("Income Data:", incomeData);
  //   console.log("Expense Data:", expenseData);

  return (
    <Box sx={{ p: 5 }}>
      <BarChart
        borderRadius={20}
        series={[
          { data: incomeData, label: "Income" },
          { data: expenseData, label: "Expenses" },
        ]}
        slotProps={{
          legend: { hidden: true },
        }}
        height={350}
        xAxis={[{ data: dates, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </Box>
  );
}
