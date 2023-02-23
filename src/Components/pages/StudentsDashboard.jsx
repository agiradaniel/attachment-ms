import {React, useEffect, useState} from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import Navbar from '../inc/Navbar';
import Chart from '../inc/chart';
import Footer from '../inc/footer';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"
import SignOut from '../inc/signOut';
//import { updateProfile } from 'firebase/auth';
import Modal from "../inc/ModalLayout"
import SettingsModal from '../inc/settingsModal';


const StudentDashboard = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    //const [updatedDisplayName, setUpdatedDisplayName] = useState("")

    /*useEffect(() => {
        if(!user){
          navigate("/");
        }

        console.log(auth.currentUser)
      },[]);*/

      /*
      const updateName = async () => {
        const updatedUser = await updateProfile(user, {
          displayName: updatedDisplayName,
        });
      };
      */
      
    
    return(
        <>

            <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
               <Navbar/>
               <SettingsModal/>
               <SignOut/>
               <h1 className='text-center text-white' style={{paddingTop:'40px'}}>Student Dashboard</h1>
            </div>

            <div className='notificationbar'>
                <div className='text-center' style={{marginTop:'190px'}}>
                    <h5>Physical assessment schedule</h5>
                    <p>Not set</p>
                    <h5 style={{marginTop:'50px'}}>Announcements</h5>
                    <p>None yet</p>

                </div>
            </div>

            <div style={{width:'70%'}} className="main-area">  
                <div className='studentname'>
                    <h4 className='text-center'>{user.displayName ? (user.displayName) : (user.email)}'s dashboard</h4>
                </div>

                <div className='buttonwrap d-flex justify-content-center container'>
                    <Link to="/eLogbook" style={{ textDecoration: 'none'}}>
                        <div className='mainButton p-2 btn-purple-moon' style={{marginRight:'120px'}}>  
                            <p style={{marginTop:'50px'}}>E-Logbook</p>
                        </div>
                    </Link>
                    <Link to="/Report" style={{ textDecoration: 'none'}}>
                        <div className='mainButton p-2 btn-purple-moon' >  
                            <p style={{marginTop:'50px'}}>E-Report</p>
                        </div>
                    </Link>    
                </div>

                <div className='d-flex justify-content-center' style={{marginTop:'40px'}}>
                    <Chart/>
                    
                </div>
            

            </div>    
            <Footer/>
        </>
    )
}

export default StudentDashboard;