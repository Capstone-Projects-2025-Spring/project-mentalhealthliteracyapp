import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div id="sidebar">
      <Link to="/">Welcome</Link>
      <Link to="/tutorial">Tutorial</Link>
      <Link to="/video">Video</Link>
    </div>
  );
}

export default Sidebar;
