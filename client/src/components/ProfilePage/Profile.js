import React from "react";
import { GlobalContext } from "../../Context/GlobalState";
import SelectDP from "./SelectDP";
import ProfileService from "../../services/profile.service";
import { useNavigate } from "react-router-dom";

import CustomButton from "../../UI/Button";

export default function Profile(props) {
  const { pop, setPop, theme } = React.useContext(GlobalContext);
  const [userInfo, setUserInfo] = React.useState(null);
  const [updateNameBtn, setUpdateNameBtn] = React.useState(false);
  const [updateName, setUpdateName] = React.useState("");
  let navigate = useNavigate();
  let { currentUser } = props;

  React.useEffect(() => {
    ProfileService.getUser().then((data) => {
      setUserInfo(data.data);
    });
  }, [pop, updateNameBtn]);

  function updateNameTrigger() {
    setUpdateNameBtn(!updateNameBtn);
  }

  const updatedName = () => {
    let user_id = currentUser.user._id;
    let nickname = updateName;
    ProfileService.updateName(user_id, nickname)
      .then((res) => {
        if (res.data === "資料遭到串改") {
          localStorage.removeItem("user");
          navigate("/");
        }
        let update = JSON.parse(localStorage.getItem("user"));
        let change = { ...update.user, nickname: updateName };

        localStorage.setItem(
          "user",
          JSON.stringify({ ...update, user: change })
        );
        setUpdateNameBtn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {pop === true && <SelectDP {...props} />}
      {userInfo !== null && (
        <div className="profileOuter" data-theme={theme}>
          <div className="profileBox">
            <div className="profilePicOuter">
              <img
                className="picture"
                src={userInfo[0].picture}
                alt="profilePic"
              />
              <span className="updatePicBtn">
                <CustomButton children="Edit" onClick={() => setPop(!pop)} />
              </span>
            </div>
            {!currentUser && (
              <div>You must login first before getting your profile.</div>
            )}
            {currentUser && (
              <div className="profileInfoOuter">
                <div className="profileName">帳號：{userInfo[0].username}</div>
                <div className="profileName">
                  名稱：
                  <span className="name">{userInfo[0].nickname}</span>
                  <CustomButton
                    children={updateNameBtn === false ? "Edit" : "Cancel"}
                    onClick={updateNameTrigger}
                  />
                </div>
                <form
                  className="updateNameOuter"
                  style={
                    updateNameBtn ? { display: "block" } : { display: "none" }
                  }
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="updateForm"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    placeholder="請輸入名稱..."
                  />
                  <CustomButton children="OK" onClick={updatedName} />
                </form>
                <div className="profileName">職位：{userInfo[0].role}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
