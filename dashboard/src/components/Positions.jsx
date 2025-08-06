import React from "react";
import { positions } from "../data/data"; // Assuming you have a data file with holdings data
const Positions = () => {
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          {positions.map((stock,index)=>{
            const curvalue = stock.qty*stock.price;
            const isProfit = curvalue - stock.avg*stock.qty >=0.0;
            const profClass = isProfit? "profit" : "loss";
            const dayclass = stock.isLoss? "loss" :"profit";
            return(
            <tr  key ={index}>
            <th>{stock.product}</th>
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
    </>
  );
};

export default Positions;