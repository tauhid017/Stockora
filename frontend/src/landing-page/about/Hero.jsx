import React from "react";

function Hero() {
  return (
    <>
      <div className="container border-bottom  pb-5 mb-5">
        <div className="row">
          <h3 className="text-center p-5 fs-4 mb-5 border-bottom">
            We redefined the way India invests. <br />
            Now, we are transforming the future with our technology.
          </h3>
        </div>
        <div className="row mt-5">
          <div className="col-2"></div>
          <div className="col-4">
            <p>
              We kick-started operations with the vision of removing every
              barrier traders and investors face in India – from high costs to
              lack of support and technology gaps. The name Stockora represents
              our mission to create a new era in stock trading.
            </p>

            <p>
              Today, our innovative pricing models and cutting-edge technology
              have positioned us as one of India's fastest-growing trading
              platforms.
            </p>

            <p>
              With lakhs of active clients placing millions of orders every
              year, Stockora is reshaping the future of retail trading in India.
            </p>
          </div>
          <div className="col-4">
            <p>
              In addition, we run several popular <a href="" style={{textDecoration:"none"}}>online educational</a> and
              community initiatives aimed at empowering retail traders and
              investors across India.
            </p>

            <p>
              <a href="" style={{ textDecoration: "none" }}>
                Stockora Capital
              </a>
              , our fintech fund and incubator, has partnered with and invested
              in several fintech startups with the goal of transforming and
              growing the Indian capital markets.
            </p>

            <p>
              Yet, we are always building something new every day. Check out <a href="" style={{textDecoration:"none"}}>our
              blog</a> for the latest updates, see what the media is saying about
              us, or learn more about our business and product philosophies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;