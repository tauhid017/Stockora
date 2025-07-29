import React from "react";
import largestBroker from "../../assets/largestBroker.svg";
import pressLogo from "../../assets/pressLogos.png";
function Awards() {
  return (
    <>
      <div className="container mt-5 mb-5" >
        <div className="row">
          <div className="col-6">
            <img src={largestBroker} alt="largest Broker" />
          </div>
          <div className="col-6">
            <h1>Largest Stock Broker in India</h1>
            <p>
              Thousands of Stockora users contribute to a growing share of
              retail trading and investing activity in India every day,
              leveraging our platform to simplify their journey in the markets
              by trading and investin in:
            </p>
            <div className="row mt-5">
              <div className="col-6">
                <ul>
                  <li>
                    {" "}
                    <p>Futures an options</p>
                  </li>
                  <li>
                    {" "}
                    <p>Commodity derivatives</p>
                  </li>
                  <li>
                    {" "}
                    <p>Currency derivatives</p>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul>
                  <li>
                    {" "}
                    <p>Stocks & IPOs</p>
                  </li>
                  <li>
                    {" "}
                    <p>Direct Mutual funds</p>
                  </li>
                  <li>
                    {" "}
                    <p>Bonds and Growth</p>
                  </li>
                </ul>
              </div>
              <img src={pressLogo} alt="presslogo" className="mt-4" style={{width:"90%"}}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Awards;
