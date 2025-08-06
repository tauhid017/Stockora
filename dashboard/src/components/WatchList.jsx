import React, {useState,useContext} from "react";
import {watchlist} from '../data/data';
import {Tooltip, Grow} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import GeneralContext from "./GeneralContext";

const WatchList = () => {
  
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
      >
        <Button 
          className="buy" 
          style={{ 
            backgroundColor:"#4184f3",
            color: 'white'
          }}
          onClick={handleBuyClick}
        >
          Buy
        </Button>
      </Tooltip>
      &nbsp;
      <Tooltip 
        title="Sell (S)"
        placement="top"
        arrow 
        TransitionComponent={Grow}
      >
        <Button 
          className="sell" 
          style={{ 
            backgroundColor: "#ff5722", 
            color: 'white' 
          }}
          onClick={handleSellClick}
        >
          Sell
        </Button>
      </Tooltip>
      &nbsp;
      <Tooltip 
        title="Analytics (A)"
        placement="top"
        arrow 
        TransitionComponent={Grow}
      >
        <button className="action">
          <BarChartOutlined className="icon"/>
        </button>
      </Tooltip>
      &nbsp;
      <Tooltip 
        title="More (M)"
        placement="top"
        arrow 
        TransitionComponent={Grow}
      >
        <button className="action">
          <MoreHoriz className="icon"/>
        </button>
      </Tooltip>
    </span>
  )
}