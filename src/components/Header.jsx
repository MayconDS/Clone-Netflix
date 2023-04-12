import React from "react";
import "./Header.css";

export default ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header-logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/1920px-Netflix_2014_logo.svg.png"
            alt=""
            srcset=""
          />
        </a>
      </div>
      <div className="header-user">
        <a href="/">
          <img
            src="https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/b847f9d5738736cdaf64b627bf001729~c5_100x100.jpeg?x-expires=1659236400&x-signature=C583Tzy969aAs2Vz9Q%2BOhCAg4DY%3D"
            alt=""
            srcset=""
          />
        </a>
      </div>
    </header>
  );
};
