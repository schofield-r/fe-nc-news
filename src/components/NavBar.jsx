import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "./Api";
import LogInButton from "./LogInButton";

class NavBar extends Component {
  state = { topics: [], user: this.props.username };
  render() {
    const { topics } = this.state;
    return (<>
       <div className="topnav">
        <LogInButton
          setUser={this.props.setUser}
          username={this.props.username}
          className='login'
        />
      
          
            <Link to="/">Home</Link>/<Link to="/articles">All Articles</Link> /
            <Link to="/users">Users</Link>/
            <Link to="/feature-articles/most-popular">Most Popular</Link>/
            <Link to="/create-new-article"> Post Article </Link> </div>
      <nav className="rightcolumn"> <ul className='sidenav'>
              <Link to="/create-topic" className='sidenavlink'>Create a new topic</Link>
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
       
      </>
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
