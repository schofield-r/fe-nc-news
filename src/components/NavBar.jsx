import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "./Api";
import LogInButton from "./LogInButton";

class NavBar extends Component {
  state = { topics: [], user: this.props.username };
  render() {
    const { topics } = this.state;
    return (
      <div className="wholeNavBar">
        <LogInButton
          setUser={this.props.setUser}
          username={this.props.username}
        />
        <div className="topnav">
          <nav>
            <Link to="/">Home</Link>/<Link to="/articles">All Articles</Link> /
            <Link to="/users">Users</Link>/
            <Link to="/feature-articles/most-popular">Most Popular</Link>/
            <Link to="/create-new-article"> Post Article </Link>
            <ul className="sidenav">
              <Link to="/create-topic">Create a new topic</Link>
              {topics.map(topic => {
                return (
                  <li>
                    <Link to={`/articles/topics/${topic.slug}`}>
                      {topic.slug}{" "}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }
  componentDidUpdate(prevProps) {
    if (this.props.topicsAdded !== prevProps.topicsAdded) {
      this.fetchTopics();
      this.props.updateTopics(false);
    }
  }
  fetchTopics = () => {
    getTopics().then(topics => this.setState({ topics: topics }));
  };
}

export default NavBar;
