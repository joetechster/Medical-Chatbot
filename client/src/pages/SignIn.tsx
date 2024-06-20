import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInUser, User } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/globals";
import Layout from "./Layout";
import bg from "../assets/bg.png";
import logo from "../assets/MYHEALTHBOT.png";
import { Apple, FacebookOutlined, Google } from "@mui/icons-material";
import { Divider } from "@mui/material";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await fetch(`${baseUrl}sign-in/`, { method: "POST", body: data });
    const credentials: { token: string; user: User } = await res.json();
    await signInUser(credentials.user, credentials.token);
    navigate("/");
  };

  return (
    <Layout>
      <Box display="flex" position="fixed" sx={{ inset: 0 }}>
        <Box
          flexBasis="50%"
          flexShrink={10}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundPositionX: "60%",
            backgroundSize: "cover",
            display: { xs: "none", md: "initial" },
          }}
        />
        <Box overflow="auto" flexBasis={{ xs: "100%", md: "50%" }}>
          <img
            src={logo}
            alt="MYHEALTHBOT"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "10px",
              marginTop: "10px",
              height: "25px",
            }}
          />
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                mt: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4" textAlign="center" marginX={2}>
                Empowering you to make informed health decisions
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <Box display="grid" gap="10px">
                  <Button startIcon={<Google />} variant="outlined" fullWidth size="large">
                    Continue with Google
                  </Button>
                  <Button
                    startIcon={<FacebookOutlined />}
                    variant="outlined"
                    fullWidth
                    size="large"
                  >
                    Continue with Facebook
                  </Button>
                  <Button startIcon={<Apple />} variant="outlined" fullWidth size="large">
                    Continue with Apple
                  </Button>
                </Box>
                <Divider sx={{ mt: 3, mb: 2 }}>
                  <Typography>Or</Typography>
                </Divider>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="username"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({ typography: { fontFamily: "Inter" } });
