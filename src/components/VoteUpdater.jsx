import React, { Component } from "react";
import * as api from "./Api";
import Loading from "./Loading";
import ErrorMessages from "./ErrorMessages";

class VoteUpdater extends Component {
  state = { voteDiff: 0, err: null, isLoading: true };
  render() {
    const{isLoading,err,voteDiff}=this.state
    if (isLoading && voteDiff !== 0) {
      return <Loading />;
    }
    if (err) {
      return <ErrorMessages err={err} />;
    }
    return (
      <section>
        <p>Votes: {this.props.votes + voteDiff}</p>
        <button className="btn"
          id="button"
          onClick={() => this.handleVote(1)}
          value={1}
          disabled={this.upvoteEnabling(voteDiff)}
        >
          Upvote
        </button>
        <button
          className="btn"
          onClick={() => this.handleVote(-1)}
          value={-1}
          disabled={this.downvoteEnabling(voteDiff)}
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
    api
      .patchVotes(this.props.type, this.props.id, voteChange)
      .catch(err => {
        this.setState(currentState => {
          return {
            err: {
              msg: err.response.data.msg,
              status: err.response.status
            },
            voteDiff: currentState.voteDiff - this.state.voteDiff,
            isLoading: false
          };
        });
      });
  };
}

export default VoteUpdater;
