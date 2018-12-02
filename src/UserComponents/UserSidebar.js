import React from "react";
import "./UserSidebar.css";
import { Link } from "react-router-dom";

function UserSidebar() {
  return (
    <div className="row">
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky" style={{ marginTop: 2 }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                <span data-feather="home" />
                My Rentals <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                <span data-feather="file" />
                My Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                <span data-feather="file" />
                My Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default UserSidebar;
