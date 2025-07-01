import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function Sidebar() {
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(true);
  return (
    <>
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
                id="nav-welcome"
              className={useLocation().pathname == "/" ? "active" : "inactive"}
            >
              <Link to="/">Welcome</Link>
            </li>
            <li
                id="nav-tutorial"
              className={
                useLocation().pathname == "/tutorial" ? "active" : "inactive"
              }
            >
              <Link to="/tutorial">Tutorial</Link>
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
        <div id="user-actions">
          <Link id="nav-login" to="/login" className="signin-btn">
            Sign-in
          </Link>
          <Link id="nav-signup" to="/signup" className="register-btn">
            Register
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
