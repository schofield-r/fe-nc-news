import React, { Component } from "react";
import { postComment } from "./Api";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";

class SubmitComment extends Component {
  state = { username: "", body: "", err: null, isLoading: true };
  render() {
    if (this.state.isLoading && this.state.username === undefined) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <form onSubmit={this.handleSubmit} className='form'>
        <label htmlFor="body">Comment:</label>
        <input
          onChange={this.handleChange}
          name="body"
          value={this.state.body}
          required
        />
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
    postComment(this.props.article_id, this.props.user, this.state.body)
      .then(comment => {
        this.props.addComment(comment);
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
