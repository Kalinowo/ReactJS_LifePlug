import React, { Suspense } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import AnimeService from "../../services/anime.service";
// import AnimeTemplate from "../Anime/AnimeTemplate";
import { Link } from "react-router-dom";
import Loading from "../Loading";
const AnimeTemplate = React.lazy(() => import("../Anime/AnimeTemplate"));
const PostAnime = React.lazy(() => import("../AdminPower/PostAnime"));

export default function HomePage(props) {
  const { pop, setPop, theme } = React.useContext(GlobalContext);
  let { currentUser, setCurrentUser } = props;
  const [animeData, setAnimeData] = React.useState(null);
  const [searchData, setSearchData] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [forceRefresh, setForceRefresh] = React.useState(0);

  React.useEffect(() => {
    AnimeService.getAnime().then((data) => {
      setAnimeData(data.data);
    });
  }, [forceRefresh]);

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

  return (
    <React.Fragment>
      <Suspense fallback={<></>}>
        {currentUser.user.role === "Admin" && pop === true && (
          <PostAnime setForceRefresh={setForceRefresh} />
        )}
      </Suspense>
      <div className="homePageOuter" data-theme={theme}>
        <form className="searchOuter" onSubmit={(e) => e.preventDefault()}>
          <input
            className="searchForm"
            value={searchTerm}
            type="text"
            placeholder="search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button className="searchIconBtn" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        {currentUser && currentUser.user.role === "Admin" && (
          <div className="AdminPostBtnOuter">
            <button className="postBtn" onClick={() => setPop(true)}>
              post Anime
            </button>
          </div>
        )}
        {searchTerm !== "" && searchData !== null ? (
          searchData.length !== 0 ? (
            <div className="animeListOuter">
              {searchData.map((list, index) => (
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
          ) : (
            <div className="notFound">沒有搜尋到動畫</div>
          )
        ) : (
          <div>
            <div className="videoTitleBox">
              <div className="title">2021(四月春番)</div>
            </div>
            <Suspense fallback={<Loading />}>
              <div className="animeListOuter">
                {animeData !== null && (
                  <AnimeTemplate AnimeData={animeData} Season={"Spr2021"} />
                )}
              </div>
            </Suspense>
            <div className="videoTitleBox">
              <div className="title">2021(一月冬番)</div>
            </div>
            <Suspense fallback={<Loading />}>
              <div className="animeListOuter">
                {animeData !== null && (
                  <AnimeTemplate AnimeData={animeData} Season={"Win2021"} />
                )}
              </div>
            </Suspense>
            <div className="videoTitleBox">
              <div className="title">2020(十月秋番)</div>
            </div>
            <Suspense fallback={<Loading />}>
              <div className="animeListOuter">
                {animeData !== null && (
                  <AnimeTemplate AnimeData={animeData} Season={"Fal2020"} />
                )}
              </div>
            </Suspense>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
