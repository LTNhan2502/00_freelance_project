import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.scss";
import Profiles from '../../containers/Profiles/Profiles';

class Nav extends React.Component {
  render() {
    return (
        <div className="topnav">
            <NavLink to="/">Logo</NavLink>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            {/* <Profiles/> */}
        </div>
    );
  }
}

export default Nav;
