import React from "react";
import SingleComment from "./SingleComment";
import CustomButton from "../../../UI/Button";

export default function ReplyComment(props) {
  let {
    commentLists,
    parentCommentId,
    hostCommentId,
    episode,
    refreshFunction,
  } = props;

  const [childCommentNumber, setChildcommentNumber] = React.useState(0);
  const [openReplyComments, setOpenReplyComments] = React.useState(false);

  React.useEffect(() => {
    const commentNumber = commentLists.reduce((acc, comment) => {
      if (comment.host && comment.host === hostCommentId) {
        return acc + 1;
      }
      return acc + 0;
    }, 0);

    setChildcommentNumber(commentNumber);
  }, [commentLists]);

  let renderReplyComment = (parentCommentId) =>
    commentLists.map((comment, index) => (
      <React.Fragment key={comment._id}>
        {comment.host === hostCommentId && (
          <div>
            <SingleComment
              comment={comment}
              episode={episode}
              refreshFunction={refreshFunction}
              hostCommentId={hostCommentId}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const test = () => (
    <div className="content">
      <i
        className={openReplyComments ? "fa fa-caret-down" : "fa fa-caret-up"}
      ></i>
      <div className="text">{`view ${childCommentNumber} more comments`}</div>
    </div>
  );

  const handleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <>
      {childCommentNumber && childCommentNumber > 0 && (
        // <p className="viewMore">View {childCommentNumber} more comments</p>
        <div className="viewMoreContainer">
          <CustomButton
            children={test()}
            height="30px"
            width="auto"
            onClick={handleChange}
          />
        </div>
      )}
      {openReplyComments && (
        <div className="replyContainer" style={{ marginLeft: "50px" }}>
          {renderReplyComment(parentCommentId)}
        </div>
      )}
    </>
  );
}
