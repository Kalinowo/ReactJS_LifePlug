import React from "react";
import { GlobalContext } from "../../Context/GlobalState";
import SignInTab from "./Login_Register/Sign_in_Tab";
import ReZeroBackground from "../../pic/material/ReZeroBackground.png";
export default function LoginPage(props) {
  const { pop, setPop } = React.useContext(GlobalContext);

  let { redirect, setCurrentUser } = props;

  console.log(redirect);

  React.useEffect(() => {
    if (redirect.current) {
      setPop(true);
    }
    //eslint-disable-next-line
  }, []);

  function openSign() {
    setPop(!pop);
  }

  return (
    <React.Fragment>
      <div className="testOuter">
        <div className="entrancePageOuter">
          <div className="filterWrapper">
            <div className="entrancePageBg">
              <img
                className="backgroundImage"
                src={ReZeroBackground}
                alt="ReZeroBackground"
              />
              <div className="entrancePageBgFilter"></div>
            </div>
            <div className="loginBtnOuter">
              <div className="loginWrapper">
                <div className="title">LifePlug</div>
                <div className="loginBtn" onClick={() => openSign()}>
                  <button className="btn1">登入</button>
                  <button className="btn2"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pop === true && <SignInTab setCurrentUser={setCurrentUser} />}
    </React.Fragment>
  );
}
