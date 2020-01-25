import React from "react";
import { Link } from "@reach/router";

const LogInButton = ({ username, setUser }) => {
  return (
    <section className="loginbutton">
      {username !== undefined ? (
        <>
          <p>You are now logged in as {username}</p>
          <button onClick={() => setUser("")} value="null">
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
