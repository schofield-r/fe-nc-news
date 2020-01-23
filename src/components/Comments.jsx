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
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <main>
        {this.props.user && (
          <SubmitComment
            article_id={this.props.article_id}
            addComment={this.addComment}
            user={this.props.user}
          />
        )}
        <SortingQueries
          handleSortChange={this.handleSortChange}
          sort_by={this.state.sort_by}
          order={this.state.order}
          searchByOptions={[
            { name: "Date", value: "created_at" },
            { name: "Votes", value: "votes" }
          ]}
        />
        <CommentCards
          comments={this.state.comments}
          user={this.props.user}
          deleteComment={this.deleteComment}
        />
      </main>
    );
  }
  componentDidMount() {
    api.getComments(this.props.article_id, this.state.sort_by, this.state.order)
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
    if (
      this.state.sort_by !== prevState.sort_by ||
      this.state.order !== prevState.order
    ) {
      api
        .getComments(
          this.props.article_id,
          this.state.sort_by,
          this.state.order
        )
        .then(comments =>
          this.setState({ comments: comments, isLoading: false, err: null })
        );
    }
  }
}

export default Comments;
