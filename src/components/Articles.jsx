import React, { Component } from "react";
import * as api from "./Api";
import { Link } from "@reach/router";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";
import SortingQueries from "./SortingQueries";
import ArticleCard from "./ArticleCard";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "",
    order: "",
    err: null,
    topic: ""
  };

  render() {
    const { articles } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <main>
        <SortingQueries
          handleSortChange={this.handleSortChange}
          sort_by={this.state.sort_by}
          order={this.state.order}
          searchByOptions={[
            { name: "Date", value: "created_at" },
            { name: "Comments", value: "comment_count" },
            { name: "Votes", value: "votes" }
          ]}
        />
        <h2>{this.props.topic || "All Articles"}</h2>
        {!articles.length && (
          <p>
            There are no articles in this topic, click
            <Link to="/create-new-article"> here </Link> to write one in this
            topic
          </p>
        )}
        <ArticleCard articles={this.state.articles} />
      </main>
    );
  }
  componentDidMount() {
    if (this.props.topic) {
      this.props.setTopic(this.props.topic);
    }
    api.getArticles(this.props.topic)
      .then(articles => this.setState({ articles: articles, isLoading: false }))
      .catch(err => {
        console.log(err, "err");
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      this.state.sort_by !== prevState.sort_by ||
      this.state.order !== prevState.order
    ) {
      if (this.props.topic) {
        this.props.setTopic(this.props.topic);
      }
      getArticles(this.props.topic, this.state.sort_by, this.state.order).then(
        articles => {
          this.setState({ articles: articles, isLoading: false, err: null });
        }
      );
    }
  }
  handleSortChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default Articles;
