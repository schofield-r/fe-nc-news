import { Link } from "@reach/router";
import LogInButton from "./LogInButton";
import React from "react";

const NavBar =({setUser,username}) => {
  return (
    <div className="topnav">
      <LogInButton
        setUser={setUser}
        username={username}
        className="login"
      />
      <Link to="/">Home</Link>/<Link to="/articles">All Articles</Link>
      <Link to="/users">Users</Link>
      <Link to="/feature-articles/most-popular">Most Popular</Link>
      <Link to="/create-new-article"> Post Article </Link>{" "}
    </div>
  );
};

export default NavBar;
