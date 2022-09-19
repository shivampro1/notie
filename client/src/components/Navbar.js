import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Home from "./Home";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  // const login () =>{
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  // }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Notie
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("auth-token") ? (
              <>
                {" "}
                <Link role="button" className="btn btn-primary mx-1" to="/login">
                  Login
                </Link>
                <Link role="button" className="btn btn-primary mx-1" to="/signup">
                  Sign up
                </Link>{" "}
              </>
            ) : (
              <Link role="button" onClick={handleLogout} className="btn btn-primary mx-1" to="/login">
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
