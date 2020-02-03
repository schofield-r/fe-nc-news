import React from "react";
import { Link } from "@reach/router";
import VoteUpdater from "./VoteUpdater";
import moment from "moment";

const CommentCards = ({ comments, user, deleteComment }) => {
  return (
    <ul className="cardlist">
      {comments.map(comment => {
        return (
          <li key={comment.comment_id}>
            {comment.body}
            <br></br>Author :{" "}
            <Link to={`/users/${comment.author}`}>{comment.author}</Link>
            <br></br>CommentId: {comment.comment_id}
            <br></br>Posted:{" "}
            {moment(comment.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            <VoteUpdater
              type={"comments"}
              id={comment.comment_id}
              votes={comment.votes}
            />
            {user.username === comment.author ? (
              <button onClick={() => deleteComment(comment.comment_id)}>
                Delete
              </button>
            ) : (
              <br></br>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentCards;
