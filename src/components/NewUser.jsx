import React, { Component } from "react";
import * as api from "./Api";
import { navigate } from "@reach/router";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";

class NewUser extends Component {
  state = {
    username: "",
    name: "",
    avatar_url: "",
    isLoading: true,
    err: null,
    created: false
  };
  render() {
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    const { username, name, avatar_url } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          onChange={this.handleChange}
          name="username"
          value={username}
          required
        ></input>
        <label htmlFor="name">Name:</label>
        <input
          onChange={this.handleChange}
          name="name"
          value={name}
          required
        ></input>
        <label htmlFor="avatar_url">Avatar:</label>
        <input
          onChange={this.handleChange}
          name="avatar_url"
          value={avatar_url}
          required
        ></input>
        <button>Create User Account</button>
      </form>
    );
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { username, name, avatar_url } = this.state;
    api
      .postUser(username, name, avatar_url)
      .then(user => {
        this.props.setUser(user);
        navigate(`/users/${user.username}`);
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  };
}

export default NewUser;
