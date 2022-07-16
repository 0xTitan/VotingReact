import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [displaySubNav, setDisplaySubNav] = useState(false);

  const showSubNav = () => {
    setDisplaySubNav(true);
  };

  const hideSubNav = () => {
    setDisplaySubNav(false);
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-menu">
          <Link to="/" className="menu-bar" onMouseEnter={hideSubNav}>
            Home
          </Link>
          <Link to="/workflow" className="menu-bar" onMouseEnter={hideSubNav}>
            Workflow
          </Link>
          <Link to="#" className="menu-bar-events" onMouseEnter={showSubNav}>
            Events
          </Link>
        </div>
        <div
          className="subnav-content"
          style={{ visibility: displaySubNav ? "visible" : "hidden" }}
        >
          <Link to="/event/voter" className="menu-bar">
            {" "}
            Voter registration
          </Link>
          <Link to="/event/workflow" className="menu-bar">
            {" "}
            Workflow status
          </Link>
          <Link to="/event/proposal" className="menu-bar">
            {" "}
            Proposal registration
          </Link>

          <Link to="/event/vote" className="menu-bar">
            {" "}
            Vote
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
