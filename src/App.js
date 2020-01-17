import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import Homepage from "./components/Homepage";
import SingleArticle from "./components/SingleArticle";
import MostPopular from './components/MostPopular'
import ErrorMessages from "./components/ErrorMessages";
import Users from "./components/Users";
import UserProfile from './components/UserProfile'
import TopicForm from "./components/TopicForm";
import NewUser from './components/NewUser'
import LogInPage from "./components/LogInPage";

class App extends Component{
  state = { user: {} };
  render() {
    return (
      <main className="App">
        <Header />
        <NavBar setUser={this.setUser} username={this.state.user.username} />
        <Router>
          <LogInPage path='/login' username={this.state.user.username} setUser={this.setUser}/>
          <Homepage path="/"  />
          <Articles path="/articles/topics/:topic" />
          <Articles path="/articles" />
          <MostPopular path='/articles/:feature'/>
          <SingleArticle path="/articles/:article_id" user={this.state.user.username} />
          <Users path='/users'/>
          <UserProfile path='/users/:username'/>
          <TopicForm path='/create-topic'/>
          <NewUser path='/create-new-user'/>

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
