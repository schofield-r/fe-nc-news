import React, { Component } from "react";
import Axios from "axios";
import SubmitComment from "./SubmitComment";
import VoteUpdater from "./VoteUpdater";

class Comments extends Component {
  state = { comments: [], isLoading: true };
  render() {
    return (
      <main>
        <SubmitComment
          article_id={this.props.article_id}
          addComment={this.addComment}
          
        />

        {this.state.comments.map(comment => {
          return (
            <p>
              {comment.body}
              <br></br>Author : {comment.author}
              <br></br>
              <VoteUpdater
                type={"comments"}
                id={comment.comment_id}
                votes={comment.votes}
              />
            </p>
          );
        })}
      </main>
    );
  }
  componentDidMount() {
    Axios.get(
      `https://nc-news-rs.herokuapp.com/api/articles/${this.props.article_id}/comments`
    ).then(({ data }) => {
      console.log(data);
      this.setState({ comments: data.comments });
    });
  }
  addComment = newComment => {
    this.setState(currentState => {
      console.log("comment added", this.state.comments);
      return { comments: [newComment, ...currentState.comments] };
    });
  };
  // componentDidUpdate(prevState){
  //   if(prevState.comments.length !== this.state.comments.length){

  //   }
  // }
}

export default Comments;
