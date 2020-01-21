import React from "react";
import { Link } from "@reach/router";

const LogInButton = props => {
  return (
    <section className="loginbutton">
      {props.username !== undefined ? (
        <>
          <p>You are now logged in as {props.username}</p>
          <button onClick={() => props.setUser("")} value="null">
            Log Out
          </button>
        </>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </section>
  );
};

export default LogInButton;
