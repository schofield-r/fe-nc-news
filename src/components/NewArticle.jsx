import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { getTopics, postArticle } from "./Api";
import LogInPage from "./LogInPage";

class NewArticle extends Component {
  state = { topics: [], body: "", title: "", selectedTopic: "",i:null };
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
      <>
        <p>
          Select a topic to post an article in or create a new one
          <Link to="/create-topic"> here</Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <select
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
            {this.indexFinder()}
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
      </>
    );
  }
  handleSubmit = event => {
    event.preventDefault();
    const { title, body } = this.state;
    const author = this.props.username;
    const topic = this.state.selectedTopic;
    postArticle(title, topic, author, body)
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
    this.setState({ selectedTopic: event.target.value });
  };
  componentDidMount() {
    this.setState({ selectedTopic: this.props.topic });
    getTopics().then(topics => this.setState({ topics: topics }))
    console.log(this.indexFinder(), "index");
    console.log(this.state.topics[0],'index of topic')
  }
  indexFinder = () => {
    let topics = this.state.topics;
    console.log(topics)
    let selectedTopic = this.state.selectedTopic;
    let i = topics.findIndex(topic => topic.slug === selectedTopic);
    return i
  };
}

export default NewArticle;
