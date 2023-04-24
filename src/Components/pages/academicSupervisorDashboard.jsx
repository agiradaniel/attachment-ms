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
import { FidgetSpinner } from  'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import SignOut from '../inc/signOut';
import AnnouncementModal from '../inc/announcementModal';
import SettingsModalAs from '../inc/settingsModalAs';

const AcademicSupervisorDashboard = () => {
  
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [stuList, setStuList] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    let number = 1;
    let no = 1;
    const [supervisorList, setSupervisorList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);

    useEffect(() => {
      if(!user || user.displayName !== "Academic Supervisor" && user.displayName !== null){
        navigate("/");
      }
    },[]);

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

      const acSupervisorCollection = collection(db, "Academic-supervisor-details");

      useEffect(()=>{
        
        const data = query(acSupervisorCollection, where("creatorId", "==", user.uid));
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

               <h1 className='text-center text-white' style={{paddingTop:'60px'}}>Academic Supervisor Dashboard</h1>
        </div>

        <AsNavbar/>
        <div className='studentname'>
        {supervisorList.map((supervisor) => {
                    return(
                    <h4 className='text-center'>{supervisor.name ? (supervisor.name + "'s Dashboard") : ("User Email: " + user.email)}</h4>
                    )
                    })}
        </div>

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
      {supervisorList != "" ? 
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
          <SettingsModalAs handleAppear={modalStatus}/>
      </div>
        )}
        </>
        }
    </div>
  )
}

export default AcademicSupervisorDashboard;