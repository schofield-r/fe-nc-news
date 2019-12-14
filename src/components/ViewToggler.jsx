import React, { Component } from "react";

class ViewToggler extends Component {
  state = { showContent: true };
  render() {
    const { showContent } = this.state;
    return (
      <div>
        <button onClick={this.toggleShowComments} className="btn">
          {showContent ? "Hide comments" : "Show comments"}
        </button>

        {showContent && this.props.children}
      </div>
    );
  }
  toggleShowComments = () => {
    this.setState(currentState => {
      const show = !currentState.showContent;
      return {
        showContent: show
      };
    });
  };
}

export default ViewToggler;
