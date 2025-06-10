import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <div id="topbar">
      <button>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h1>Mental Health Literacy</h1>
      <button>
        <Link to="login">Login</Link>
      </button>
      <button>Sign up</button>
    </div>
  );
}

export default Topbar;
