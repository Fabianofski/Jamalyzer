import React from "react";
import  "./Credits.css";
import "./Legal.css";

function Credits () {
  
  document.title = `Jamalyzer | Credits`;
  
  return(
    <div className="legal-container">
      <h1>Credits</h1>
      <div className="legal-view">
        <h1>FABIAN</h1>
        <div className="credits-wrapper">
          <img src="/logo.png" alt="F4B1 Logo" className="profile"></img>
          <div className="information">
            <Link
                  site={"Itch.io - F4B1"}
                  link={"https://f4b1.itch.io"}
                  icon={"https://static.itch.io/images/itchio-textless-black.svg"}/>
            <Link
                  site={"GitHub - Fabianofski"}
                  link={"https://github.com/Fabianofski"}
                  icon={"https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  site : string,
  link : string,
  icon : string,
}

function Link({site, link, icon}:Props){
  return (
    <a className="link" href={link} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={`${site} Icon`} />
      <h2>{site}</h2>
    </a>

  );
}

export default Credits;

