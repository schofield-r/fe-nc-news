import React from "react";
import MostPopular from "./MostPopular";
import LogInPage from "./LogInPage";

const Homepage = ({user,setUser,username}) => {
  return (
    <main className="mainviewhome">
      <LogInPage
        className="login"
        username={username} 
        user={user}
        setUser={setUser}
      />
      <MostPopular className="articleslist" />
    </main>
  );
};

export default Homepage;
