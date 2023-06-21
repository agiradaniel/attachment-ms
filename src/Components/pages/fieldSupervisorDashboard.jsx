import React, { useState, useEffect } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import FsNavbar from "../inc/FsNavbar"
import {collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';
import StudentModal from '../inc/studentModal';
import Table from 'react-bootstrap/Table';
import { FidgetSpinner } from  'react-loader-spinner'
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import SettingsModalFd from '../inc/settingsModalFd';

const FieldSupervisorDashboard = () => {
  
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [stuList, setStuList] = useState([]);
    const [supervisorList, setSupervisorList] = useState([]);
    let number = 1;
    const [isLoading, setIsLoading] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);
    let approval;

    useEffect(() => {
      if(!user || user.displayName !== "Field Supervisor" && user.displayName !== null){
        navigate("/");
      }
    },[]);

    const students = collection(db, "user-details");

    useEffect(()=>{
        
        const data = query(students, where("fdSupervisorId", "==", user.uid));
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

      const fdSupervisorCollection = collection(db, "Field-supervisor-details");
      useEffect(()=>{
        
        const data = query(fdSupervisorCollection, where("creatorId", "==", user.uid));
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let supervisorList = []
            snapshot.docs.forEach((doc)=>{
               supervisorList.push({...doc.data(), id: doc.id})
            })
            setSupervisorList(supervisorList)
           
      })
      console.log("Data from supervisor details retrieved");
      return () => unsuscribe();
     
      },[])

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
          setModalStatus(true)
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

  
    return (
    <div>
        <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
               <h1 className='text-center text-white' style={{paddingTop:'60px'}}>Field Supervisor Dashboard</h1>
        </div>

        <FsNavbar/>
       
        {isLoading ? 
            <div style={{height:"660px", textAlign:"center"}}>
                <div style={{marginTop:"200px"}}>
                <FidgetSpinner
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                ballColors={['#ff0000', '#00ff00', '#0000ff']}
                backgroundColor="#F4442E"
                />
                </div>
                
            </div>
                :
        <>
        <div className='studentname'>
        {supervisorList.map((supervisor) => {
          {supervisor.approval === true ? approval = true : approval = false}
                    return(
                    <>
                    <h4 className='text-center'>{supervisor.name ? (supervisor.name + "'s Dashboard") : ("User Email: " + user.email)}</h4>
                    
                    </>
                    )
                    })}
        </div>

        {supervisorList == "" ?
        <div className='mx-auto text-center' style={{height:"660px"}}>
        <h3 style={{paddingTop:"150px"}}>Hi ,,, Update your details to proceed</h3>
         <SettingsModalFd handleAppear={modalStatus}/>
        </div>
              : 
                approval === true ?
                 <div className='studentsContainer mx-auto'>
                 <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Students</h3>
     
                 <Table striped bordered hover size="sm" style={{width:"80%"}} className="mx-auto">
                       <thead>
                         <tr>
                           <th>No</th>
                           <th>Student Name</th>
                           <th>Phone</th>
                           <th>Assessment Date</th>
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
                           <td>{stu.assessmentDate || "Not set"}</td>
                           <td><StudentModal studentId={stu.creatorId}/></td>
                         </tr>
                       </tbody>
                     
                     ) 
                 })
             }
             </Table>
             
             </div>:<div className='studentsContainer mx-auto' style={{alignItems:"center", paddingTop:"170px"}}><h3>Account Awaiting Approval</h3></div>
            }

        </>}
    
    </div>
  )
}

export default FieldSupervisorDashboard