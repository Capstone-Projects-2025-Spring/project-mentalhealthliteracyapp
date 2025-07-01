import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import Login from "./Login";
import SignUp from "./SignUp";

function Sidebar() {
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
    <>
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
        <nav>
          <img src={logo}></img>

          <ul>
            <li
              className={useLocation().pathname == "/" ? "active" : "inactive"}
            >
              <Link to="/">Welcome</Link>
            </li>
            <li
              className={
                useLocation().pathname == "/tutorial" ? "active" : "inactive"
              }
            >
              <Link to="/tutorial">Tutorial</Link>
            </li>
            <li
              className={
                useLocation().pathname == "/video" ? "active" : "inactive"
              }
            >
              <Link to="/video">Video</Link>
            </li>
            <li
              className={
                useLocation().pathname == "/resources" ? "active" : "inactive"
              }
            >
              <Link to="/resources">Resources</Link>
            </li>
          </ul>
        </nav>
        <div id="user-actions">
          {/* <Link to="/login" className="signin-btn">
            Sign-in
          </Link>
          <Link to="/signup" className="register-btn">
            Register
          </Link> */}
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
      </aside>
    </>
  );
}

export default Sidebar;
