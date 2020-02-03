import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import * as api from "./Api";
import LogInPage from "./LogInPage";

class NewArticle extends Component {
  state = {
    topics: [],
    body: "",
    title: "",
    selectedTopic: "",
    topicDescription: ""
  };
  render() {
    const { selectedTopic, topics, topicDescription, title, body } = this.state;
    const { user, setUser, location, username } = this.props;
    if (!username) {
      return (
        <>
          <p>Please log in to post an article </p>
          <LogInPage path="/login" user={user} username={username}  setUser={setUser} />
        </>
      );
    }
    return (
      <div className="form">
        <p>
          Select a topic to post an article in or create a new one
          <Link to="/create-topic"> here</Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <select
            name="selectedTopic"
            value={location.state.topic || selectedTopic}
            onChange={this.handleChange}
            required
          >
            {location.state.topic ? (
              <option value={location.state.topic}>
                {location.state.topic}
              </option>
            ) : (
              <option disabled value="">
                Choose Topic
              </option>
            )}
            {topics.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
          <p>topic: {selectedTopic || location.state.topic}</p>
          <p>
            Description: {topicDescription}
          </p>
          <label htmlFor="title">Title:</label>
          <input
            onChange={this.handleChange}
            name="title"
            value={title}
            required
          ></input>
          <label htmlFor="body">Article:</label>
          <input
            onChange={this.handleChange}
            name="body"
            value={body}
            required
          ></input>
          <button>Post Article</button>
        </form>
      </div>
    );
  }
  handleSubmit = event => {
    event.preventDefault();
    const { title, body } = this.state;
    const author = this.props.user.username;
    const topic = this.state.selectedTopic;
    api
      .postArticle(title, topic, author, body)
      .then(article => {
        navigate(`/articles/${article.article_id}`);
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  };
  handleChange = event => {
    const { name, value } = event.target;
    if (name === "selectedTopic") {
      this.setDescription(value);
      this.setState({ selectedTopic: value });
    } else this.setState({ [name]: value });
  };
  componentDidMount() {
    const { location } = this.props;
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
      if (location.state.topic) {
        this.setState({ selectedTopic: location.state.topic });
        this.setDescription(location.state.topic);
      }
    });
  }
  setDescription = topicVal => {
    let filteredTopic = this.state.topics.find(
      topic => topic.slug === topicVal
    );
    this.setState({
      topicDescription: filteredTopic.description
    });
  };
}

export default NewArticle;
