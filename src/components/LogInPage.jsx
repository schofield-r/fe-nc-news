import React, { Component } from "react";
import * as api from "./Api";
import { Link } from "@reach/router";

class LogInPage extends Component {
  state = { username: "", users: [] };
  render() {
    const { users, username } = this.state;
    return (
      <section className="form">
        {this.props.username ? (
          <>
            <p>You are now logged in as {this.props.user.username}</p>
            <p>Name: {this.props.user.name}</p>

            <img
              src={this.props.user.avatar_url}
              className="avatar"
              alt="avatar"
            />
          </>
        ) : (
          <>
            <h4>Please Log in to comment</h4>
            <form onSubmit={this.handleLogin}>
              <select
                value={username}
                onChange={this.handleChange}
                class="form"
                required
              >
                <option disabled value="">
                  Choose login username
                </option>
                {users.map(user => {
                  return (
                    <option key={user.username} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
              </select>

              <button className="btn">Login</button>
            </form>
            <p>or </p>
            <Link to="/create-new-user">create new user</Link>
          </>
        )}
      </section>
    );
  }
  handleLogOut = event => {
    event.preventDefault();
    this.props.setUser("");
  };

  handleLogin = event => {
    event.preventDefault();
    this.props.setUser(this.state.username);
  };
  handleChange = event => {
    this.setState({ username: event.target.value });
  };
  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({ users: users });
    });
  }
}

export default LogInPage;
