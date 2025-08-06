import React, { useState, useEffect } from "react";
import axios from "axios";

const Holdings = () => {
  const [allholdings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allholdings")
      .then((res) => {
        console.log(res.data);
        setAllHoldings(res.data);
      })
      .catch((err) => console.error("Error fetching holdings:", err));
  }, []);

  return (
    <>
      <h3 className="title">Holdings ({allholdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>Price</th>
              <th>Current Value</th>
              <th>P&L</th>
              <th>Net</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {allholdings.map((stock, index) => {
              // Check if required properties exist and are numbers
              const price = stock.price ?? 0;
              const qty = stock.qty ?? 0;
              const avg = stock.avg ?? 0;
              
              const curValue = price * qty;
              const totalCost = avg * qty;
              const pnl = curValue - totalCost;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name || "N/A"}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {pnl.toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net || "0%"}</td>
                  <td className={dayClass}>{stock.day || "0%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;