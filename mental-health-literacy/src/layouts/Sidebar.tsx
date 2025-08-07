import { Link, Outlet, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

import style from "./Sidebar.css?url";
import ProfileSidebar from "src/components/ProfileSidebar";
import useClient from "utils/useClient";
import useUser from "utils/useUser";
import ResetPassword from "src/components/ResetPassword";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: style,
    },
  ];
}

function Sidebar() {
  const userEmail = useUser();
  const isClient = useClient();
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(true);
  /**
   * Sets which dialog is active
   * @param index -
   *
   *
   * 0 - Login
   *
   * 1 - Signup
   *
   * 2 - Reset Password
   *
   *
   */
  function setDialogIndex(index: number) {
    let newArray = new Array(dialogList.length).fill(0);
    newArray[index] = 1;
    setDialogState(newArray);
  }
  /**Closes all dialogs */
  function closeAllDialogs() {
    let newArray = new Array(dialogList.length).fill(0);
    setDialogState(newArray);
  }

  const dialogList = [
    <Login
      key={"login"}
      openSignUp={() => setDialogIndex(1)}
      openResetPassword={() => setDialogIndex(2)}
      close={closeAllDialogs}
    />,
    <SignUp
      key={"signup"}
      openLogin={() => setDialogIndex(0)}
      close={closeAllDialogs}
    />,
    <ResetPassword
      key={"reset-password"}
      openLogin={() => setDialogIndex(0)}
      close={closeAllDialogs}
    />,
  ];
  const [dialogState, setDialogState] = useState(
    new Array(dialogList.length).fill(0)
  );

  const activeDialog = dialogList.filter((val, index) => {
    if (dialogState[index] == 1) return val;
  });
  return (
    <div id="root" suppressHydrationWarning={true}>
      {activeDialog}

      <div id="menu-toggle">
        <button
          type="button"
          className="resize-button"
          onClick={() => setSidebarStatus(!sidebarStatus)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <aside id="sidebar" className={sidebarStatus ? "hidden" : "shown"}>
        <div className="sidebar-container">
          <nav>
            <img src={logo}></img>

            <ul>
              <li
                id="nav-welcome"
                className={
                  useLocation().pathname == "/" ? "active" : "inactive"
                }
              >
                <Link to="/">Welcome</Link>
              </li>
              <li
                id="nav-video"
                className={
                  useLocation().pathname == "/video" ? "active" : "inactive"
                }
              >
                <Link to="/video">Video</Link>
              </li>
              <li
                id="nav-resources"
                className={
                  useLocation().pathname == "/resources" ? "active" : "inactive"
                }
              >
                <Link to="/resources">Resources</Link>
              </li>
            </ul>
          </nav>

          <>
            {userEmail && isClient ? (
              <>
                <ProfileSidebar />
              </>
            ) : (
              <>
                <div id="user-actions">
                  <button
                    className="signin-btn"
                    onClick={() => {
                      setDialogIndex(0);
                    }}
                  >
                    Sign-in
                  </button>
                  <button
                    className="register-btn"
                    onClick={() => {
                      setDialogIndex(1);
                    }}
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </>
        </div>
      </aside>

      <Outlet />
    </div>
  );
}

export default Sidebar;
