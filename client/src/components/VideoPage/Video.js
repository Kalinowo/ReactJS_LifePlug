import React, { useRef } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import NavbarTemplate from "../Nav/NavTemplate";
import AnimeService from "../../services/anime.service";
import HistoryService from "../../services/history.service";
import UploadEpisode from "../AdminPower/UploadEpisode";
import YouTube from "react-youtube";
import { useNavigate, useParams, Link } from "react-router-dom";

import Intro from "./Intro";
import Comment from "./Comment";

export default function Video(props) {
  const { pop, setPop, theme } = React.useContext(GlobalContext);
  const [anime, setAnime] = React.useState(null);
  const [lastWatch, setLastWatch] = React.useState(null);
  const [forceRefresh, setForceRefresh] = React.useState(0);
  let navigate = useNavigate();
  let params = useParams();
  let animeLink = params.animeLink;
  let { currentUser } = props;

  let remoteControl = useRef();

  React.useEffect(() => {
    AnimeService.getOne(animeLink).then((data) => {
      remoteControl.current = data.data[0].episode[params.episode - 1];
      setAnime(data.data);
    });
    //eslint-disable-next-line
  }, [forceRefresh, params.episode]);

  if (remoteControl.current) {
    var videoCode = remoteControl.current.split("v=")[1].split("&")[0];
  }

  const youtubeState = (e) => {
    console.log(e.target.playerInfo.playerState);
    // const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();

    let user_id = currentUser.user._id;
    let title = anime[0].title;
    let engName = anime[0].engName;
    let img = anime[0].img;
    let episode = params.episode;
    let length = anime[0].episode.length;

    switch (e.data) {
      case -1:
        console.log("暫停");
        break;
      case 0:
        console.log("影片結束");
        break;
      case 1:
        HistoryService.post(
          user_id,
          title,
          engName,
          img,
          episode,
          length,
          currentTime
        )
          .then((update) => {
            if (update.data === "資料遭到串改") {
              localStorage.removeItem("user");
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });

        AnimeService.postView(user_id, title)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 2:
        HistoryService.post(
          user_id,
          title,
          engName,
          img,
          episode,
          length,
          currentTime
        )
          .then((update) => {
            if (update.data === "資料遭到串改") {
              localStorage.removeItem("user");
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 3:
        console.log("buffering");
        break;
      case 5:
        console.log("影片嵌入");
        break;
      default:
        console.log("錯誤");
    }
  };

  function deleteEpisode(link) {
    AnimeService.deleteOne(link).then((res) => {
      setForceRefresh((prev) => prev + 1);
      if (link === remoteControl.current) {
        navigate(-1);
      }
    });
  }

  console.log(remoteControl);

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  React.useEffect(() => {
    if (anime !== null) {
      let user_id = currentUser.user._id;
      let title = anime[0].title;
      HistoryService.getLastWatch(title, user_id).then((data) => {
        if (data.data.length !== 0) {
          setLastWatch(data.data);
        }
      });
    }
    //eslint-disable-next-line
  }, [anime]);

  return (
    <React.Fragment>
      {anime !== null && (
        <div className="videoOuter" data-theme={theme}>
          <div className="videoTitle">{anime[0].title}</div>
          <div className="embedOuter">
            {anime[0].episode.length !== 0 && (
              <YouTube
                videoId={videoCode}
                className="embedStyle"
                opts={opts}
                onStateChange={youtubeState}
              />
            )}
          </div>
          <div className="episodeTitle">
            {anime[0].title}[{params.episode}]
          </div>
          <div className="episodeOuter">
            {anime[0].episode.map((episode, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="episodeBox">
                    {currentUser && currentUser.user.role === "Admin" && (
                      <div className="removeBox">
                        <div
                          className="remove"
                          onClick={() => deleteEpisode(episode)}
                        >
                          Remove
                        </div>
                        <i className="fas fa-times"></i>
                      </div>
                    )}
                    <Link to={`/LifePlug/video/${animeLink}/${index + 1}`}>
                      <button
                        className={
                          lastWatch !== null
                            ? lastWatch[0].episode === index + 1
                              ? "episodeBtn lastWatch"
                              : "episodeBtn"
                            : "episodeBtn"
                        }
                        style={
                          episode === remoteControl.current
                            ? { background: "lightblue" }
                            : null
                        }
                      >
                        {index + 1}
                      </button>
                    </Link>
                  </div>
                </React.Fragment>
              );
            })}
            {pop === true && (
              <UploadEpisode Anime={anime} setForceRefresh={setForceRefresh} />
            )}
            {currentUser && currentUser.user.role === "Admin" && (
              <div className="uploadEpisodeOuter">
                <div className="circle" onClick={() => setPop(true)}>
                  <i className="fas fa-plus"></i>
                </div>
              </div>
            )}
          </div>
          <div className="videoDetailOuter">
            <ul className="videoDetailBox">
              <li>
                <span>作品類型</span>
                {anime[0].genre}
              </li>
              <li>
                <span>導演監督</span>
                {anime[0].director}
              </li>

              <li>
                <span>台灣代理</span>
                {anime[0].agent}
              </li>
              <li>
                <span>製作廠商</span>
                {anime[0].producer}
              </li>
            </ul>
          </div>
          <Intro Anime={anime} />
          <Comment title={anime[0].title} ep={params.episode} {...props} />
        </div>
      )}
    </React.Fragment>
  );
}
