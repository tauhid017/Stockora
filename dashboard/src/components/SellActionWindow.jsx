import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const generalContext = useContext(GeneralContext);

  const handleSellClick = () => {
    axios.post("https://stockora.onrender.com/allorders", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "SELL",
    })
    .then(response => {
      console.log('Order placed successfully:', response.data);
      generalContext.closeSellWindow();
    })
    .catch(error => {
      console.error('Error placing order:', error);
      alert('Failed to place sell order. Please try again.');
    });
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-red" onClick={handleSellClick} style={{ backgroundColor: "#ff5722" }}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;