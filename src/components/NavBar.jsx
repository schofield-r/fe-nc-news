import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "./Api";
import LogIn from "./LogIn";

class NavBar extends Component {
  state = { topics: [] };
  render() {
    const { topics } = this.state;
    return (
      <div className="topnav">
        <LogIn setUser={this.props.setUser} />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/articles">All Articles</Link>
          {topics.map(topic => {
            return (
              <span key={topic.slug}>
                <Link to={`/articles/topics/${topic.slug}`}>{topic.slug} </Link>
              </span>
            );
          })}
        </nav>
      </div>
    );
  }
  componentDidMount() {
    getTopics().then(topics => this.setState({ topics: topics }));
  }
}

export default NavBar;
