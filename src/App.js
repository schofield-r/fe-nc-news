import React, { Component } from "react";
// import "./App.css";
import './minimalist.css'
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Router } from "@reach/router";
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

class App extends Component {
  state = { user: {}, topicsAdded: false ,topic:''};
  render() {
    return (
      <main className='main' >
        <div >
        <Header />
        
        <NavBar
          setUser={this.setUser}
          username={this.state.user.username}
          topicsAdded={this.state.topicsAdded}
          updateTopics={this.updateTopics}
          /></div><div className='leftcolumn'>
        <Router >
          <LogInPage
            path="/login"
            username={this.state.user.username}
            setUser={this.setUser}
          />
          <Homepage path="/" />
          <Articles path="/articles/topics/:topic" setTopic={this.setTopic}/>
          <Articles path="/articles"  />
          <MostPopular path="/feature-articles/:feature" />
          <SingleArticle
            path="/articles/:article_id"
            user={this.state.user.username}
          />
          <Users path="/users" />
          <UserProfile
            path="/users/:username"
            user={this.state.user.username}
          />
          <TopicForm path="/create-topic" updateTopics={this.updateTopics} />
          <NewUser path="/create-new-user" setUser={this.setUser} />
          <NewArticle path='/create-new-article' topic={this.state.topic} username={this.state.user.username} setUser={this.setUser}/>
          <ErrorMessages
            default
            path="/"
            err={{ msg: "somethings wrong...", status: 500 }}
          />
        </Router></div>
      </main>
    );
  }
  setUser = newUser => {
    this.setState({ user: newUser });
  };
  updateTopics = (val) => {
   this.setState({topicsAdded:val})
  };
  setTopic=(val)=>{
    this.setState({topic:val})
    console.log(this.state.topic)
  }
}

export default App;
