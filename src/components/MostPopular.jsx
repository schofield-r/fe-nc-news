import React, { Component } from "react";
import { getArticles } from "./Api";
import { Link } from "@reach/router";
import ErrorMessages from "./ErrorMessages";
import Loading from "./Loading";

class MostPopular extends Component {
  state = { articles: [], isLoading: true, err: null };
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return <ul className='articleslist'>
      {this.state.articles.map(article => {
        return (
          <li key={article.article_id} className=''>
            <Link to={`/articles/${article.article_id}`}>
              {article.title}
              <br></br>
            </Link>
            Votes:{article.votes}
            <br></br>
            Comment Count : {article.comment_count}
            <br></br>
            Date posted: {article.created_at}
          </li>
        );
      })}
    </ul>
  }
  
  componentDidMount() { 
    getArticles(null, 'votes','desc')
      .then(articles => this.setState({ articles: articles, isLoading: false }))
      .catch(err => {
        console.log(err);
        this.setState({
          err: { msg: err.response.data.msg, status: err.response.status },
          isLoading: false
        });
      });
  }
}

export default MostPopular;
