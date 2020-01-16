import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "./Api";
import LogIn from "./LogIn";

class NavBar extends Component {
  state = { topics: [] };
  render() {
    const { topics } = this.state;
    return (
      <div className='wholeNavBar'>
        <LogIn setUser={this.props.setUser} username={this.props.username}/>
        <div className="topnav">
        <nav>
          <Link to="/">Home</Link>/
          <Link to="/articles">All Articles</Link> /
          <Link to='/users'>Users</Link>/
          <Link to='/articles/most-popular'>Most Popular</Link>
          <ul  className='sidenav'>
            <Link to='/create-topic'>Create a new topic</Link>
          {topics.map(topic => {
            return (
             <li>
                <Link to={`/articles/topics/${topic.slug}`}>{topic.slug} </Link>
              </li>
            );
          })}</ul>
        </nav>
        </div>
      </div>
    );
  }
  componentDidMount() {
    getTopics().then(topics => this.setState({ topics: topics }));
  }
}

export default NavBar;
