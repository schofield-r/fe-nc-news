import React, { Component } from "react";
import * as api from "./Api";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";

class SubmitComment extends Component {
  state = { username: "", body: "", err: null, isLoading: true };
  render() {
    const { username, body, isLoading, err } = this.state;
    if (isLoading && username === undefined) {
      return <Loading />;
    }
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
      .postComment(article_id, user, this.state.body)
      .then(comment => {
        addComment(comment);
        this.setState({ username: "", body: "" });
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  };
}

export default SubmitComment;
