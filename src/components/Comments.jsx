import React, { Component } from "react";
import SubmitComment from "./SubmitComment";
import VoteUpdater from "./VoteUpdater";
import { deleteComment, getComments } from "./Api";

class Comments extends Component {
  state = { comments: [], isLoading: true };
  render() {
    console.log(this.props, "in comment");
    if (this.state.isLoading) {
      return <p>Loading....</p>;
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
    getComments(this.props.article_id).then(comments =>
      this.setState({ comments: comments ,isLoading:false})
    );
  }
  addComment = newComment => {
    this.setState(currentState => {
      console.log("comment added", this.state.comments);
      return { comments: [newComment, ...currentState.comments], isLoading: false };
    });
  };
  deleteComment = event => {
    event.preventDefault();
    console.log(event.target.value, "comment deleted");
    deleteComment(event.target.value).then(console.log(event.target.value,'in delete'))
    
    const modifiedComments = this.state.comments.filter(comment => comment.comment_id !== Number(event.target.value))
  
    this.setState({ comments: modifiedComments})

  // })
  };
}

export default Comments;
