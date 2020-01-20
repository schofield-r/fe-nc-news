import React, { Component } from "react";
import {postTopic} from './Api'
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";
import { navigate } from "@reach/router";

class TopicForm extends Component {
  state = {slug: "", description: "", err: null};
  render() {
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <form onSubmit={this.handleSubmit } className='form'>
        <h2>Create a new topic</h2>
        <label htmlFor="slug">Topic:</label>
        <input
          onChange={this.handleChange}
          name="slug"
          value={this.state.slug}
          required
        ></input>
        <label htmlFor="description ">Description :</label>
        <input
          onChange={this.handleChange}
          name="description"
          value={this.state.description}
          required
        ></input>
        <button>Create Topic</button>
      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

 handleSubmit = event => {
    event.preventDefault();
   postTopic(this.state.slug, this.state.description)
      .then(topic => {
        this.setState({ slug: "", description: "" });
        this.props.updateTopics(true)
        navigate(`/articles/topics/${topic.slug}`)
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          // isLoading: false
        });
      });
  };
}

export default TopicForm;
