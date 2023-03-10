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
                        
                        <Link to="/StudentDashboard" ><Dropdown.Item href="#/action-2">Student Dashboard</Dropdown.Item></Link>
                        <Link to="/ELogbook" ><Dropdown.Item href="#/action-3">E-Logbook</Dropdown.Item></Link>
                        <Link to="/Report" ><Dropdown.Item href="#/action-4">Report</Dropdown.Item></Link>

                        
            
                        </Dropdown.Menu>
             </Dropdown>
         
        </>
    );
}

export default Navbar;