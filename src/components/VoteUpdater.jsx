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
        <button
          id="button"
          onClick={() => this.handleVote(1)}
          value={1}
          disabled={this.upvoteEnabling(this.state.voteDiff)}
        >
          Upvote
        </button>
        <button
          onClick={() => this.handleVote(-1)}
          value={-1}
          disabled={this.downvoteEnabling(this.state.voteDiff)}
        >
          Downvote
        </button>
      </section>
    );
  }
  upvoteEnabling = vote => {
    return vote >= 1 ? true : false;
  };
  downvoteEnabling = vote => {
    return vote <= -1 ? true : false;
  };

  handleVote = voteChange => {
    this.setState(currentState => {
      return { voteDiff: currentState.voteDiff + voteChange, isLoading: false };
    });
    patchVotes(this.props.type, this.props.id, voteChange).catch(response => {
      this.setState(currentState => {
        return {
          err: {
            msg: response.response.data.msg,
            status: response.response.status
          },
          voteDiff: currentState.voteDiff - this.state.voteDiff,
          isLoading: false
          /////
        };
      });
    });
  };
}

export default VoteUpdater;
