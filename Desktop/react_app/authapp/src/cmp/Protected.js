// @flow strict

import React from "react";
import { Redirect } from "react-router-dom";

function Protected(props) {
  const Cmp = props.Cmp;
  if(JSON.parse(localStorage.getItem("auth")) != null && 
  JSON.parse(localStorage.getItem("auth")) !== undefined){
  var auth = JSON.stringify(localStorage.getItem("auth"));
  }else{
      auth = null;
  }
  return <div>{auth ? <Cmp /> : <Redirect to="login"></Redirect>}</div>;
}

export default Protected;
