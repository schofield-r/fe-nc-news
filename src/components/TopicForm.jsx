import React, { Component } from "react";
import * as api from "./Api";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";
import { navigate } from "@reach/router";

class TopicForm extends Component {
  state = { slug: "", description: "", err: null, isLoading: true };
  render() {
    const { slug, description, isLoading, err } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (err) {
      return <ErrorMessages err={err} />;
    }
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2>Create a new topic</h2>
        <label htmlFor="slug">Topic:</label>
        <input
          onChange={this.handleChange}
          name="slug"
          value={slug}
          required
        ></input>
        <label htmlFor="description ">Description :</label>
        <input
          onChange={this.handleChange}
          name="description"
          value={description}
          required
        ></input>
        <button>Create Topic</button>
      </form>
    );
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { slug, description } = this.state;
    api
      .postTopic(slug, description)
      .then(topic => {
        this.props.updateTopics(true);
        navigate(`/articles/topics/${topic.slug}`);
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  };
}

export default TopicForm;
