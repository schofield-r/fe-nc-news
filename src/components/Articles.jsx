import React, { Component } from "react";
import { getArticles } from "./Api";
import {Link} from '@reach/router';
import ErrorMessages from '../components/ErrorMessages'

class Articles extends Component {
  state = { articles: [], isLoading:true, sort_by:'',order:'' ,err:null};

  render() {
    const { articles} = this.state
    //console.log(articles, "here");
    if(this.state.isLoading){
      return(<section>

        <p>Loading...</p>
        <img src='https://assets.materialup.com/uploads/497a3ff8-45b5-4a0b-84f5-542153c586db/preview.gif'/>
      </section>
      )
    } if (this.state.err) {
      return <ErrorMessages err={this.state.err} />;
    }
    return (
      <main><label htmlFor="searchBy">Search By:</label>
        <select value={this.state.sort_by} onChange={this.handleSortByChange}>
          
          <option value='created_at'>Date Posted</option>
          <option value='votes'>Votes</option>
          <option value='comment_count'>Comment Count</option>
        </select>
        <select value={this.state.order} onChange={this.handleOrderChange}>
          <option value='asc'>Ascending</option>
          <option value='desc'>Decending</option>
        </select>
        <h2>{this.props.topic||'All Articles'}</h2>
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`} >{article.title}<br></br>
                </Link>
                Votes:{article.votes}
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
  componentDidMount() {
   // console.log(this.props.topic,'props')
    getArticles(this.props.topic).then(articles=>
      this.setState({articles:articles,isLoading:false})
    ).catch(err => { console.dir(err)
      // this.setState({
        // err: { msg: err.response.data.msg, status: err.response.status },
        // isLoading: false
      })
    //})
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.topic !== this.props.topic||this.state.sort_by !== prevState.sort_by||this.state.order !== prevState.order){
      getArticles(this.props.topic,this.state.sort_by,this.state.order).then(articles=>{
        this.setState({ articles: articles, isLoading: false})
      })
      //console.log(this.props.topic,'updated')
    }
  }
  handleSortByChange=(event)=>{
    this.setState({sort_by:event.target.value})
  }
  handleOrderChange=(event)=>{
    this.setState({order:event.target.value})
    console.log('changedorder')
  }
}

export default Articles;
