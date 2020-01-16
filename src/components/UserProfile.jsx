import React, { Component } from "react";
import { getUser } from "./Api";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";

class UserProfile extends Component {
  state = { user: {}, isLoading: true, err: null };
  render() {
    const { user } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return <div>
  <p>{this.state.user.username}</p>
  <p>{this.state.user.name}</p>
      <img
        src={this.state.user.avatar_url}
        className="avatar"
        alt="avatar"
      />
      <h3>User Activity</h3>
    </div>;
  }
  componentDidMount() {
    getUser(this.props.username)
      .then(user => {
        this.setState({ user: user, isLoading: false });
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
}

export default UserProfile;
