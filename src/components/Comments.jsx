import React, { Component } from "react";
import SubmitComment from "./SubmitComment";
import * as api from "./Api";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";
import SortingQueries from "./SortingQueries";
import CommentCards from "./CommentCards";

class Comments extends Component {
  state = { comments: [], isLoading: true, sort_by: "", order: "", err: null };
  render() {
    const { comments, isLoading, sort_by, order, err } = this.state;
    const { user, article_id } = this.props;

    if (isLoading) {
      return <Loading />;
    }
    if (err) {
      return <ErrorMessages err={err} />;
    }
    return (
      <main>
        {this.props.user.username && (
          <SubmitComment
            article_id={article_id}
            addComment={this.addComment}
            user={user}
          />
        )}
        <SortingQueries
          handleSortChange={this.handleSortChange}
          sort_by={sort_by}
          order={order}
          searchByOptions={[
            { name: "Date", value: "created_at" },
            { name: "Votes", value: "votes" }
          ]}
        />
        <CommentCards
          comments={comments}
          user={user}
          deleteComment={this.deleteComment}
        />
      </main>
    );
  }
  componentDidMount() {
    const { sort_by, order } = this.state;
    api
      .getComments(this.props.article_id, sort_by, order)
      .then(comments => this.setState({ comments: comments, isLoading: false }))
      .catch(err => {
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
  addComment = newComment => {
    this.setState(currentState => {
      return {
        comments: [newComment, ...currentState.comments],
        isLoading: false
      };
    });
  };
  deleteComment = id => {
    api.deleteComment(id);
    this.setState(currentState => {
      return {
        comments: currentState.comments.filter(
          comment => comment.comment_id !== Number(id)
        )
      };
    });
  };

  handleSortChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    if (sort_by !== prevState.sort_by || order !== prevState.order) {
      api
        .getComments(this.props.article_id, sort_by, order)
        .then(comments =>
          this.setState({ comments: comments, isLoading: false, err: null })
        );
    }
  }
}

export default Comments;
