import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./Api";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";

class Users extends Component {
  state = { users: [], isLoading: true, err: null };
  render() {
    // const { users } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <div><ul>
        {this.state.users.map(user => {
          return <li><Link to={`/users/${user.username}`}>{user.username}</Link></li>
        })}</ul>
        
      </div>
    );
  }
  componentDidMount() {
    api
      .getUsers()
      .then(users => this.setState({ users: users, isLoading: false }))
      .catch(err => {
        console.log(err);
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
}

export default Users;
