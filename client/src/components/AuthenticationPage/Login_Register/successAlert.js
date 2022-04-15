import React from "react";

export default function successAlert(props) {
  return (
    <React.Fragment>
      <div className="blackCover">
        <div className="successOuter">
          <div className="successContent">註冊成功({props.Countdown})</div>
        </div>
      </div>
    </React.Fragment>
  );
}
