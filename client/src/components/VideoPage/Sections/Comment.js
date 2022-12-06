import React from "react";
import CommentService from "../../../services/comment.service";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

export default function Comment(props) {
  let { currentUser, commentLists, title, ep, refreshFunction } = props;
  let [message, setMessage] = React.useState("");
  let episode = title + "[" + ep + "]";

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: message,
      episode,
    };

    CommentService.post(variable)
      .then((res) => {
        setMessage("");
        refreshFunction(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="videoCommentOuter">
      <div className="title">留言區</div>
      <div className="postCommentBox">
        <div className="imgBox">
          <img className="image" src={currentUser.user.picture} alt="userImg" />
        </div>
        <div className="inputBox">
          <form onSubmit={onSubmit}>
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
              <button className="btn" onClick={onSubmit}>
                留言
              </button>
            </div>
            <div className="underline"></div>
          </form>
        </div>
      </div>
      <div className="commentOuter">
        {commentLists &&
          commentLists.map(
            (comment, index) =>
              !comment.responseTo && (
                <React.Fragment key={comment._id}>
                  <SingleComment
                    comment={comment}
                    episode={episode}
                    refreshFunction={refreshFunction}
                    hostCommentId={comment._id}
                  />
                  <ReplyComment
                    commentLists={commentLists}
                    parentCommentId={comment._id}
                    episode={episode}
                    refreshFunction={refreshFunction}
                    hostCommentId={comment._id}
                  />
                </React.Fragment>
              )
          )}
      </div>
    </div>
  );
}
