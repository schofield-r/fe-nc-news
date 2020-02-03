import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import Homepage from "./components/Homepage";
import SingleArticle from "./components/SingleArticle";
import MostPopular from "./components/MostPopular";
import ErrorMessages from "./components/ErrorMessages";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import TopicForm from "./components/TopicForm";
import NewUser from "./components/NewUser";
import LogInPage from "./components/LogInPage";
import NewArticle from "./components/NewArticle";
import TopicsNavBar from "./components/TopicsNavBar";
import * as api from "./components/Api";

class App extends Component {
  state = { user: {}, username: "", topicsAdded: false };
  render() {
    const { user, username, topicsAdded } = this.state;
    return (
      <main className="main">
        <div className="head">
          <Header />

          <NavBar setUser={this.setUser} username={username} user={user} />
        </div>
        <div className="mainview">
          <TopicsNavBar
            topicsAdded={topicsAdded}
            updateTopics={this.updateTopics}
          />

          <Router>
            <LogInPage
              path="/login"
              user={user}
              username={username}
              setUser={this.setUser}
            />
            <Homepage
              path="/"
              user={user}
              username={username}
              setUser={this.setUser}
            />
            <Articles path="/articles/topics/:topic" />
            <Articles path="/articles" />
            <MostPopular path="/feature-articles/:feature" />
            <SingleArticle path="/articles/:article_id" user={user} />
            <Users path="/users" />
            <UserProfile
              path="/users/:username"
            />
            <TopicForm path="/create-topic" updateTopics={this.updateTopics} />
            <NewUser path="/create-new-user" setUser={this.setUser} />
            <NewArticle
              path="/create-new-article"
              user={user}
              username={username}
              setUser={this.setUser}
            />
            <ErrorMessages
              default
              path="/"
              err={{ msg: "not found", status: 404 }}
            />
          </Router>
        </div>
      </main>
    );
  }
  componentDidMount() {
      this.setState({ username: localStorage.currentUser });
      this.setUser(localStorage.currentUser);
  }
  setUser = username => {
    if (!username) {
      localStorage.removeItem("currentUser");
      this.setState({ username: "", user: {} });
    } else
      api.getUser(username).then(user => {
        this.setState({ user: user, username: user.username });
        localStorage.setItem("currentUser", user.username);
      });
  };
  updateTopics = val => {
    this.setState({ topicsAdded: val });
  };
}

export default App;
