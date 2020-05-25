// @flow strict

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link className="navColor" to="/home">Home</Link>
        <Link className="navColor" to="/about">About</Link>
        <Link className="navColor" to="/meme">Meme Generator</Link>
        <Link className="navColor" to="/">Login</Link>
        <Link className="navColor" onClick={() => {
        localStorage.setItem("auth", null)
        localStorage.setItem("name", null)
        localStorage.setItem("username", null)
          }} to="/">Logout</Link>
      </div>
    );
  }
}

export default Nav;
