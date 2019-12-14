import Axios from "axios";

export const getArticles = (topic, sort_by, order) => {
  return Axios.get(`https://nc-news-rs.herokuapp.com/api/articles`, {
    params: { topic, sort_by, order }
  }).then(({ data }) => {
    return data.articles;
  });
};

export const getTopics = () => {
  return Axios.get("https://nc-news-rs.herokuapp.com/api/topics").then(
    ({ data }) => {
      return data.topics;
    }
  );
};

export const getSingleArticle = article_id => {
  return Axios.get(
    `https://nc-news-rs.herokuapp.com/api/articles/${article_id}`
  ).then(({ data }) => {
    return data.article;
  });
};
export const patchVotes = (type, id, voteChange) => {
  return Axios.patch(`https://nc-news-rs.herokuapp.com/api/${type}/${id}`, {
    inc_votes: voteChange
  }).then(({ data }) => {
    console.log(data);
    return data;
  });
};
export const postComment = (article_id, username, body) => {
  return Axios.post(
    `https://nc-news-rs.herokuapp.com/api/articles/${article_id}/comments`,
    { username: username, body: body }
  ).then(({ data }) => {
    return data.comment;
  });
};

export const getUser = username => {
  return Axios.get(
    `https://nc-news-rs.herokuapp.com/api/users/${username}`
  ).then(({ data }) => {
    return data.user;
  });
};
export const deleteComment = comment_id => {
  return Axios.delete(
    `https://nc-news-rs.herokuapp.com/api/comments/${comment_id}`
  );
};
export const getComments = article_id => {
  return Axios.get(
    `https://nc-news-rs.herokuapp.com/api/articles/${article_id}/comments`
  ).then(({ data }) => {
    return data.comments;
  });
};
