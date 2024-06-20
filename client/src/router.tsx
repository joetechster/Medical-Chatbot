import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { redirect } from "react-router-dom";
import { getUser } from "./utils/auth";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      const user = getUser();
      if (!user) {
        return redirect("/sign-in");
      }
      return null;
    },
  },
  { path: "sign-in", element: <SignIn /> },
  { path: "sign-up", element: <SignUp /> },
  { path: "chat", element: <Chat /> },
]);

export default router;
