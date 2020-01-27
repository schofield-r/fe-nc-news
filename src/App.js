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

class App extends Component {
  state = { user: {}, topicsAdded: false };
  render() {
    const { user, topicsAdded } = this.state;
    return (
      <main className="main">
        <div className="head">
          <Header />

          <NavBar setUser={this.setUser} username={user.username} />
        </div>
        <div className="mainview">
          <TopicsNavBar
            topicsAdded={topicsAdded}
            updateTopics={this.updateTopics}
          />
          >
          <Router>
            <LogInPage
              path="/login"
              username={user.username}
              setUser={this.setUser}
            />
            <Homepage
              path="/"
              username={user.username}
              setUser={this.setUser}
            />
            <Articles path="/articles/topics/:topic" />
            <Articles path="/articles" />
            <MostPopular path="/feature-articles/:feature" />
            <SingleArticle path="/articles/:article_id" user={user.username} />
            <Users path="/users" />
            <UserProfile path="/users/:username" user={user.username} />
            <TopicForm path="/create-topic" updateTopics={this.updateTopics} />
            <NewUser path="/create-new-user" setUser={this.setUser} />
            <NewArticle
              path="/create-new-article"
              username={user.username}
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
  setUser = newUser => {
    this.setState({ user: newUser });
  };
  updateTopics = val => {
    this.setState({ topicsAdded: val });
  };
}

export default App;
