import React, { useState, useEffect } from "react";
import axios from "axios";
const Positions = () => {
  const[allpositon,setallpositions]=useState([]);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL || 'https://stockora.onrender.com'}/allpositions`).then((res)=>{
      setallpositions(res.data);
    })
  },[])
  return (
    <>
      <h3 className="title">Positions ({allpositon.length})</h3>

      <div className="order-table">
        <table>
          {allpositon.map((stock,index)=>{
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