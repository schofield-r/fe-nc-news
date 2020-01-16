import React, { Component } from "react";
import SubmitComment from "./SubmitComment";
import VoteUpdater from "./VoteUpdater";
import { deleteComment, getComments } from "./Api";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";
import SortingQueries from "./SortingQueries";

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
        <ul>
          {this.state.comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                {comment.body}
                <br></br>Author : {comment.author}
                <br></br>CommentId: {comment.comment_id}
                <br></br>
                <VoteUpdater
                  type={"comments"}
                  id={comment.comment_id}
                  votes={comment.votes}
                />
                {this.props.user === comment.author ? (
                  <button
                    onClick={this.deleteComment}
                    value={comment.comment_id}
                  >
                    Delete
                  </button>
                ) : (
                  <br></br>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
  componentDidMount() {
    getComments(this.props.article_id, this.state.sort_by, this.state.order)
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
  deleteComment = event => {
    event.preventDefault();
    deleteComment(event.target.value).then();
    const modifiedComments = this.state.comments.filter(
      comment => comment.comment_id !== Number(event.target.value)
    );
    this.setState({ comments: modifiedComments });
  };
  handleSortChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps,prevState) {
    if (
      this.state.sort_by !== prevState.sort_by ||
      this.state.order !== prevState.order
    ) {
      getComments(
        this.props.article_id,
        this.state.sort_by,
        this.state.order
      ).then(comments =>
        this.setState({ comments: comments, isLoading: false ,err:null})
      );

      console.log(this.state.order, this.state.sort_by);
    }
  }
}

export default Comments;
