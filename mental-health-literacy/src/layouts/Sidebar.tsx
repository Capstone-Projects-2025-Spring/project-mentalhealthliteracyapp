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
import { useDispatch } from "react-redux";
import { reset_error } from "src/context/features/user/userSlice";

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
  const dispatch = useDispatch();
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(true);

  const loginRef = useRef<HTMLDialogElement>(null);
  const registerRef = useRef<HTMLDialogElement>(null);

  const Close = function (type: string) {
    switch (type) {
      case "Login":
        loginRef.current?.close();
        break;
      case "Signup":
        registerRef.current?.close();
        break;
    }
  };

  const SwitchTo = function (type: string) {
    Close(type);
    switch (type) {
      case "Login":
        registerRef.current?.close();
        loginRef.current?.showModal();
        break;
      case "Signup":
        loginRef.current?.close();
        registerRef.current?.showModal();
        break;
    }
  };

  return (
    <div id="root" suppressHydrationWarning={true}>
      <dialog ref={loginRef} className="dialog dialog-centered">
        <Login
          close={() => {
            Close("Login");
          }}
          switch={() => SwitchTo("Signup")}
        />
      </dialog>

      <dialog ref={registerRef} className="dialog dialog-centered">
        <SignUp
          close={() => {
            Close("Signup");
          }}
          switch={() => {
            SwitchTo("Login");
          }}
        />
      </dialog>

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
                      loginRef.current?.showModal();
                    }}
                  >
                    Sign-in
                  </button>
                  <button
                    className="register-btn"
                    onClick={() => {
                      registerRef.current?.showModal();
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
