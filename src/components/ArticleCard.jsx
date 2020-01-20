import React from 'react';
import { Link } from "@reach/router";

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
              Date posted: {article.created_at}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ArticleCard;