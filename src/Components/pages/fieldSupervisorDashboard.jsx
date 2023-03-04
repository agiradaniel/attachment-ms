import React, { useState, useEffect } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import FsNavbar from "../inc/FsNavbar"
import {collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';
import StudentModal from '../inc/studentModal';
import Table from 'react-bootstrap/Table';

import SignOut from '../inc/signOut';
import { Button } from 'react-bootstrap';
import SettingsModalFd from '../inc/settingsModalFd';

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
      console.log("Data from user details retrieved");
      return () => unsuscribe();
     
      },[])
  
    return (
    <div>
        <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
                <FsNavbar/>
               <SignOut/>
               <h1 className='text-center text-white' style={{paddingTop:'40px'}}>Field Supervisor Dashboard</h1>
        </div>

        <div className='studentname'>
                    <h4 className='text-center'>{user.displayName ? (user.displayName + "'s Dashboard") : ("User Email: " + user.email)}</h4>
        </div>


        <div className='studentsContainer mx-auto'>
            <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Students</h3>

            <Table striped bordered hover size="sm" style={{width:"80%"}} className="mx-auto">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Student Name</th>
                      <th>Phone</th>
                      <th>View Student</th>
                    </tr>
                  </thead>
                    {stuList.map((stu) => {
                return(  
                  
                  <tbody>
                    <tr>
                      <td>{number ++}</td>
                      <td style={{textAlign:"left", paddingLeft:"10px"}}>{stu.name}</td>
                      <td><a href={"tel:" + stu.phone}>{stu.phone}</a></td>
                      <td><StudentModal studentId={stu.creatorId}/></td>
                    </tr>
                  </tbody>
                
                ) 
            })
        }
        </Table>
        
        </div>
        <SettingsModalFd/>
    </div>
  )
}

export default FieldSupervisorDashboard