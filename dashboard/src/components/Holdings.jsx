import React from "react";
import {holdings} from "../data/data"
const Holdings = () => {
  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          {holdings.map((stock, index)=>{
            const curvalue = stock.qty*stock.price;
            const isProfit = curvalue - stock.avg*stock.qty >=0.0;
            const profClass = isProfit? "profit" : "loss";
            const dayclass = stock.isLoss? "loss" :"profit";
            return(
              <tr  key ={index}>
            <th>{stock.name}</th>
            <th>{stock.qty}</th>
            <th>{stock.avg.toFixed(2)}</th>
            <th>{stock.price.toFixed(2)}</th>
            <th>{curvalue.toFixed(2)}</th>
            <th className={profClass}>{(curvalue - stock.avg*stock.qty).toFixed(2)}</th>
            <th className={profClass}>{stock.net}</th>
            <th className={dayclass}>{stock.day}</th>
          </tr>
            )
          })}

        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
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