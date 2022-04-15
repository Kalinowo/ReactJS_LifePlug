import axios from "axios";
const API_URL = "http://localhost:4000/api/comments";

class CommentService {
  post(comment, episode, type) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/comment",
      {
        comment,
        episode,
        type,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  reply(comment, replyTo) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/reply",
      {
        comment,
        replyTo,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getComment(episode) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/getComment", {
      params: {
        episode: episode,
      },
      headers: {
        Authorization: token,
      },
    });
  }

  thumbs(_id, thumb, user_id, type) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/thumbs",
      {
        _id,
        thumb,
        user_id,
        type,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  pullThumb(_id, thumb, user_id, type) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/cancelthumb",
      {
        _id,
        thumb,
        user_id,
        type,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  deleteComment(_id, user_id, type) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/comment", {
      params: {
        _id: _id,
        user_id: user_id,
        type,
      },
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new CommentService();
