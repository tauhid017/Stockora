import React, {useState, useContext} from "react";
import {watchlist} from '../data/data';
import {Tooltip, Grow} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import GeneralContext from "./GeneralContext";
import Doughnut from './Doughnut'

const WatchList = () => {
  const labels = watchlist.map((subArray)=>subArray["name"]);
//   export const data = {
const data ={
  labels,
  datasets: [
    {
      label: 'Price',
      data: watchlist.map((stock)=>stock.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };


  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return(
            <WatchListItem stock={stock} key={index}/>
          )
        })}
      </ul>
      <Doughnut data={data}/>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({stock}) => {
  const [showwatchlist, setshowwatchlist] = useState(false);

  const handleMouseEnter = (e) => {
    setshowwatchlist(true);
  }

  const handleMouseExit = () => {
    setshowwatchlist(false);
  }

  return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDownIcon className="down"/>
          ) : (
            <KeyboardArrowUpIcon className="up"/>
          )}
          <span className="price">₹ {stock.price}</span>
        </div>
      </div>
      {showwatchlist && <WatchListAction uid={stock.name}/>}
    </li>
  )
}

const WatchListAction =({uid})=>{
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  return(
    <span>
      <Tooltip 
      title="Buy (B)"
      placement="top"
      arrow 
      TransitionComponent={Grow}
      onClick={handleBuyClick}>
      <Button className="buy" style={{ backgroundColor:"#4184f3",
         color: 'white'
      }}>
  Buy
</Button>

      </Tooltip>
      &nbsp;
      <Tooltip 
      title="Sell (S)"
      placement="top"
      arrow 
      TransitionComponent={Grow}
      onClick={handleSellClick}>
        <Button 
  className="sell" 
  style={{ 
    backgroundColor: "#ff5722", 
    color: 'white' 
  }}
>
  Sell
</Button>
      </Tooltip>
      &nbsp;
      <Tooltip 
      title="Analytics (A)"
      placement="top"
      arrow 
      TransitionComponent={Grow}>
        <button className="action">
          <BarChartOutlined className="icon"/>
        </button>
       
      </Tooltip>
      &nbsp;
      <Tooltip 
      title="More (M)"
      placement="top"
      arrow 
      TransitionComponent={Grow}>
        <button className="action">
          <MoreHoriz className="icon"/>
        </button>
       
      </Tooltip>
    </span>
  )
}