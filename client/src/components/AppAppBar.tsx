import * as React from "react";
import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { getUser, signOut } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { baseUrl, style } from "../utils/globals";
import LeftNavigation from "./LeftNavigtion";
import RightNavigation from "./RightNavigation";
import logo from "../assets/logo.png";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const navigate = useNavigate();
  const { user } = React.useMemo(getUser, [])!;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backdropFilter: "blur(10px)",
        top: 0,
      }}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: style.padding,
          bgcolor:
            theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
          borderBottom: "1px solid",
          borderColor: "divider",
        })}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ width: 30 }} alt="Eksu logo" />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 0.5,
            alignItems: "center",
          }}
        >
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search.."
            sx={{
              p: 0,
              backgroundColor: "divider",
              borderRadius: style.padding,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
            inputProps={{
              sx: { padding: style.padding / 2, width: 150 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: { sm: "", md: "none" } }}>
          <Button
            variant="text"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ minWidth: "30px", p: "4px" }}
          >
            <MenuIcon />
          </Button>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                minWidth: "60dvw",
                p: 2,
                backgroundColor: "background.paper",
                flexGrow: 1,
              }}
            >
              <LeftNavigation />
              <Divider />
              <RightNavigation />
            </Box>
          </Drawer>
        </Box>
      </Box>
    </AppBar>
  );
}

export default AppAppBar;

function SignInSignOut({ ls }: { ls?: boolean }) {
  const user = getUser();

  const handleSignOut = () => {
    signOut();
    window.location.reload();
  };

  if (user) {
    if (ls) {
      return (
        <Button
          color="primary"
          size="small"
          variant="contained"
          component="a"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      );
    }
    return (
      <MenuItem onClick={handleSignOut}>
        <Button color="primary" variant="contained" component="a" sx={{ width: "100%" }}>
          Sign Out
        </Button>
      </MenuItem>
    );
  }
  if (ls) {
    return (
      <>
        <Button
          color="primary"
          variant="text"
          size="small"
          component="a"
          href="/sign-in"
          target="_blank"
        >
          Sign in
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          component="a"
          href="/sign-up/"
          target="_blank"
        >
          Sign up
        </Button>
      </>
    );
  }
  return (
    <>
      <MenuItem>
        <Button
          color="primary"
          variant="outlined"
          component="a"
          href="/sign-in/"
          target="_blank"
          sx={{ width: "100%" }}
        >
          Sign in
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          color="primary"
          variant="contained"
          component="a"
          href="/sign-up/"
          target="_blank"
          sx={{ width: "100%" }}
        >
          Sign up
        </Button>
      </MenuItem>
    </>
  );
}
