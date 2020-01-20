import React from "react";
import MostPopular from "./MostPopular";
import LogInPage from "./LogInPage";

const Homepage = (props) => {
  return (
    <main className="leftcolumn">
      <p>Hello!! homepage</p>
      <LogInPage
        className="login"
        username={props.username}
        setUser={props.setUser}
      />
      <MostPopular className="articleslist" />
    </main>
  );
};

export default Homepage;
