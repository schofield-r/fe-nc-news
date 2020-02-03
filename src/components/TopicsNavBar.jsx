import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./Api";

class TopicsNavBar extends Component {
  state = { topics: [] };

  render() {
    const { topics } = this.state;
    return (
      <nav className="tab">
        <Link to="/create-topic" className="createtopic">
          <button >Create a new topic</button>
        </Link>
        {topics.map(topic => {
          return (
            <Link to={`/articles/topics/${topic.slug}`}>
              <button className="tablinks">{topic.slug}</button>
            </Link>
          );
        })}
      </nav>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }
  componentDidUpdate(prevProps) {
    const { topicsAdded, updateTopics } = this.props;
    if (topicsAdded !== prevProps.topicsAdded) {
      this.fetchTopics();
      updateTopics(false);
    }
  }
  fetchTopics = () => {
    api.getTopics().then(topics => this.setState({ topics: topics }));
  };
}

export default TopicsNavBar;
