import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navi.scss";
import Profiles from '../../containers/Profiles/Profiles';

class Navi extends React.Component {
  render() {
    return (
        <div className="topnav">
            <NavLink to="/">Logo</NavLink>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <div>
              <Profiles/>
            </div>
        </div>
    );
  }
}

export default Navi;
