import type { JSX } from "react";
import Welcome from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp"
import Tutorial from "./Tutorial";
import Video from "./Video";
import Resources from "./Resources";

export interface RouteDef {
  path: string;
  element: JSX.Element;
}

export const routeList: Array<RouteDef> = [
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/tutorial", element: <Tutorial /> },
  { path: "/video", element: <Video /> },
  { path: "/resources", element: <Resources /> },
];

export const noSidebarList = ["/login", "/register"];
