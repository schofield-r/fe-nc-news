import React, { Component } from "react";
import * as api from "./Api";
import ErrorMessages from "./ErrorMessages";
import Comments from "./Comments";
import ViewToggler from "./ViewToggler";
import VoteUpdater from "./VoteUpdater";
import Loading from "./Loading";
import { navigate } from "@reach/router";
import moment from "moment";

class SingleArticle extends Component {
  state = { article: [], isLoading: true, err: null };

  render() {
    const { article } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <div>
        <div className="articleBox">
          <h2>{article.topic}</h2>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
          <p>Author: {article.author}</p>
          <p>
            Posted:{" "}
            {moment(article.created_at).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          {this.props.user === article.author ? (
            <button onClick={this.deleteArticle} value={article.article_id}>
              Delete
            </button>
          ) : (
            <br></br>
          )}
          <VoteUpdater
            type={"articles"}
            id={article.article_id}
            votes={article.votes}
          />
        </div>
        <br></br>
        <br></br>
        <ViewToggler>
          <Comments article_id={this.props.article_id} user={this.props.user} />
        </ViewToggler>
      </div>
    );
  }
  componentDidMount() {
    api
      .getSingleArticle(this.props.article_id)
      .then(article => {
        this.setState({ article: article, isLoading: false });
      })
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
  deleteArticle = event => {
    event.preventDefault();
    api.deleteArticle(event.target.value);
    navigate(`/articles/topics/${this.state.article.topic}`);
  };
}

export default SingleArticle;
