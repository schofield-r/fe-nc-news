import React from "react";
import { Link } from "@reach/router";

const LogInButton = ({user,username, setUser }) => {
  return (
    <section className="loginbutton">
      {username ? (
        <>
          <p>You are now logged in as {user.username}</p>
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
