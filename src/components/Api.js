import Axios from "axios";

export const getArticles = (topic, sort_by, order, author) => {
  return Axios.get(`https://nc-news-rms.herokuapp.com/api/articles`, {
    params: { topic, sort_by, order, author }
  }).then(({ data }) => {
    return data.articles;
  });
};

export const getTopics = () => {
  return Axios.get("https://nc-news-rms.herokuapp.com/api/topics").then(
    ({ data }) => {
      return data.topics;
    }
  );
};

export const getSingleArticle = article_id => {
  return Axios.get(
    `https://nc-news-rms.herokuapp.com/api/articles/${article_id}`
  ).then(({ data }) => {
    return data.article;
  });
};
export const patchVotes = (type, id, voteChange) => {
  return Axios.patch(`https://nc-news-rms.herokuapp.com/api/${type}/${id}`, {
    inc_votes: voteChange
  }).then(({ data }) => {
    console.log(data);
    return data;
  });
};
export const postComment = (article_id, username, body) => {
  return Axios.post(
    `https://nc-news-rms.herokuapp.com/api/articles/${article_id}/comments`,
    { username: username, body: body }
  ).then(({ data }) => {
    return data.comment;
  });
};

export const getUser = username => {
  return Axios.get(
    `https://nc-news-rms.herokuapp.com/api/users/${username}`
  ).then(({ data }) => {
    return data.user;
  });
};
export const deleteComment = comment_id => {
  return Axios.delete(
    `https://nc-news-rms.herokuapp.com/api/comments/${comment_id}`
  );
};
export const getComments = (article_id, sort_by, order) => {
  return Axios.get(
    `https://nc-news-rms.herokuapp.com/api/articles/${article_id}/comments`,
    { params: { sort_by, order } }
  ).then(({ data }) => {
    return data.comments;
  });
};
export const getUsers = () => {
  return Axios.get("https://nc-news-rms.herokuapp.com/api/users").then(
    ({ data }) => {
      return data.users;
    }
  );
};
export const postUser = (username, name, avatar_url) => {
  return Axios.post("https://nc-news-rms.herokuapp.com/api/users", {
    username: username,
    name: name,
    avatar_url: avatar_url
  }).then(({ data }) => {
    return data.user;
  });
};
export const postTopic = (slug, description) => {
  return Axios.post("https://nc-news-rms.herokuapp.com/api/topics", {
    slug: slug,
    description: description
  }).then(({ data }) => {
    return data.topic;
  });
};
export const postArticle = (title,topic,author,body)=>{
  return Axios.post('https://nc-news-rms.herokuapp.com/api/articles/',{title:title,topic:topic,author:author,body:body}).then(({data})=>{
    return data.article
  })
}
