import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const AsNavbar = () => {
    return(
        <>
         
              <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            Navigate
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        
                        <Link to="/AcademicSupervisorDashboard" ><Dropdown.Item href="#/action-2">Dashboard</Dropdown.Item></Link>
                        <Link to="/next" ><Dropdown.Item href="#/action-3">Next</Dropdown.Item></Link>
                        
            
                        </Dropdown.Menu>
             </Dropdown>
         
        </>
    );
}

export default AsNavbar;