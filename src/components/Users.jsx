import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./Api";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";

class Users extends Component {
  state = { users: [], isLoading: true, err: null };
  render() {
    const { users, isLoading, err } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (err) {
      return <ErrorMessages err={err} />;
    }
    return (
      <ul className="userslist">
        {users.map(user => {
          return (
            <li>
              <Link to={`/users/${user.username}`}>{user.username}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
  componentDidMount() {
    api
      .getUsers()
      .then(users => this.setState({ users: users, isLoading: false }))
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
}

export default Users;
