import * as React from "react";
import { Paper } from "@mui/material";

export default function Wrapper(props) {
  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        p: 1,
        borderRadius: 2,
        background: "none",
        boxShadow: "none",
        borderColor: theme.palette.divider,
        borderStyle: "solid",
        borderWidth: 1,
        height: "100%",
      })}
    >
      {props.children}
    </Paper>
  );
}
