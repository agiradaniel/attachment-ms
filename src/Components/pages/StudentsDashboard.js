import React from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import Navbar from '../inc/Navbar';

const StudentDashboard = () => {
    return(
        <>

            <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
               <Navbar/>
            </div>
            <div className='mainButton mx-auto'> 
                E-Logbook
            </div>
        </>
    )
}

export default StudentDashboard;