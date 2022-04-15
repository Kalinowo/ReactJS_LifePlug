import React from "react";
import { GlobalContext } from "../../Context/GlobalState";
import { Navbar, Nav } from "react-bootstrap";
import Moon from "../../pic/material/pic_moon.svg";
import Sun from "../../pic/material/pic_sun.svg";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";

export default function Navbar_Template(props) {
  const { theme, switchTheme } = React.useContext(GlobalContext);
  let navigate = useNavigate();
  let location = useLocation();
  let { currentUser, setCurrentUser } = props;

  React.useEffect(() => {
    if (!currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <>
      <Navbar expand="md" data-theme={theme}>
        <Link to="/LifePlug">
          <Navbar.Brand>LifePlug</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-awesome fas fa-bars"></span>
          <span className="navbar-toggler-awesome fas fa-times"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/LifePlug"
              style={
                location.pathname === "/LifePlug"
                  ? {
                      color: "#a3ffa0",
                      filter: "drop-shadow(1px 2px 1px black)",
                    }
                  : {}
              }
            >
              Home
            </Link>
            <Link
              to="/LifePlug/watchHistory"
              style={
                location.pathname === "/LifePlug/watchHistory"
                  ? {
                      color: "#a3ffa0",
                      filter: "drop-shadow(1px 2px 1px black)",
                    }
                  : {}
              }
            >
              觀看紀錄
            </Link>
            <Link
              to="/LifePlug/profile"
              style={
                location.pathname === "/LifePlug/profile"
                  ? {
                      color: "#a3ffa0",
                      filter: "drop-shadow(1px 2px 1px black)",
                    }
                  : {}
              }
            >
              profile
            </Link>
            <div className="navbar-hover start-home"></div>
            <div className="navRight">
              <Nav.Link onClick={logout}>登出</Nav.Link>
              <label className="themeSwitch">
                <input
                  type="checkbox"
                  data-theme={theme}
                  onClick={() => switchTheme()}
                />
                <span>
                  <img src={Sun} alt="moon" />
                  <img src={Moon} alt="moon" />
                </span>
              </label>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}
