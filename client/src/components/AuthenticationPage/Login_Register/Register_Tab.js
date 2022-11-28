import React from "react";
import Axios from "axios";
import SAlert from "./successAlert";
import CustomButton from "../../../UI/Button";

export default function RegisterTab(props) {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = React.useState("");

  const [successAlert, setSuccessAlert] = React.useState(0);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setRegisterEmail("");
    setRegisterPassword("");
    setVerifyPassword("");
  }, [props.Key]);

  React.useEffect(() => {
    setMessage("");
    function successCountDown() {
      if (successAlert > 0) {
        setSuccessAlert((prev) => prev - 1);
      }
    }
    const countDown = setTimeout(successCountDown, 1000);
    return function cleanup() {
      clearTimeout(countDown);
    };
  }, [successAlert, registerEmail, registerPassword, verifyPassword]);

  const register = () => {
    Axios.post("http://localhost:4000/api/user/register", {
      username: registerEmail,
      password: registerPassword,
      verifyPassword: verifyPassword,
    })
      .then((res) => {
        switch (res.data) {
          case `"username" is not allowed to be empty`:
            setMessage("Email不得為空");
            break;
          case `"username" must be a valid email`:
            setMessage("請填寫正確的email");
            break;
          case `"username" length must be less than or equal to 50 characters long`:
            setMessage("Email不得多於50字元");
            break;
          case `"password" is not allowed to be 
          empty`:
            setMessage("密碼不得為空");
            break;
          case `"password" length must be at least 6 characters long`:
            setMessage("密碼必須大於6個字元");
            break;
          case `"verifyPassword" must be [ref:password]`:
            setMessage("二次密碼不相符");
            break;
          case "emailAlert":
            setMessage("email已註冊");
            break;
          case "registerSuccess!":
            setSuccessAlert(5);
            setTimeout(props.SetKey, 5200);
            break;
          default:
            console.log(res.data);
        }
      })
      .catch(function (error) {
        console.log("這是error:" + error);
      });
  };

  return (
    <React.Fragment>
      <header className="registerTitleBox">
        <p className="registerTitle">註冊會員</p>
      </header>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="formGroup">
          <input
            placeholder="E-mail"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div className="formGroup">
          <input
            placeholder="Password"
            value={registerPassword}
            minLength="6"
            onChange={(e) => setRegisterPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <div className="formGroup">
          <input
            placeholder="Repeat Password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <div className="registerCheckBox">
          <label>
            <input type="checkbox" name="acceptEmail" value="receiveEmail" />
            同意接收來自LifeTv的e-mail最新資訊
          </label>
        </div>

        {message && <div className="alertMessage">{message}</div>}
        {successAlert > 0 && <SAlert Countdown={successAlert} />}
        <div className="registerBtnBox">
          <CustomButton children="Confirm" width="100%" />
        </div>
      </form>
    </React.Fragment>
  );
}
