import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
      <body>
        <div class="navbar">
          <a href="#home"><Link to="/">Home</Link></a>
          <a href="#news"><Link to="/blogs">List</Link></a>
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