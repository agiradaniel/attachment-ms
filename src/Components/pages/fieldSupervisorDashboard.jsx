import React, { useState, useEffect } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import FsNavbar from "../inc/FsNavbar"
import {collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';
import StudentModal from '../inc/studentModal';

import SettingsModal from '../inc/settingsModal';
import SignOut from '../inc/signOut';
import { Button } from 'react-bootstrap';

const FieldSupervisorDashboard = () => {
  
    const [user] = useAuthState(auth);
    const [stuList, setStuList] = useState([]);
    let number = 1;

    const students = collection(db, "user-details");

    useEffect(()=>{
        
        const data = query(students, where("role", "==", "student"));
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let stuList = []
            snapshot.docs.forEach((doc)=>{
               stuList.push({...doc.data(), id: doc.id})
            })
            setStuList(stuList)
           
      })
      return () => unsuscribe();
      },[])
  
    return (
    <div>
        <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
                <FsNavbar/>
               <SettingsModal/>
               <SignOut/>
               <h1 className='text-center text-white' style={{paddingTop:'40px'}}>Field Supervisor Dashboard</h1>
        </div>

        <div className='studentname'>
                    <h4 className='text-center'>{user.displayName ? (user.displayName + "'s dashboard") : ("User Email: " + user.email)}</h4>
        </div>


        <div className='studentsContainer mx-auto'>
            <h3 style={{paddingTop:"20px"}}>Students</h3>
            {stuList.map((stu) => {
                return(
                    <div>
                        <p>{number ++ +". "}{stu.name +"  "}<StudentModal studentId={stu.creatorId}/></p>
                    </div>
                ) 
            })
        }
        
        </div>
    </div>
  )
}

export default FieldSupervisorDashboard