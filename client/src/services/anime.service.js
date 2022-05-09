import axios from "axios";
const API_URL = "http://localhost:4000/api/animes";

class AnimeService {
  post(title, engName, img, year, genre, director, agent, producer, intro) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      {
        title,
        engName,
        img,
        year,
        genre,
        director,
        agent,
        producer,
        intro,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  postEpisode(link, title) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/uploadEpisode",
      {
        link,
        title,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getEveryAnime() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/everyAnime", {
      headers: {
        Authorization: token,
      },
    });
  }

  getListOfAnime(season) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/" + season, {
      headers: {
        Authorization: token,
      },
    });
  }

  getListOfSeason() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/getListOfSeason", {
      headers: {
        Authorization: token,
      },
    });
  }

  getOne(one) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/video/" + one, {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteOne(link) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/video/deleteOne", {
      params: {
        link: link,
      },
      headers: {
        Authorization: token,
      },
    });
  }

  postView(user_id, title) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/click",
      {
        user_id,
        title,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new AnimeService();
