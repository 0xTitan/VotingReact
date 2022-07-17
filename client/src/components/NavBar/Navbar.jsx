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
          <Link
            to="/VotingReact"
            className="menu-bar"
            onMouseEnter={hideSubNav}
          >
            Home
          </Link>
          <Link
            to="/VotingReact/transferOwner"
            className="menu-bar"
            onMouseEnter={hideSubNav}
          >
            Transfer Owner
          </Link>
          <Link
            to="/VotingReact/workflow"
            className="menu-bar"
            onMouseEnter={hideSubNav}
          >
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
          <Link to="/VotingReact/event/voter" className="menu-bar">
            {" "}
            Voter registration
          </Link>
          <Link to="/VotingReact/event/workflow" className="menu-bar">
            {" "}
            Workflow status
          </Link>
          <Link to="/VotingReact/event/proposal" className="menu-bar">
            {" "}
            Proposal registration
          </Link>

          <Link to="/VotingReact/event/vote" className="menu-bar">
            {" "}
            Vote
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
