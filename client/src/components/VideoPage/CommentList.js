import React from "react";
import CommentService from "../../services/comment.service";

export default function CommentList(props) {
  let {
    currentUser,
    setForceRefresh,
    msg,
    index,
    patchThumb,
    cancelThumb,
    deleteTrigger,
  } = props;
  let [re_message, setRe_Message] = React.useState("");
  let [openReply, setOpenReply] = React.useState(null);

  function postReply(replyTo) {
    CommentService.reply(re_message, replyTo).then((res) => {
      setRe_Message("");
      setOpenReply(null);
      setForceRefresh((prev) => prev + 1);
    });
  }

  function openReplyTrigger(index) {
    if (openReply === null || openReply !== index) {
      setOpenReply(index);
    } else {
      setOpenReply(null);
    }
  }

  return (
    <React.Fragment>
      <div className="commentListBox">
        <div className="imgBox">
          <img className="image" src={msg.user.picture} alt="" />
        </div>
        <div className="inputBox">
          <div className="userBox">
            <div className="floor">樓主</div>
            <div className="user">{msg.user.username}</div>
            <div className="date">
              {new Date(msg.date).toLocaleString("zh-TW", {
                hour12: false,
              })}
            </div>
          </div>
          <div className="msg">{msg.comment}</div>
          <div className="thumbs">
            {/* like */}
            {msg.like.includes(currentUser.user._id) ? (
              <i
                className="like fas fa-thumbs-up"
                onClick={() => cancelThumb(msg._id, "like", "comment")}
              >
                &nbsp;
                {msg.like.length > 0 ? msg.like.length : ""}
              </i>
            ) : (
              <i
                className="like far fa-thumbs-up"
                onClick={() => patchThumb(msg._id, "like", "comment")}
              >
                &nbsp;
                {msg.like.length > 0 ? msg.like.length : ""}
              </i>
            )}
            {/* dislike */}
            {msg.dislike.includes(currentUser.user._id) ? (
              <i
                className="dislike fas fa-thumbs-down"
                onClick={() => cancelThumb(msg._id, "dislike", "comment")}
              >
                &nbsp;
                {msg.dislike.length > 0 ? msg.dislike.length : ""}
              </i>
            ) : (
              <i
                className="dislike far fa-thumbs-down"
                onClick={() => patchThumb(msg._id, "dislike", "comment")}
              >
                &nbsp;
                {msg.dislike.length > 0 ? msg.dislike.length : ""}
              </i>
            )}
            <button
              className="replyTrigger"
              onClick={() => openReplyTrigger(index)}
            >
              回覆
            </button>
            {msg.user._id === currentUser.user._id && (
              <button
                className="deleteTrigger"
                onClick={() => deleteTrigger(msg._id, "comment")}
              >
                刪除
              </button>
            )}
          </div>
          {openReply === index && (
            <div className="replyInput">
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    value={re_message}
                    placeholder="輸入回覆..."
                    onChange={(e) => setRe_Message(e.target.value)}
                  ></input>
                  <button onClick={() => postReply(msg._id)}>確定</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {/*reply區*/}
      {msg.reply.map((value, index) => (
        <React.Fragment key={index}>
          <div className="replyListBox">
            <div className="imgBox">
              <img className="image" src={value.user.picture} alt="" />
            </div>
            <div className="inputBox">
              <div className="userBox">
                <div className="floor">{index + 2}樓</div>
                <div className="user">{value.user.username}</div>
                <div className="date">
                  {new Date(value.date).toLocaleString("zh-TW", {
                    hour12: false,
                  })}
                </div>
              </div>
              <div
                className="msg"
                style={value.comment ? {} : { fontStyle: "italic" }}
              >
                {value.comment !== null
                  ? value.comment
                  : `已由原作者(${value.user.username})刪除`}
              </div>
              <div className="thumbs">
                {/* like */}
                {value.like.includes(currentUser.user._id) ? (
                  <i
                    className="like fas fa-thumbs-up"
                    onClick={() => cancelThumb(msg._id, "like", index)}
                  >
                    &nbsp;
                    {value.like.length > 0 ? value.like.length : ""}
                  </i>
                ) : (
                  <i
                    className="like far fa-thumbs-up"
                    onClick={() => patchThumb(msg._id, "like", index)}
                  >
                    &nbsp;
                    {value.like.length > 0 ? value.like.length : ""}
                  </i>
                )}
                {/* dislike */}
                {value.dislike.includes(currentUser.user._id) ? (
                  <i
                    className="dislike fas fa-thumbs-down"
                    onClick={() => cancelThumb(msg._id, "dislike", index)}
                  >
                    &nbsp;
                    {value.dislike.length > 0 ? value.dislike.length : ""}
                  </i>
                ) : (
                  <i
                    className="dislike far fa-thumbs-down"
                    onClick={() => patchThumb(msg._id, "dislike", index)}
                  >
                    &nbsp;
                    {value.dislike.length > 0 ? value.dislike.length : ""}
                  </i>
                )}
                {value.user._id === currentUser.user._id && (
                  <button
                    className="deleteTrigger"
                    onClick={() => deleteTrigger(msg._id, index)}
                    style={value.comment ? {} : { display: "none" }}
                  >
                    刪除
                  </button>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
