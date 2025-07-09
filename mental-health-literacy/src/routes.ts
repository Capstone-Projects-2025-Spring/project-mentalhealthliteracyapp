import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/Sidebar.tsx", [
    index("./pages/Welcome.tsx"),
    route("/tutorial", "pages/Tutorial.tsx"),
    route("/video", "pages/Video.tsx"),
    route("resources", "pages/Resources.tsx"),
  ]),
] satisfies RouteConfig;
