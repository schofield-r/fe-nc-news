import React, { Component } from "react";
import * as api from "./Api";
import { Link } from "@reach/router";

class LogInPage extends Component {
  state = { username: "", user: {}, loggedIn: false, users: [] };
  render() {
    const { users } = this.state;
    return (<div className='form'>
      <section className='login'>
        {this.state.loggedIn ? (
          <>
            <p>You are now logged in as {this.state.user.username}</p>
            <p>Name: {this.state.user.name}</p>

            <img
              src={this.state.user.avatar_url}
              className="avatar"
              alt="avatar"
            />
            
          </>
        ) : (
          <>
            <h4>Please Log in to comment</h4>
            <form onSubmit={this.handleLogin}>
              <select
                value={this.state.username}
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
              <p>or </p><Link to='/create-new-user'>create new user</Link>
          </>
        )}
      </section></div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      if (this.props.username === undefined) {
        this.setState({ loggedIn: false, username: "" });
      } else this.setState({ username: this.props.username });
    }
  }
  handleLogOut = event => {
    event.preventDefault();
    this.props.setUser("");
  };

  handleLogin = event => {
    event.preventDefault();
    api.getUser(this.state.username).then(user => {
      this.props.setUser(user);
      this.setState({ user: user, loggedIn: true });
    });
  };
  handleChange = event => {
    this.setState({ username: event.target.value });
  };
  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({ users: users });
    });
    this.setState({ username: this.props.username });
  }
}

export default LogInPage;
