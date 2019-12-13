import React, { Component } from "react";
import { patchVotes } from "./Api";
import Loading from "./Loading";
import ErrorMessages from "./ErrorMessages";

class VoteUpdater extends Component {
  state = { voteDiff: 0, err: null, isLoading: true };
  render() {
    if (this.state.isLoading && this.state.voteDiff !== 0) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
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
    //optimistically sets state with updated vote
    this.setState(currentState => {
      return { voteDiff: currentState.voteDiff + voteChange, isLoading: false };
    });
    //api request
    patchVotes(this.props.type, this.props.id, voteChange)
      //if it goes wrong , send err and undo the optomistic rendering of updated votes
      .catch(response => {
        this.setState(currentState => {
          return {
            err: {
              msg: response.response.data.msg,
              status: response.response.status
            },
            voteDiff: currentState.voteDiff - this.state.voteDiff,
            isLoading: false
          };
        });
      });
  };
}

export default VoteUpdater;
