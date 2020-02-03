import React, { Component } from "react";
import * as api from "./Api";
import ErrorMessages from "./ErrorMessages";

class SubmitComment extends Component {
  state = {  body: "", err: null };
  render() {
    const { body, err } = this.state;

    if (err) {
      return <ErrorMessages err={err} />;
    }
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label htmlFor="body">Comment:</label>
        <input onChange={this.handleChange} name="body" value={body} required />
        <button>Comment</button>
      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { article_id, user, addComment } = this.props;
    api
      .postComment(article_id, user.username, this.state.body)
      .then(comment => {
        addComment(comment);
        this.setState({  body: "" });
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status }
        });
      });
  };
}

export default SubmitComment;
