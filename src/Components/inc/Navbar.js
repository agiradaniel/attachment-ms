import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = () => {
    return(
        <>
         
              <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            Navigate
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Link to="/" > <Dropdown.Item href="#/action-1">Login page</Dropdown.Item></Link>
                        <Link to="/StudentDashboard" ><Dropdown.Item href="#/action-2">Student Dashboard</Dropdown.Item></Link> 
                        
            
                        </Dropdown.Menu>
             </Dropdown>
         
        </>
    );
}

export default Navbar;