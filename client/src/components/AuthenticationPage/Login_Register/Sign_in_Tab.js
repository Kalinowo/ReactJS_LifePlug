import React from "react";
import { GlobalContext } from "../../../Context/GlobalState";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import RegisterTab from "./Register_Tab";
import Axios from "axios";

export default function SignInTab(props) {
  const { modalRef, setPop, turnPopOff } = React.useContext(GlobalContext);
  const [key, setKey] = React.useState("signin");
  let navigate = useNavigate();
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  let { setCurrentUser } = props;

  const login = () => {
    Axios.post("http://localhost:4000/api/user/login", {
      username: loginEmail,
      password: loginPassword,
    })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setCurrentUser(JSON.parse(localStorage.getItem("user")));
          setPop(false);
          navigate("/LifePlug");
        } else {
          setMessage("帳號或密碼錯誤");
        }
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.data) {
            case `"username" is not allowed to be empty`:
              setMessage("帳號不得為空");
              break;
            default:
              console.log("發生錯誤");
          }
        } else {
          console.log(err);
        }
      });
  };

  const registerSuccessful = () => {
    setKey("signin");
  };

  return (
    <React.Fragment>
      <div className="blackCover" ref={modalRef} onClick={(e) => turnPopOff(e)}>
        <div className="signInOuter">
          <div className="signInBox">
            <Tabs
              id="controlled-tab-example"
              className="nav-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="signin" title="Sign-in">
                <header className="signInTitleBox">
                  <p className="signInTitle">會員登入</p>
                </header>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="formGroup">
                    <input
                      placeholder="E-mail"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      type="email"
                      required
                    />
                  </div>
                  <div className="formGroup">
                    <input
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      type="password"
                      minLength="6"
                      required
                    />
                  </div>
                  <div className="signInCheckBox">
                    <label>
                      <input
                        type="checkbox"
                        name="remember"
                        onChange={() => setRemember(!remember)}
                      />
                      記住帳號
                    </label>
                    <label>
                      <input type="checkbox" name="staylogged" />
                      保持登入
                    </label>
                  </div>
                  {message && <div className="alertMessage">{message}</div>}
                  <div className="submitBox">
                    <button onClick={login} className="submitBtn">
                      登入
                    </button>
                    <button
                      className="submitCancel"
                      onClick={() => setPop(false)}
                    >
                      取消
                    </button>
                  </div>
                </form>
              </Tab>
              <Tab eventKey="register" title="Register">
                <RegisterTab SetKey={registerSuccessful} Key={key} />
              </Tab>
            </Tabs>
            <span
              className="signInCloseBtn fas fa-times"
              onClick={() => setPop(false)}
            ></span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
