import type { JSX } from "react";
import Welcome from "./Welcome";
import Tutorial from "./Tutorial";
import Video from "./Video";
import Resources from "./Resources";

export interface RouteDef {
  path: string;
  element: JSX.Element;
}

export const routeList: Array<RouteDef> = [
  { path: "/", element: <Welcome /> },
  { path: "/tutorial", element: <Tutorial /> },
  { path: "/video", element: <Video /> },
  { path: "/resources", element: <Resources /> },
];

export const noSidebarList: Array<string> = [];
