import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Link,
} from "@mui/material";
import Layout from "./Layout";
import logo from "../assets/MYHEALTHBOT.png";
import { Send } from "@mui/icons-material";
import Answer from "../components/Answer";
import { baseUrl } from "../utils/globals";
import { getUser } from "../utils/auth";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<{ q: string; a: string }[]>([]);
  const { user } = getUser()!;
  const handleSubmit = async () => {
    const q = question;
    setQuestion("");
    setLoading(true);
    const context = items.reduce((prev, curr) => `${prev} ${curr.q}`, "");
    const res = await fetch(`${baseUrl}chat/`, {
      method: "POST",
      body: JSON.stringify({ question: q, context }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const answer = await res.json();
    setItems(items.concat({ q: question, a: answer }));
    setLoading(false);
  };
  return (
    <Layout mode={"light"}>
      <Box
        position="fixed"
        display="grid"
        gridTemplateRows="auto 1fr"
        sx={{
          inset: 0,
          px: { xs: 2, md: 5 },
          overflow: "auto",
        }}
      >
        <Box sx={{ position: "sticky", top: 0, background: "#fff" }}>
          <img
            src={logo}
            alt="MYHEALTHBOT"
            style={{
              display: "block",
              marginLeft: "auto",
              marginTop: "10px",
              height: "25px",
            }}
          />
        </Box>
        <Box maxWidth="md" sx={{ m: "auto", px: { xs: 1, sm: 3, md: 5 }, pb: 2, width: "100%" }}>
          <Typography>
            Welcome {user.first_name} {user.last_name}
            <br />
            What symptoms are you feeling now?
          </Typography>
          {items.map((item, i) => (
            <>
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 10,
                  background: "#f2f2f2",
                  width: "fit-content",
                  ml: "auto",
                  mt: 4,
                  mb: 1,
                }}
              >
                <Typography>{item.q}</Typography>
              </Box>
              <Answer text={item.a} />
            </>
          ))}
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Link href="https://wa.me/+2348104322910" underline="hover" variant="button">
            Contact a certified doctor for more drug recommendation and to book an appointment
          </Link>
        </Box>
        <Box display="grid" sx={{ position: "sticky", bottom: 0 }}>
          <Container maxWidth="md" sx={{ mt: "auto", mb: 1, p: 0 }}>
            {items.length < 1 && (
              <Typography variant="body1" gutterBottom>
                Ask me anything and I'll do my best to help you!
              </Typography>
            )}
            <Paper elevation={3} sx={{ borderRadius: 10 }}>
              <TextField
                id="prompt-input"
                placeholder="Your prompt..."
                fullWidth
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{
                  pl: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                  "& .MuiInputBase-input": {
                    outline: "none",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="primary" onClick={handleSubmit}>
                        {loading ? <CircularProgress size={28} /> : <Send />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
};

export default Chat;
