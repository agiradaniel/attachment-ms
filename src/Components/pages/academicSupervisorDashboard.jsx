import React from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import Navbar from '../inc/Navbar';
import SettingsModal from '../inc/settingsModal';
import SignOut from '../inc/signOut';


const AcademicSupervisorDashboard = () => {
  return (
    <div>

            <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
               <Navbar/>
               <SettingsModal/>
               <SignOut/>
               <h1 className='text-center text-white' style={{paddingTop:'40px'}}>Student Dashboard</h1>
            </div>

    </div>
  )
}

export default AcademicSupervisorDashboard