import React, { useState, useEffect } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import AsNavbar from "../inc/AsNavbar";
import {collection, query, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import StudentModalAS from '../inc/studentModalAS';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';



import SignOut from '../inc/signOut';
import AnnouncementModal from '../inc/announcementModal';
import SettingsModalAs from '../inc/settingsModalAs';

const AcademicSupervisorDashboard = () => {
  
    const [user] = useAuthState(auth);
    const [stuList, setStuList] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    let number = 1;
    let no = 1;

    const students = collection(db, "user-details");

    useEffect(()=>{
        
        const data = query(students, where("supervisorId", "==", user.uid));
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

      const announcementCollection = collection(db, "announcements");

      useEffect(()=>{
        
        const unsuscribe =  onSnapshot(announcementCollection, (snapshot) => {
            let announcements = []
            snapshot.docs.forEach((doc)=>{
               announcements.push({...doc.data(), id: doc.id})
            })
            setAnnouncements(announcements)
           
      })
      console.log("Data from announcements retrieved");
      return () => unsuscribe();
     
      },[])


  const deleteAnnouncement = async (id) => {
    const announcementDoc = doc(db, "announcements", id);
    await deleteDoc(announcementDoc)
  }
  

    return (
    <div>
        <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
                <AsNavbar/>
               <SignOut/>
               <h1 className='text-center text-white' style={{paddingTop:'40px'}}>Academic Supervisor Dashboard</h1>
        </div>

        <div className='studentname'>
                    <h4 className='text-center'>{user.displayName ? (user.displayName + "'s Dashboard") : ("User Email: " + user.email)}</h4>
        </div>

      {user.displayName ? 
        (
        <>
        <div className='studentsContainerAS mx-auto'>
            <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Students</h3>
            
                  <Table striped bordered hover size="sm" style={{width:"80%"}} className="mx-auto">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Student Name</th>
                      <th>Phone</th>
                      <th>Location</th>
                      <th>Assessment Date</th>
                      <th>View Student</th>
                    </tr>
                  </thead>
                    {stuList.map((stu) => {
                return(  
                  
                  <tbody>
                    <tr>
                      <td>{number ++}</td>
                      <td style={{textAlign:"left"}}>{stu.name}</td>
                      <td><a href={"tel:" + stu.phone}>{stu.phone}</a></td>
                      <td>{stu.location}</td>
                      <td>{stu.assessmentDate || "Not set"}</td>
                      <td><StudentModalAS studentId={stu.creatorId}/></td>
                    </tr>
                  </tbody>
                
                ) 
            })
        }
        </Table>
        </div>

        <div className='text-center' style={{margin:"30px 0 30px"}}>
          <AnnouncementModal/>
        <div style={{border:"1px solid black", padding:"10px", width:"30%",margin:"30px auto", borderRadius:"5px", textAlign:"left", backgroundColor: "#EBEEF0"}}>
        {announcements.map((ancmt)=>{
            return(
              <>
    
                <div className='d-flex mt-2 justify-content-between'><div>{no++ +". "}{ancmt.announcement+" "}</div>{ancmt.creatorId === user.uid && <button style={{border:"none"}} onClick={()=>{deleteAnnouncement(ancmt.id)}}>&#128465;</button>}</div>
    
              </>
             )
        })}

        </div>
        </div>
  </>       
        
        ) : (
          <div className='mx-auto text-center' style={{height:"270px"}}>
          <h3 style={{paddingTop:"150px"}}>Hi ,,, Update your details to proceed</h3>
          <SettingsModalAs/>
      </div>
        )}


    </div>
  )
}

export default AcademicSupervisorDashboard;