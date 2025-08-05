import React,{useState} from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Assuming you have a logo image in assets
const Menu = () => {
  // Add the missing handleProfileClick function
  
  const [selectedMenu , setselectedMenu] = useState(0);
  const [ismenuOpen, setmenuOpen] =useState(false);

  const handelemenuclick=(index)=>{
    setselectedMenu(index);
  }
  const handleProfileClick = () => {
    setmenuOpen(!ismenuOpen);
    
  };
  const menuclass = "menu";
  const activemenuclass = "menu selected";

  return (
    <div className="menu-container">
      <img src={logo} alt="logo" style={{width:"50px"}} />
      <div className="menus mt-4">
        <ul>
          <li>
            <Link style={{textDecoration:"none"}} to='/' onClick={()=>handelemenuclick(0)}>
            <p className={selectedMenu===0? activemenuclass :menuclass}>Dashboard</p>
            </Link>
          </li>
          <li>
           <Link style={{textDecoration:"none"}} to='/orders' onClick={()=>handelemenuclick(1)}> 
           <p className={selectedMenu===1? activemenuclass :menuclass}>Orders</p>
           </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/holdings' onClick={()=>handelemenuclick(2)}>
            <p className={selectedMenu===2? activemenuclass :menuclass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/positions' onClick={()=>handelemenuclick(3)}>
            <p className={selectedMenu===3? activemenuclass :menuclass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/funds' onClick={()=>handelemenuclick(4)}>
            <p className={selectedMenu===4? activemenuclass :menuclass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/apps' onClick={()=>handelemenuclick(5)}>
            <p className={selectedMenu===5? activemenuclass :menuclass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile mb-4" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;