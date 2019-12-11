import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "./Api";


class NavBar extends Component {
  state = { topics: [] };
  render() {
    const { topics } = this.state;
    
    //console.log(topics);
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>|<Link to="/articles">All Articles</Link> |
          {topics.map(topic => {
            return <span>
              <Link to={`/articles/topics/${topic.slug}`}>{topic.slug}  </Link>|
            </span> 
          })}
        </nav>
      </div>
    );
  }
  componentDidMount() {
    getTopics().then(topics => this.setState({ topics: topics }))
    
  }
}

export default NavBar;
