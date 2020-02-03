import React, { Component } from "react";
import * as api from "./Api";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";
import ArticleCard from "./ArticleCards";

class UserProfile extends Component {
  state = { user:{}, articles: [], isLoading: true, err: null };
  render() {
    const { isLoading,articles,err,user } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (err) {
      return <ErrorMessages err={err} />;
    }
    return (
      <div>
        <p>{user.username}</p>
        <p>{user.name}</p>
        <img src={user.avatar_url} className="avatar" alt="avatar" />
        <h3>User Activity</h3>
        <h4>Articles</h4>

        <ArticleCard articles={articles} />
      </div>
    );
  }
  componentDidMount() {
    this.getUserData(this.props.username);
  }

  getUserData = (username) => {
    api.getUser(username).then(user=>{
      this.setState({user:user,isLoading:false})
    })
    console.log('userloading')
    api
      .getArticles(null, null, null,username)
      .then(articles => {
        this.setState({ articles: articles, isLoading: false });
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  };
}

export default UserProfile;
