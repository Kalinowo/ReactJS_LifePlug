import React from "react";
import CommentService from "../../services/comment.service";
import { useNavigate } from "react-router-dom";
import CommentList from "./CommentList";

export default function Comment(props) {
  let { title, ep, currentUser } = props;
  let [message, setMessage] = React.useState("");
  let [msgList, setMsgList] = React.useState(null);
  let episode = title + "[" + ep + "]";
  let navigate = useNavigate();
  let [order, setOrder] = React.useState("like");
  let [forceRefresh, setForceRefresh] = React.useState(0);

  React.useEffect(() => {
    CommentService.getComment(episode).then((data) => {
      setMsgList(
        order === "like"
          ? data.data.sort((a, b) => (a.like.length < b.like.length ? 1 : -1))
          : data.data.sort((a, b) =>
              Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
            )
      );
    });
    //eslint-disable-next-line
  }, [order, forceRefresh]);

  function postComment(type) {
    CommentService.post(message, episode, type).then((res) => {
      setMessage("");
      setForceRefresh((prev) => prev + 1);
    });
  }

  function patchThumb(_id, thumb, type) {
    let user_id = currentUser.user._id;
    CommentService.thumbs(_id, thumb, user_id, type).then((res) => {
      if (res.data === "資料遭到串改") {
        localStorage.removeItem("user");
        navigate("/");
      } else {
        setForceRefresh((prev) => prev + 1);
      }
    });
  }

  function cancelThumb(_id, thumb, type) {
    let user_id = currentUser.user._id;
    CommentService.pullThumb(_id, thumb, user_id, type).then((res) => {
      if (res.data === "資料遭到串改") {
        localStorage.removeItem("user");
        navigate("/");
      } else {
        setForceRefresh((prev) => prev + 1);
      }
    });
  }

  function deleteTrigger(_id, type) {
    let user_id = currentUser.user._id;
    CommentService.deleteComment(_id, user_id, type).then((res) => {
      setForceRefresh((prev) => prev + 1);
    });
  }

  return (
    <div className="videoCommentOuter">
      <div className="title">留言區</div>
      <div className="postCommentBox">
        <div className="imgBox">
          <img className="image" src={currentUser.user.picture} alt="userImg" />
        </div>
        <div className="inputBox">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="留言..."
            ></input>
            {message && (
              <i
                className="far fa-times-circle"
                onClick={() => setMessage("")}
              ></i>
            )}
            <div className="confirmBox">
              <button className="btn" onClick={() => postComment("comment")}>
                留言
              </button>
            </div>
            <div className="underline"></div>
          </form>
        </div>
      </div>
      <div className="commentOuter">
        <div className="commentOrderBox">
          <button
            className="hot"
            onClick={() => setOrder("like")}
            style={
              order === "like"
                ? {
                    background: "rgba(111, 131, 111, 0.8)",
                    color: "white",
                    textShadow: "1px 1px 3px black",
                  }
                : {}
            }
          >
            熱門
          </button>
          <button
            className="newest"
            onClick={() => setOrder("newest")}
            style={
              order === "newest"
                ? {
                    background: "rgba(111, 131, 111, 0.8)",
                    color: "white",
                    textShadow: "1px 1px 3px black",
                  }
                : {}
            }
          >
            最新
          </button>
        </div>
        {msgList !== null &&
          msgList.map(
            (msg, index) =>
              msg.episode === episode && (
                <div className="seperate" key={msg._id}>
                  <CommentList
                    setForceRefresh={setForceRefresh}
                    msg={msg}
                    index={index}
                    patchThumb={patchThumb}
                    cancelThumb={cancelThumb}
                    deleteTrigger={deleteTrigger}
                    {...props}
                  />
                </div>
              )
          )}
      </div>
    </div>
  );
}
