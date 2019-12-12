import React, { Component } from "react";
import {patchVotes} from './Api'

class VoteUpdater extends Component {
  state = { voteDiff: 0 };
  render() {
    return (
      <section>
        <p>Votes: {this.props.votes + this.state.voteDiff}</p>
        <button onClick={() => this.handleVote(1)} value={1}>
          Upvote
        </button>
        <button onClick={() => this.handleVote(-1)} value={-1}>
          Downvote
        </button>
      </section>
    );
  }
  handleVote = voteChange => {
    //optomistically sets state with updated vote
    this.setState(currentState => {
      return { voteDiff: currentState.voteDiff + voteChange };
    });
    //api request
    patchVotes(this.props.type,this.props.id, voteChange)
      //if it goes wrong , send err and undo the optomistic rendering of updated votes
      .catch(response => {
        this.setState(currentState => {
          return {
            err: {
              msg: response.response.data.msg,
              status: response.response.status
            },
            voteDiff: currentState.voteDiff - this.state.voteDiff
          };
        });
      });
  };
}

export default VoteUpdater;
