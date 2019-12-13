import React, { Component } from "react";
import { postComment } from "./Api";
import ErrorMessages from './ErrorMessages'

class SubmitComment extends Component {
  state = { username: "", body: "", err: null };
  render() {console.log(this.props.user)
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="body">Comment:</label>
        <input
          onChange={this.handleChange}
          name="body"
          value={this.state.body}
        />
        <button>Comment</button>
      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    //this.setState({ username: this.props.user });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.props, "in submit comment");

    console.log(this.state, "in submit comment state");

    postComment(this.props.article_id, this.props.user, this.state.body)
      .then(comment => {
        this.props.addComment(comment);
        this.setState({ username: "", body: "" });
      })
      .catch(err => {
        this.setState({
          err: { msg: 'please log in', status: err.response.status },
          isLoading: false
         })
      });
  };
}

export default SubmitComment;
