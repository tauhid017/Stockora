import React from "react";

function LeftImage({
  imageURL,
  title,
  description,
  tryDemo,
  learnMore,
  googleplay,
  appstore,
}) {
  return (
    <div className="container">
      <div className="row">
          <div className="col-7 p-3 mx-5" >
              <img src={imageURL} alt={title} style={{marginLeft:"100px"}} />
          </div>
          
          <div className="col-4 mt-5 p-5">
              <h2>{title}</h2>
              <p className="text-muted">{description}</p>
              <a href="" style={{textDecoration:"none" ,color:"#0D6EFD" ,cursor:"pointer"}}>{tryDemo} <i className="fa-solid fa-arrow-right"></i></a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="" style={{textDecoration:"none" ,color:"#0D6EFD" ,cursor:"pointer"}}> {learnMore}<i className="fa-solid fa-arrow-right"></i></a>
              <br /> <br />
              <a href="" ><img src={googleplay} alt="" /></a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href=""><img src={appstore} alt="" /></a>
          </div>
          <div className="col-1"></div>
      </div>
    </div>
  );
}

export default LeftImage;