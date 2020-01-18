import React, { Component } from "react";
import { getArticles } from "./Api";
import { Link, Router } from "@reach/router";
import ErrorMessages from "../components/ErrorMessages";
import Loading from "./Loading";
import SortingQueries from "./SortingQueries";
import NewArticle from "./NewArticle";

class Articles extends Component {
  state = { articles: [], isLoading: true, sort_by: "", order: "", err: null ,topic:''};

  render() {
    const { articles } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <main className="App">
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
        {/* <Router >
          <NewArticle path="/create-new-article" topic={this.state.stuff} />
        </Router> */}
        <h2>{this.props.topic || "All Articles"}</h2>
        {!articles.length && (
          <p>
            There are no articles in this topic, click
            <Link to="/create-new-article"> here </Link> to write one in this
            topic
          </p>
        )}
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
                <br></br>
                Date posted: {article.created_at}
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
  componentDidMount() {
    this.props.setTopic(this.props.topic)
    getArticles(this.props.topic)
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
      this.props.setTopic(this.props.topic)
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
