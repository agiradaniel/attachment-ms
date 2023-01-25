import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <>
         
              <Link to="/" ><button className='btn-purple-moon'>test route</button></Link>
              <Link to="/StudentDashboard" ><button className='btn-purple-moon'>Dasboard</button></Link>
         
        </>
    );
}

export default Navbar;