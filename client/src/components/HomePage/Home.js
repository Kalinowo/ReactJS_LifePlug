import React, { Suspense } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import AnimeService from "../../services/anime.service";
// import AnimeSeasonContainer from "./Anime/AnimeSeasonContainer";
import AnimeSearchPage from "./Anime/AnimeSearchPage";
const PostAnime = React.lazy(() => import("../AdminPower/PostAnime"));
const AnimeSeasonContainer = React.lazy(() =>
  import("./Anime/AnimeSeasonContainer")
);

export default function HomePage(props) {
  const { pop, setPop, theme } = React.useContext(GlobalContext);
  let { currentUser, setCurrentUser } = props;
  const [animeData, setAnimeData] = React.useState(null);
  const [getEveryAnime, setEveryAnime] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [forceRefresh, setForceRefresh] = React.useState(0);

  const [showLimit, setShowLimit] = React.useState(5);

  React.useEffect(() => {
    document.title = "LifePlug";
  }, []);

  React.useEffect(() => {
    AnimeService.getEveryAnime().then((data) => {
      setEveryAnime(data.data);
    });
  }, []);

  React.useEffect(() => {
    AnimeService.getListOfSeason().then((data) => {
      let dataToArray = data.data.map((obj) => obj.year);
      let unique = [...new Set(dataToArray)];
      let firstData = [];
      for (let i = 0; i < unique.length; i++) {
        let step1 = unique[i].split("");
        let step2 = step1.slice(3, 7);
        let step3 = step2.join("");
        firstData.push(step3);
      }
      firstData.sort((a, b) => a - b);
      let counter = 0;

      for (let i = 0; i < unique.length; i++) {
        if (counter === 0) {
          firstData[i] += "(十月秋番)";
        }
        if (counter === 1) {
          firstData[i] += "(一月冬番)";
        }
        if (counter === 2) {
          firstData[i] += "(四月春番)";
        }
        if (counter === 3) {
          firstData[i] += "(七月夏番)";
          counter = 0;
          continue;
        }
        counter++;
      }
      firstData.reverse();
      setAnimeData(firstData);
    });
  }, []);

  const addMoreLimit = () => {
    setShowLimit((prev) => prev + 3);
  };

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
        {searchTerm && (
          <AnimeSearchPage animeData={getEveryAnime} searchTerm={searchTerm} />
        )}
        {animeData &&
          !searchTerm &&
          animeData.slice(0, showLimit).map((season, index) => (
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                    height: "100px",
                  }}
                >
                  Loading...
                </div>
              }
            >
              <AnimeSeasonContainer key={index} season={season} />
            </Suspense>
          ))}
        {/* 顯示更多 */}
        {animeData && !searchTerm && showLimit <= animeData.length && (
          <div className="loadBtnOuter" onClick={addMoreLimit}>
            <div className="loadBtn">Load more</div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
