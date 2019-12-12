import React, { Component } from 'react';
import { getUser } from './Api';

class LogIn extends Component {
  state={username:'',user:{}}
  render() {
    return (<section>

      <form onSubmit={this.handleLogin}>
        <select value={this.state.username} onChange={this.handleChange}>
          <option value='jessjelly'>jessjelly</option>
          <option value='tickle122'>tickle122</option>
          <option value='grumpy19'>grumpy19</option>
          <option value='happyamy2016'>happyamy2016</option>
          <option value='cooljmessy'>cooljmessy</option>
          <option value='weegembump'>weegembump</option>
        </select>
        <button>Login</button>
      </form>
  <p>You are now logged in as {this.state.user.username}</p>
    <p>Name: {this.state.user.name}</p>
   
   
      <img src={this.state.user.avatar_url} onerror="this.onerror =null;this.src='https://t4.ftcdn.net/jpg/00/64/67/63/500_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';"/>
      {/* <img src={this.state.user.avatar_url} onError="this.onerror=null; this.src='Default.jpg'" /> */}
   
    </section>
//https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg
    );
  }
  //window.onerror = function(event){

  //}
  // imgErr(){
  //   return(
  //     'https://t4.ftcdn.net/jpg/00/64/67/63/500_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
  //   )
  // }
  handleLogin=(event)=>{
    event.preventDefault()
    getUser(this.state.username).then((user)=>{
      this.props.setUser(user)
      console.log(user,'in login')
      this.setState({user:user})
    })
  }
  handleChange=(event)=>{
    this.setState({username:event.target.value})
  }

}

export default LogIn;