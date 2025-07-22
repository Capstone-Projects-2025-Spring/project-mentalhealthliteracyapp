import {
  index,
  layout,
  route,
  prefix,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/Sidebar.tsx", [
    index("./pages/Welcome.tsx"),
    route("/tutorial", "pages/Tutorial.tsx"),
    route("/video", "pages/Video.tsx"),
    route("/profile", "pages/Profile.tsx"),
    ...prefix("/resources", [
      index("pages/Resources.tsx"),
      route("cbt", "pages/CBT.tsx"),
      route("group-therapy", "pages/GroupTherapy.tsx"),
      route("yoga", "pages/Yoga.tsx"),
    ]),
  ]),
  ...prefix("/api", [
    route("/login", "api/login.tsx"),
    route("/register", "api/register.tsx"),
    route("/signout", "api/signout.tsx"),
  ]),
] satisfies RouteConfig;
