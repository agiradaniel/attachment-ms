import {React, useEffect} from 'react';
import Navbar from '../inc/Navbar';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"
import SignOut from '../inc/signOut';

const Report = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    useEffect(() => {
        if(!user){
          navigate("/");
        }
      },[]);
    
    return(
        <>
            <div style={{backgroundColor:'#4e54c8', height: '100px'}}>
               <Navbar/>
               <SignOut/>
               <h1 className='text-center text-white' style={{marginTop:'-20px'}}>Report</h1>
            </div>

            <div className="reportContainer container text-center">
                <form>
                <h2 style={{padding:'60px 0 60px 0'}}>Upload report</h2>
                <input type="file" className="form-control mx-auto" id="customFile" style={{width:'60%'}}/>
                <button type="submit" className="btn btn-purple-moon btn-rounded" style={{marginTop:'60px'}}>Upload</button>
                </form>
            </div>
        </>
    )
}

export default Report;