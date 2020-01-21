import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import * as api from "./Api";
import LogInPage from "./LogInPage";

class NewArticle extends Component {
  state = { topics: [], body: "", title: "", selectedTopic: ""};
  render() {
    if (!this.props.username) {
      return (
        <>
          <p>Please log in to post an article </p>
          <LogInPage
            path="/login"
            username={this.props.username}
            setUser={this.props.setUser}
          />
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
            value={this.state.selectedTopic}
            onChange={this.handleChange}
            required
          >
            {this.state.selectedTopic.length ? (
              <option>{this.state.selectedTopic}</option>
            ) : (
              <option disabled value="">
                Choose Topic
              </option>
            )}
            {this.state.topics.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
          <p>topic:{this.state.selectedTopic}</p>
          {/* <p>
            Description:
            {}
          </p> */}
          <label htmlFor="title">Title:</label>
          <input
            onChange={this.handleChange}
            name="title"
            value={this.state.title}
            required
          ></input>
          <label htmlFor="body">Article:</label>
          <input
            onChange={this.handleChange}
            name="body"
            value={this.state.body}
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
    const author = this.props.username;
    const topic = this.state.selectedTopic;
   api. postArticle(title, topic, author, body)
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
    const {name,value} = event.target
    this.setState({ [name]: value });
  };
  componentDidMount() {
    this.setState({ selectedTopic: this.props.topic });
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
    });
 }

}

export default NewArticle;
