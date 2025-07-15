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
    route("/cbt", "pages/CBT.tsx"),
    route("/group-therapy", "pages/GroupTherapy.tsx"),
    route("/yoga", "pages/Yoga.tsx"),
    route("/animal-therapy", "pages/AnimalTherapy.tsx"),
    route("/art-therapy", "pages/ArtTherapy.tsx"),
  ]),
] satisfies RouteConfig;
