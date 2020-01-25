import React from "react";
import MostPopular from "./MostPopular";
import LogInPage from "./LogInPage";

const Homepage = ({username,setUser}) => {
  return (
    <main className="mainviewhome">
      <LogInPage
        className="login"
        username={username}
        setUser={setUser}
      />
      <MostPopular className="articleslist" />
    </main>
  );
};

export default Homepage;
