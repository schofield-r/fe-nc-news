import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import Homepage from "./components/Homepage";
import SingleArticle from "./components/SingleArticle";
import ErrorMessages from "./components/ErrorMessages";

class App extends Component{
  state = { user: {} };
  render() {
    return (
      <main className="App">
        <Header />
        <NavBar setUser={this.setUser} username={this.state.user.username} />
        <Router>
          <Homepage path="/"  />
          <Articles path="/articles/topics/:topic" />
          <Articles path="/articles" />
          <SingleArticle path="/articles/:article_id" user={this.state.user.username} />
          <ErrorMessages
            default
            path="/"
            err={{ msg: "somethings wrong...", status: 500 }}
          />
        </Router>
      </main>
    );
  }
  setUser = newUser => {
  
    this.setState({ user: newUser });
  };
}

export default App;
