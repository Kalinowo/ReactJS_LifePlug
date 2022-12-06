import React from "react";
import "./styles/style.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalState";
import Video from "./components/VideoPage/Video";
import WatchHistory from "./components/watchHistory";
import Profile from "./components/ProfilePage/Profile";
import Error404 from "./components/errorViews/404";
import Home from "./components/HomePage/Home";
import LoginPage from "./components/AuthenticationPage/LoginPage";
import NavTemp from "./components/Nav/NavTemplate";

export default function App() {
  let [currentUser, setCurrentUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let redirect = React.useRef(false);
  let location = useLocation();

  React.useEffect(() => {
    redirect.current = true;
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, [location.pathname]);

  return (
    <GlobalProvider>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              redirect={redirect}
            />
          }
        />
        <Route
          path="/LifePlug"
          element={
            <NavTemp
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        >
          <Route
            index
            element={
              <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
            }
          ></Route>
          <Route
            path="video/:animeLink/:episode"
            element={
              <Video
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="watchHistory"
            element={
              <WatchHistory
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </GlobalProvider>
  );
}
