import React, { Component } from "react";
import * as api from "./Api";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";
import ArticleCard from "./ArticleCards";

class MostPopular extends Component {
  state = { articles: [], isLoading: true, err: null };
  render() {
    const { articles, isLoading, err } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (err) {
      return <ErrorMessages err={err} />;
    }
    return <ArticleCard articles={articles} />;
  }

  componentDidMount() {
    api
      .getArticles(null, "votes", "desc")
      .then(articles => this.setState({ articles: articles, isLoading: false }))
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
}

export default MostPopular;
