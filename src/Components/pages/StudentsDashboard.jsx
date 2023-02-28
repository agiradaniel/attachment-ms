import {React, useState, useEffect} from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import Navbar from '../inc/Navbar';
import Chart from '../inc/chart';
import Footer from '../inc/footer';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"
import SignOut from '../inc/signOut';
//import { updateProfile } from 'firebase/auth';
import SettingsModal from '../inc/settingsModal';
import GradeModal from '../inc/gradeModal';
import {collection, query, where, onSnapshot} from 'firebase/firestore';


const StudentDashboard = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    let temp = 2;
    const [stuList, setStuList] = useState([]);

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
      const students = collection(db, "user-details");
        //this code queries student details ie name number location
        useEffect(()=>{
        
        const data = query(students, where("creatorId", "==", user.uid));
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let stuList = []
            snapshot.docs.forEach((doc)=>{
               stuList.push({...doc.data(), id: doc.id})
            })
            setStuList(stuList)
           
      })
      console.log("Data from user details retrieved")
      return () => unsuscribe();
      
      },[])

    
    return(
        <>

            <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
               <Navbar/>
               
               <SignOut/>
               <h1 className='text-center text-white' style={{paddingTop:'40px'}}>Student Dashboard</h1>
            </div>

            <div className='notificationbar'>
                <div className='text-center' style={{marginTop:'190px'}}>
                    <h5>Physical assessment schedule</h5>
                {stuList.map((stu) => {
                    return(
                    <div>{stu.assessmentDate ? <div style={{border:"1px solid red", width:"50%", margin:"auto"}}>{stu.assessmentDate}</div> : "Not set"}</div>
                    )
                })}
                    <h5 style={{marginTop:'40px'}}>Announcements</h5>
                    <p>None yet</p>
                    <GradeModal/>
                </div>
            </div>


            <div style={{width:'70%'}} className="main-area">  
                <div className='studentname'>
                    <h4 className='text-center'>{user.displayName ? (user.displayName + "'s dashboard") : ("User Email: " + user.email)}</h4>
                </div>

                {user.displayName ? 
                (<div className='buttonwrap d-flex justify-content-center container'>
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
                </div>):(<div className='mx-auto text-center' style={{height:"270px"}}>
                    <h3 style={{paddingTop:"150px"}}>Hi ,,, Update your details to proceed</h3>
                    <SettingsModal/>
                </div>)
                }

                <div className='d-flex justify-content-center' style={{marginTop:'40px'}}>
                    <Chart/>
                    
                </div>
            

            </div>    
            <Footer/>
        </>
    )
}

export default StudentDashboard;