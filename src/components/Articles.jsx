import React, { Component } from "react";
import { getArticles } from "./Api";
import { Link } from "@reach/router";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";

class Articles extends Component {
  state = { articles: [], isLoading: true, sort_by: "", order: "", err: null };

  render() {
    const { articles } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <main className='App'>
        <label htmlFor="searchBy">Search By:</label>
        <select value={this.state.sort_by} onChange={this.handleSortByChange}>
          <option value="created_at">Date Posted</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
        </select>
        <select value={this.state.order} onChange={this.handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Decending</option>
        </select>
        <h2>{this.props.topic || "All Articles"}</h2>
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                  <br></br>
                </Link>
                Votes:{article.votes}
                <br></br>
                Comment Count : {article.comment_count}
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
  componentDidMount() {
    getArticles(this.props.topic)
      .then(articles => this.setState({ articles: articles, isLoading: false }))
      .catch(err => {
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
      getArticles(this.props.topic, this.state.sort_by, this.state.order).then(
        articles => {
          this.setState({ articles: articles, isLoading: false ,err:null});
        }
      );
    }
  }
  handleSortByChange = event => {
    this.setState({ sort_by: event.target.value });
  };
  handleOrderChange = event => {
    this.setState({ order: event.target.value });
  };
}

export default Articles;
