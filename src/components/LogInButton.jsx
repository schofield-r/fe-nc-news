import React, { Component } from "react";
import { Link } from "@reach/router";

class LogInButton extends Component {
  state = { username: "", loggedIn: false, users: [] };
  render() {
    return (
      <section className='loginbutton'>
        {this.state.username !== undefined ? (
          <>
            <p>You are now logged in as {this.state.username}</p>
            <button onClick={this.handleLogOut} value='null'>Log Out</button>
          </>
        ) : (
          //  <button>
             <Link to='/login'>Log In</Link>
            //  </button>
        )}
      </section>
    );
  }
handleLogOut=event=>{
  event.preventDefault()
  this.props.setUser(this.state.username)
}

  componentDidMount() {
      this.setState({ username: this.props.username });
  }
  componentDidUpdate(prevProps){
if(this.props.username !== prevProps.username){
  this.setState({ username: this.props.username })
}
  }
}

export default LogInButton;
