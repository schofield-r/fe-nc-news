import React, { Component } from "react";
import * as api from "./Api";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";

class MostPopular extends Component {
  state = { articles: [], isLoading: true, err: null };
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return <ArticleCard articles={this.state.articles}/>
  }
  
  componentDidMount() { 
    api
      .getArticles(null, "votes", "desc")
      .then(articles => this.setState({ articles: articles, isLoading: false }))
      .catch(err => {
        console.log(err);
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
}

export default MostPopular;
