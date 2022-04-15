import React from "react";
import { Link } from "react-router-dom";
import Login from "./LoginPage";

export default function Authentication(props) {
  let { redirect } = props;

  return (
    <React.Fragment>
      <Login redirect={redirect} />
    </React.Fragment>
  );
}
