import React from "react";
import Tauhid from "../../assets/Tauhid.png";
function Team() {
  return (
    <>
      <div className="container">
        <div className="row text-center mb-5 ">
          <h3>People</h3>
        </div>
        <div className="row p-5">
          <div className="col-2"></div>
          <div className="col-4">
            <img
              src={Tauhid}
              alt="Tauhid"
              style={{
                borderRadius: "50%",
                width: "310px",
                height: "310px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-4">
            <p>
              Tauhid bootstrapped and founded Stockora with the vision of
              removing the barriers he experienced as an aspiring trader and
              investor. Today, Stockora is reshaping the future of retail
              trading in India.
            </p>

            <p>
              He actively follows market trends, technology, and fintech
              innovations to build tools that simplify investing for everyone.
            </p>

            <p>Solving complex coding challenges is his zen.</p>

            <p>
              Connect on{" "}
              <a href="" style={{ textDecoration: "none" }}>
                Homepage
              </a>{" "}
              /{" "}
              <a
                href="https://www.linkedin.com/in/shaikh-tauhid-shaikh-javed027/"
                style={{ textDecoration: "none" }}
              >
                LinkedIn
              </a>{" "}
              /{" "}
              <a href="" style={{ textDecoration: "none" }}>
                Twitter
              </a>
            </p>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
}

export default Team;
