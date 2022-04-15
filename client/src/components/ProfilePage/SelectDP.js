import React from "react";
import { GlobalContext } from "../../Context/GlobalState";
import ProfileService from "../../services/profile.service";

export default function SelectDP(props) {
  const { modalRef, turnPopOff, pop, setPop } = React.useContext(GlobalContext);
  let { currentUser } = props;

  const updateDP = (updatePic) => {
    let user_id = currentUser.user._id;
    let picture = updatePic;
    ProfileService.updateDP(user_id, picture)
      .then((res) => {
        let update = JSON.parse(localStorage.getItem("user"));
        let change = { ...update.user, picture: updatePic };

        localStorage.setItem(
          "user",
          JSON.stringify({ ...update, user: change })
        );
        setPop(!pop);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="blackCover" ref={modalRef} onClick={(e) => turnPopOff(e)}>
        <div className="selectDPOuter">
          <div className="innerOuter">
            <div className="picOuter">
              <img
                className="picture"
                src={"/pic/DisplayPicture/Cony.jpg"}
                onClick={() => updateDP("/pic/DisplayPicture/Cony.jpg")}
                alt="Cony"
              />
            </div>
            <div className="picOuter">
              <img
                className="picture"
                src={"/pic/DisplayPicture/Brown.jpg"}
                onClick={() => updateDP("/pic/DisplayPicture/Brown.jpg")}
                alt="Brown"
              />
            </div>
            <div className="picOuter">
              <img
                className="picture"
                src={"/pic/DisplayPicture/Moon.jpg"}
                onClick={() => updateDP("/pic/DisplayPicture/Moon.jpg")}
                alt="Moon"
              />
            </div>
            <div className="picOuter">
              <img
                className="picture"
                src={"/pic/DisplayPicture/Sally.jpg"}
                onClick={() => updateDP("/pic/DisplayPicture/Sally.jpg")}
                alt="Sally"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
