import React, { useState, useEffect } from "react";
import axios from "axios";
import VerticalGraph from "./VerticalGraph"

const Holdings = () => {
  const [allholdings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("https://stockora-1.onrender.com/allholdings", { 
      withCredentials: true // Add this for authentication
    })
      .then((res) => {
        console.log(res.data);
        setAllHoldings(res.data);
      })
      .catch((err) => console.error("Error fetching holdings:", err));
  }, []);

  // Format data for the chart
  const labels = allholdings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [ // This should be an array, not an object
      {
        label: 'Stock Price',
        data: allholdings.map((stock) => stock.price), // Fixed the reference to 'stock'
        backgroundColor: 'rgba(255, 170, 74, 0.66)',
        borderColor: 'rgba(255, 170, 74, 1)',
        borderWidth: 1,
      },
    ]
  };

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
              const avg = stock.avg || 0;
              const price = stock.price || 0;
              const curValue = stock.qty * price;
              const isProfit = curValue - avg * stock.qty >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - avg * stock.qty).toFixed(2)}
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
      
      {/* Pass the formatted data to VerticalGraph */}
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;