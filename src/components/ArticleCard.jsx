import React from 'react';
import { Link } from "@reach/router";
import moment from "moment";

const ArticleCard = ( {articles} ) => {   
  return (
    <div>
      <ul className='cardlist'>
        {articles.map(article => {
          return (
            <li key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
                <br></br>
              </Link>
              Votes:{article.votes}
              <br></br>
              Comment Count : {article.comment_count}
              <br></br>
              Date posted: 
              {moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a')}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleCard;