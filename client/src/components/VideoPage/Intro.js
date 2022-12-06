import React from "react";

export default function Intro(props) {
  let anime = props.Anime;
  let [openIntro, setOpenIntro] = React.useState(false);
  return (
    <div className="videoIntroOuter">
      <div className="title">劇情簡介</div>
      <div className="introWrapper">
        <button
          className="btn"
          style={{ width: "100%" }}
          onClick={() => setOpenIntro(!openIntro)}
        >
          {openIntro ? "只顯示部分內容" : "顯示完整內容"}
        </button>
        <div
          className={openIntro ? "intro" : "intro open"}
          style={openIntro ? null : { maxHeight: "20px" }}
          onClick={() => setOpenIntro(!openIntro)}
        >
          &emsp;{anime[0].intro}
        </div>
      </div>
    </div>
  );
}
