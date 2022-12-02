import React from "react";
import AnimeService from "../../../services/anime.service";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";

export default function AnimeSeasonContainer(props) {
  const [animeData, setAnimeData] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true);
  let { season, forceRefresh } = props;
  React.useEffect(() => {
    let getSeasonYear = season.substring(0, 4);
    let getSeasonMonth = season.substring(5, 6);

    let mongoFilter;

    if (getSeasonMonth === "一") {
      mongoFilter = "Win" + getSeasonYear;
    }
    if (getSeasonMonth === "四") {
      mongoFilter = "Spr" + getSeasonYear;
    }
    if (getSeasonMonth === "七") {
      mongoFilter = "Sum" + getSeasonYear;
    }
    if (getSeasonMonth === "十") {
      mongoFilter = "Fal" + getSeasonYear;
    }
    AnimeService.getFilteredAnimeBySeason(mongoFilter).then((data) => {
      setAnimeData(data.data);
    });
  }, [forceRefresh]);

  React.useEffect(() => {
    if (!isLoaded) {
      return;
    }
  }, []);
  const handleLoad = () => {
    setIsLoaded(false);
  };

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
                  <img
                    src={list.img}
                    className="img"
                    alt={list.engName}
                    onLoad={handleLoad}
                  />
                  <div className="latestEpisode">
                    更新至第{list.episode.length}集
                  </div>
                  <div className="views">
                    <i className="fas fa-eye"></i>
                    <div className="numbers">{list.view.length}</div>
                  </div>
                </div>
                <div className="animeNameBox">
                  <div className={list.title.length > 12 ? "scroll" : "name"}>
                    {list.title}
                  </div>
                </div>
                {isLoaded && (
                  <div className="styledBlur">
                    <Blurhash
                      hash={list.blurHash}
                      width="100%"
                      height="100%"
                      resolutionX={32}
                      resolutionY={32}
                      punch={1}
                    />
                  </div>
                )}
              </Link>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
