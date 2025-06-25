import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { noSidebarList } from "./Pages";

function MainLayout() {
  return (
    <>
      {!noSidebarList.includes(useLocation().pathname) && <Sidebar />}
      <Outlet />
    </>
  );
}

export default MainLayout;
