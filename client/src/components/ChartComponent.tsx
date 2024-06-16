// src/AreaChartComponent.js
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";
import { format } from "date-fns";

const data = [
  { date: "2023-01-01", quantity: 30 },
  { date: "2023-01-02", quantity: 45 },
  { date: "2023-01-03", quantity: 50 },
  { date: "2023-01-04", quantity: 70 },
  { date: "2023-01-05", quantity: 90 },
  { date: "2023-01-06", quantity: 65 },
  { date: "2023-01-07", quantity: 85 },
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return format(date, "MMM d"); // Format date as "Jan 1", "Jan 2", etc.
};

const customTickFormatter = (tick) => {
  return tick !== 0 ? tick : ""; // Return an empty string for tick value 0
};

const AreaChartComponent = () => {
  return (
    <Paper
      sx={(theme) => ({
        p: 1,
        borderRadius: 2,
        background: "none",
        boxShadow: "none",
        borderColor: theme.palette.divider,
        borderStyle: "solid",
        borderWidth: 1,
      })}
    >
      <Typography variant="h6" color="#666">
        SUMMARY
      </Typography>
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={data} margin={{ right: 30, left: -22, bottom: 5 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#888"
            tickLine={false}
            strokeWidth={1 / 2}
          />
          <YAxis
            stroke="#888"
            tickFormatter={customTickFormatter}
            tickLine={false}
            strokeWidth={1 / 2}
          />
          <Tooltip labelFormatter={formatDate} />
          <Area type="monotone" dataKey="quantity" stroke="#8884d8" fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default AreaChartComponent;
