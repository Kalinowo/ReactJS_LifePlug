import React from "react";

export default function Intro(props) {
  let anime = props.Anime;
  let [openIntro, setOpenIntro] = React.useState(false);
  return (
    <div className="videoIntroOuter">
      <div className="title">劇情簡介</div>
      <div
        className="intro"
        style={openIntro ? { maxHeight: "150px" } : { maxHeight: "0px" }}
      >
        &emsp;{anime[0].intro}
      </div>
      <button
        className="btn"
        style={{ width: "100%" }}
        onClick={() => setOpenIntro(!openIntro)}
      >
        {openIntro ? "收起" : "展開"}
      </button>
    </div>
  );
}
