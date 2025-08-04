import React from "react";
import Hero from "./Hero";
import product from "../../assets/product.png";
import LeftImage from "./LeftImage";
import playstore from "../../assets/Playstor.svg";
import appstore from "../../assets/Appstore.svg";
import RightImage from "./RightImage";
import console from "../../assets/console.png";
import coin from "../../assets/coin.png";
function ProductPage() {
  return (
    <>
      <Hero />
      <div className="mb-5 mt-5">
        <LeftImage
        imageURL={product}
        title={"Kite"}
        description={
          "Stockora is your ultimate trading companion, designed for speed, precision, and simplicity. Access real-time market data, powerful analytics, and intuitive charts—all wrapped in a sleek, user-friendly interface. Trade smarter anytime, anywhere with Stockora on Android and iOS."
        }
        tryDemo={"Try demo"}
        learnMore={"Learn more"}
        googleplay={playstore}
        appstore={appstore}
      />
      </div>
      <div className="mt-5">
        <RightImage
        imageURL={console}
        title={"Console"}
        description={
          "Your central hub for trading and investing with Stockora. Track your portfolio, analyze market trends, and gain powerful insights through detailed reports and interactive visualizations."
        }
        tryDemo={""}
        learnMore={"Learn more"}
        googleplay={""}
        appstore={""}
      />
      </div>
      <div className="mb-5 mt-5">
        <LeftImage
        imageURL={coin}
        title={"Coin"}
        description={
          "Commission-free direct mutual fund investments, delivered to your Demat. Seamless investing with Stockora on Android and iOS."
        }
        tryDemo={"Coin"}
        learnMore={"Learn more"}
        googleplay={""}
        appstore={""}
      />
      </div>
      <div className="text-center mb-5 mt-3">
        <button className='mt-3 p-2 btn btn-primary' style={{width:"20%", margin:"0 auto"}}>Sign Up for free</button>
      </div>
    </>
  );
}

export default ProductPage;
