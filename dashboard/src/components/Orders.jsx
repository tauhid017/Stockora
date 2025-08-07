import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allorders, setallorders] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:3002/orders")
      .then((res) => {
        setallorders(res.data);
      })
      .catch((e) => {
        console.log("error:", e);
      });
  }, []);

  return (
    <div className="orders">
      <h3 className="title">Orders ({allorders.length})</h3>
      
      {allorders.length === 0 ? (
        <div className="text-center">
          <Link to={"/"} className="btn">
          Get started
        </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allorders.map((stock, index) => {
                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.price}</td>
                    <td className={stock.mode === "BUY" ? "profit" : "loss"}>
                      {stock.mode}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Orders;
