import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar() {
  return (
    <div id="sidebar">
      <img src={logo}></img>
      <ul>
        <li className={useLocation().pathname == "/" ? "active" : "inactive"}>
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
          className={useLocation().pathname == "/video" ? "active" : "inactive"}
        >
          <Link to="/video">Video</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
