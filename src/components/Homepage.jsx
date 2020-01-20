import React from "react";
import MostPopular from "./MostPopular";
import LogInPage from "./LogInPage";

const Homepage = () => {
  return (
    <main className="leftcolumn">
      <p>Hello!! homepage</p>
      <LogInPage className="login" />
      <MostPopular className="articleslist" />
    </main>
  );
};

export default Homepage;
