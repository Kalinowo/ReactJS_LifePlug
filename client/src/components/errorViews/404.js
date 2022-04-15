import React from "react";
import ErrorFour04 from "../../pic/material/404_Error.svg";

export default function Error404() {
  return (
    <React.Fragment>
      <div className="error404">
        <div className="imageOuter404">
          <img src={ErrorFour04} className="image" alt="error" />
          <div className="outer404">
            <div className="statusCode">
              404
              <div className="description">Page Not Found</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
