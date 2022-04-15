import React from "react";
import { Link } from "react-router-dom";

export default function AnimeTemplate(props) {
  const { AnimeData, Season } = props;

  return (
    <React.Fragment>
      {AnimeData.map(
        (list, index) =>
          list.year === Season && (
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
          )
      )}
    </React.Fragment>
  );
}
