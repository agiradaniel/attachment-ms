import React, { useState, useEffect } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import AdmNavbar from "../inc/AdmNavbar";
import {collection, query, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import StudentModalAdm from '../inc/studentModalAdm';
import Table from 'react-bootstrap/Table';
import SignOut from '../inc/signOut';
import AnnouncementModal from '../inc/announcementModal';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [stuList, setStuList] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    let number = 1;
    let no = 1;

    useEffect(() => {
      if(!user || user.displayName !== "Admin"){
        navigate("/");
      }

      console.log(auth.currentUser)
    },[]);

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
   
               <h1 className='text-center text-white' style={{paddingTop:'60px'}}>Administrator Dashboard</h1>
        </div>

        <AdmNavbar/>

        <div className='studentname'>
                    <h4 className='text-center'>{user.displayName ? (user.displayName + "'s Dashboard") : ("User Email: " + user.email)}</h4>
        </div>

        <div className='studentsContainerAS mx-auto' style={{paddingBottom:"20px"}}>
            <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Students</h3>
            
                  <Table striped bordered hover size="sm" style={{width:"90%"}} className="mx-auto">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Student Name</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>AC Supervisor</th>
                      <th>FD Supervisor</th>
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
                      <td>{stu.company}</td>
                      <td>{stu.supervisorName || <div style={{color:"red"}}>Not assigned</div>}</td>
                      <td>{stu.fdSupervisorName || <div style={{color:"red"}}>Not assigned</div>}</td>
                      <td><StudentModalAdm studentId={stu.creatorId}/></td>
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
              
                <div className='d-flex mt-2 justify-content-between'><div>{no++ +". "}{ancmt.announcement+" "}{" ~ "+ancmt.date+" "}</div>{ancmt.creatorId === user.uid && <button style={{border:"none"}} onClick={()=>{deleteAnnouncement(ancmt.id)}}>&#128465;</button>}</div>
              
              </>
            )
          })}

          </div>
        </div>

    </div>
  )
}

export default AdminDashboard;