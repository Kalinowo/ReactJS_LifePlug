import React from "react";
import { GlobalContext } from "../../Context/GlobalState";
import AnimeService from "../../services/anime.service";
import CustomButton from "../../UI/Button";

export default function PostAnime({ setForceRefresh }) {
  const { modalRef, setPop, turnPopOff } = React.useContext(GlobalContext);
  const [title, setTitle] = React.useState("");
  const [engName, setEngName] = React.useState("");
  const [img, setImg] = React.useState("");
  const [year, setYear] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [director, setDirector] = React.useState("");
  const [agent, setAgent] = React.useState("");
  const [producer, setProducer] = React.useState("");
  const [blurHash, setBlurHash] = React.useState("");
  const [intro, setIntro] = React.useState("");

  let inputCSS = {
    top: "-15px",
    color: "rgb(238, 248, 255)",
    textShadow: "0 0 7px rgb(183, 226, 255), 0 0 21px rgb(183, 226, 255)",
    fontSize: "12px",
  };

  const postAnime = () => {
    AnimeService.postAnime(
      title,
      engName,
      img,
      year,
      genre,
      director,
      agent,
      producer,
      blurHash,
      intro
    )
      .then((data) => {
        setForceRefresh((prev) => prev + 1);
        setPop(false);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(`錯誤:${error.response}`);
      });
  };
  return (
    <React.Fragment>
      <div className="blackCover" ref={modalRef} onClick={(e) => turnPopOff(e)}>
        <div className="postOuter">
          <form onClick={(e) => e.preventDefault()}>
            <div className="formTitle">管理員的超能力(新增動漫)</div>
            <div className="formGroup2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <label style={title !== "" ? inputCSS : {}}>動漫名稱</label>
            </div>
            <div className="formGroup2">
              <input
                value={engName}
                onChange={(e) => setEngName(e.target.value)}
              ></input>
              <label style={engName !== "" ? inputCSS : {}}>英文名稱</label>
            </div>
            <div className="formGroup2">
              <input
                value={img}
                onChange={(e) => setImg(e.target.value)}
              ></input>
              <label style={img !== "" ? inputCSS : {}}>
                圖片(pic/Anime/年分/檔案)
              </label>
            </div>
            <div className="formGroup2">
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></input>
              <label style={year !== "" ? inputCSS : {}}>年分</label>
            </div>
            <div className="formGroup2">
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              ></input>
              <label style={genre !== "" ? inputCSS : {}}>類型</label>
            </div>
            <div className="formGroup2">
              <input
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              ></input>
              <label style={director !== "" ? inputCSS : {}}>導演</label>
            </div>
            <div className="formGroup2">
              <input
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
              ></input>
              <label style={agent !== "" ? inputCSS : {}}>代理商</label>
            </div>
            <div className="formGroup2">
              <input
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
              ></input>
              <label style={producer !== "" ? inputCSS : {}}>供應商</label>
            </div>
            <div className="formGroup2">
              <input
                value={blurHash}
                onChange={(e) => setBlurHash(e.target.value)}
              ></input>
              <label style={blurHash !== "" ? inputCSS : {}}>blurHash</label>
            </div>
            <div className="formGroup2">
              <textarea
                placeholder="介紹..."
                cols="24"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              ></textarea>
            </div>
            <CustomButton children="Confirm" width="80%" onClick={postAnime} />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
