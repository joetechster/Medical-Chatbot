import * as React from "react";
import { Box, PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../utils/getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";

export default function Layout(props) {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const LPtheme = createTheme(getLPTheme(props.mode || mode));

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
