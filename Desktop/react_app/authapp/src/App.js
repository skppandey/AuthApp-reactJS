import React,{useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./cmp/Home";
import About from "./cmp/About";
import Meme from "./cmp/Meme";
import Auth from "./cmp/Auth";
import Protected from "./cmp/Protected";
import Nav from "./cmp/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  useEffect(() => {
    document.title = "skpApp";
    document.body.classList.add('body');
    // document.body.classList.remove('body');
 }, []);
  return (
    <div className="App">
      {/* <Protected /> */}
      <Router>
        <Nav />
        <Switch>
          <Route path="/about">
          <Protected Cmp={About} />
            {/* <About /> */}
          </Route>
          <Route path="/home">
            {/* <Home /> */}
            <Protected Cmp={Home} />
          </Route>
          <Route path="/meme">
            {/* <Home /> */}
            <Protected Cmp={Meme} />
          </Route>
          <Route path="/">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
