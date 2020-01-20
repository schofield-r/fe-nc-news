import React, { Component } from "react";

class SearchBar extends Component {
  state = { searchTerm: "", searchParams: "" };
  render() {
    return (
      <div>
        <form>
          <label htmlFor="searchTerm">Search {this.props.searchParams}</label>
          <input
            onChange={this.handleChange}
            value={this.state.searchTerm}
            placeholder="Search"
          ></input>
        </form>
        { this.props.children}
      </div>
    );
  }
  handleChange = event => {
    const { value } = event.target;
    this.set;
  };
}

export default SearchBar;
