import React, { Component } from "react";
import { postComment } from "./Api";

class SubmitComment extends Component {
  state = { username: "", body: "" };
  render() {
    // const { usernameInput } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          onChange={this.handleChange}
          name="username"
          value={this.state.usernameInput}
        />
        <label htmlFor="body">Comment:</label>
        <input
          onChange={this.handleChange}
          name="body"
          value={this.state.bodyInput}
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

    postComment(this.props.article_id,this.state.username,this.state.body)
      .then(comment => {
        this.props.addComment(comment);
        this.setState(currentState=>{
          return{ username: "", body: "" }
        });
      })

      .catch(console.dir);
  };
}

export default SubmitComment;
