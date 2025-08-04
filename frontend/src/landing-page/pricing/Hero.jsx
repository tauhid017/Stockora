import React from "react";
import zero from "../../assets/0.svg";
import Tw from '../../assets/20.svg';
function Hero() {
  return (
    <>
      <div className="container">
        <div
          className="row text-center mt-5 p-5 mb-3"
          style={{ color: "#424242" }}
        >
          <h2>Pricing</h2>
          <p className="text-muted fs-5">List of all charges and taxes</p>
        </div>
        <div className="row">
          <div className="col-4 text-center">
            <img
              src={zero}
              alt="0"
              style={{ width: "250px", height: "250px" }}
            />
            <h2 className="mb-3">Free equity delivery</h2>
            <p className="text-muted fs-5">
              All equity delivery investments (NSE, BSE),
              <br /> are absolutely free — ₹ 0 brokerage.
            </p>
          </div>
          <div className="col-4 text-center">
            <img src={Tw} alt="0" style={{ width: "250px", height: "250px" }} />
            <h2 className="mb-3">Free equity delivery</h2>
            <p className="text-muted fs-5">
              All equity delivery investments (NSE, BSE),
              <br /> are absolutely free — ₹ 0 brokerage.
            </p>
          </div>
          <div className="col-4 text-center">
            <img
              src={zero}
              alt="0"
              style={{ width: "250px", height: "250px" }}
            />
            <h2 className="mb-3">Free equity delivery</h2>
            <p className="text-muted fs-5">
              All equity delivery investments (NSE, BSE),
              <br /> are absolutely free — ₹ 0 brokerage.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
