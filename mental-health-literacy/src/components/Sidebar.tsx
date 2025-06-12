import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
