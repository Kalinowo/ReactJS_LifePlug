import React from "react";
import AnimeService from "../../../services/anime.service";
import { Link } from "react-router-dom";

export default function AnimeSeasonContainer(props) {
  const [animeData, setAnimeData] = React.useState(null);
  let { season } = props;
  React.useEffect(() => {
    let step1 = season.split("");
    let step2 = step1.slice(0, 4);
    let step3 = step2.join("");
    let step4 = step1.slice(5, 6);
    let step5 = step4.join("");
    let mongoFilter;
    if (step5 === "一") {
      mongoFilter = "Win" + step3;
    }
    if (step5 === "四") {
      mongoFilter = "Spr" + step3;
    }
    if (step5 === "七") {
      mongoFilter = "Sum" + step3;
    }
    if (step5 === "十") {
      mongoFilter = "Fal" + step3;
    }
    AnimeService.getListOfAnime(mongoFilter).then((data) => {
      setAnimeData(data.data);
    });
  }, []);

  return (
    <div>
      <div className="videoTitleBox">
        <div className="title">{season}</div>
      </div>
      <div className="animeListOuter">
        {animeData &&
          animeData.map((list, index) => (
            <React.Fragment key={index}>
              <Link
                className="animeListBox"
                to={`/LifePlug/video/${list.engName}/${list.episode.length}`}
              >
                <div className="animeListImgBox">
                  <img src={list.img} className="img" alt={list.engName} />
                  <div className="latestEpisode">
                    更新至第{list.episode.length}集
                  </div>
                  <div className="views">
                    <i className="fas fa-eye"></i>
                    <div className="numbers">{list.view.length}</div>
                  </div>
                </div>
                <div className="animeNameBox">
                  <div className="name">{list.title}</div>
                </div>
              </Link>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
