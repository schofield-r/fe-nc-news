import React, { Component } from "react";
import { getSingleArticle } from "./Api";
import ErrorMessages from "./ErrorMessages";
import Comments from "./Comments";
import ViewToggler from "./ViewToggler";
import VoteUpdater from "./VoteUpdater";
import Loading from "./Loading";

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
        <h2>{article.topic}</h2>
        <h3>{article.title}</h3>
        <p>{article.body}</p>
        <p>Author: {article.author}</p>
        <p>Posted: {article.created_at}</p>
        <VoteUpdater
          type={"articles"}
          id={article.article_id}
          votes={article.votes}
        />
        ------------------ comments------------------
        <br></br>
        <br></br>
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
}

export default SingleArticle;
