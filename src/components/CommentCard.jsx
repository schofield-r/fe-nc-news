import React from 'react';
import { Link } from "@reach/router";
import VoteUpdater from "./VoteUpdater";

const CommentCard = ({comments,user,deleteComment}) => {
  return (
    <div className='cardlist'>
      <ul>
        {comments.map(comment => {
          return (
            <li key={comment.comment_id}>
              {comment.body}
              <br></br>Author : <Link to={`/users/${comment.author}`}>{comment.author}</Link>
              <br></br>CommentId: {comment.comment_id}
              <br></br>
              <VoteUpdater
                type={"comments"}
                id={comment.comment_id}
                votes={comment.votes}
              />
              {user === comment.author ? (
                <button
                  onClick={() => deleteComment(comment.comment_id)}
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
    </div>
  );
};

export default CommentCard;