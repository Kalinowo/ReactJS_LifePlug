import React from "react";
import AnimeService from "../../../services/anime.service";
import { Link } from "react-router-dom";

export default function AnimeSearchPage(props) {
  const [searchData, setSearchData] = React.useState(null);

  let { searchTerm, animeData } = props;

  React.useEffect(() => {
    if (animeData !== null) {
      setSearchData(
        animeData.filter((anime) => {
          if (anime.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return anime;
          } else {
            return false;
          }
        })
      );
    }
    //eslint-disable-next-line
  }, [searchTerm]);

  console.log(searchData);

  return (
    <>
      <div className="animeListOuter">
        {searchData && searchData.length === 0 && (
          <div className="notFound">沒有搜尋到動畫</div>
        )}
        {searchData &&
          searchData.map((list, index) => (
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
    </>
  );
}
