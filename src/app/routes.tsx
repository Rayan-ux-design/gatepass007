import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { CreatePass } from "./components/CreatePass";
import { PassList } from "./components/PassList";
import { PassDetails } from "./components/PassDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "signup", Component: Signup },
      { path: "dashboard", Component: Dashboard },
      { path: "create-pass", Component: CreatePass },
      { path: "passes", Component: PassList },
      { path: "pass/:id", Component: PassDetails },
    ],
  },
]);
