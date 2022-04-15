import React from "react";
import { GlobalContext } from "../../Context/GlobalState";
import AnimeService from "../../services/anime.service";

export default function UploadEpisode(props) {
  const { modalRef, setPop, turnPopOff } = React.useContext(GlobalContext);
  let [link, setLink] = React.useState("");

  let inputCSS = {
    top: "-15px",
    color: "rgb(238, 248, 255)",
    textShadow: "0 0 7px rgb(183, 226, 255), 0 0 21px rgb(183, 226, 255)",
    fontSize: "12px",
  };

  const postEpisode = () => {
    let title = props.Anime[0].title;
    AnimeService.postEpisode(link, title).then((data) => {
      props.setForceRefresh((prev) => prev + 1);
      setPop(false);
    });
  };

  return (
    <React.Fragment>
      <div className="blackCover" ref={modalRef} onClick={(e) => turnPopOff(e)}>
        <div className="postOuter" style={{ top: "40%" }}>
          <form onClick={(e) => e.preventDefault()}>
            <div className="formTitle">管理員的超能力(新增集數)</div>
            <div className="formGroup2">
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
              ></input>
              <label style={link !== "" ? inputCSS : {}}>網址</label>
            </div>
            <button className="submitBtn" onClick={postEpisode}>
              新增
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
