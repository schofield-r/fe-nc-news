import React, { Component } from "react";
import * as api from "./Api";
import { Link } from "@reach/router";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";
import SortingQueries from "./SortingQueries";
import ArticleCards from "./ArticleCards";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "",
    order: "",
    err: null
  };

  render() {
    const { articles, isLoading, err, sort_by, order } = this.state;
    const { topic } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    if (err) {
      return <ErrorMessages err={err} />;
    }
    return (
      <main>
        <SortingQueries
          handleSortChange={this.handleSortChange}
          sort_by={sort_by}
          order={order}
          searchByOptions={[
            { name: "Date", value: "created_at" },
            { name: "Comments", value: "comment_count" },
            { name: "Votes", value: "votes" }
          ]}
        />
        <h2>{topic || "All Articles"}</h2>
        {!articles.length && (
          <p>
            There are no articles in this topic, click
            <Link to="/create-new-article" state={{ topic: topic }}>
              {" "}
              here{" "}
            </Link>{" "}
            to write one in this topic
          </p>
        )}
        <ArticleCards articles={articles} />
      </main>
    );
  }
  componentDidMount() {
    api
      .getArticles(this.props.topic)
      .then(articles => this.setState({ articles: articles, isLoading: false }))
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    const { topic } = this.props;
    if (
      prevProps.topic !== topic ||
      sort_by !== prevState.sort_by ||
      order !== prevState.order
    ) {
      api.getArticles(topic, sort_by, order).then(articles => {
        this.setState({ articles: articles, isLoading: false, err: null });
      });
    }
  }
  handleSortChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default Articles;
