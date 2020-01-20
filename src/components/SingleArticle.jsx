import React, { Component } from "react";
import { getSingleArticle, deleteArticle } from "./Api";
import ErrorMessages from "./ErrorMessages";
import Comments from "./Comments";
import ViewToggler from "./ViewToggler";
import VoteUpdater from "./VoteUpdater";
import Loading from "./Loading";
import { navigate } from "@reach/router";

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
      <main>
        <div className="articleBox">
          <h2>{article.topic}</h2>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
          <p>Author: {article.author}</p>
          <p>Posted: {article.created_at}</p>
          {this.props.user === article.author  ? (
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
      </main>
    );
  }
  componentDidMount() {
    getSingleArticle(this.props.article_id)
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
    deleteArticle(event.target.value);
    console.log('deleted')
    navigate(`/articles/topics/${this.state.article.topic}`);
  };
}

export default SingleArticle;
