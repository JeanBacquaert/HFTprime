import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
      <body>
        <div class="navbar">
          <a href="#home"><Link to="/">Map</Link></a>
          <a href="#news"><Link to="/blogs">Animals</Link></a>
        </div>
        <div>
          <br />
          <br />
          <br />
        <Outlet />
        </div>
      </body>


    </>
  )
};

export default Layout;