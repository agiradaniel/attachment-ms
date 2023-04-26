import {React, useState, useEffect} from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import Chart from '../inc/chart';
import Footer from '../inc/footer';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"
//import { updateProfile } from 'firebase/auth';
import SettingsModal from '../inc/settingsModal';
import GradeModal from '../inc/gradeModal';
import {collection, query, where, onSnapshot, getDocs} from 'firebase/firestore';
import { FidgetSpinner } from  'react-loader-spinner'
import SideBarMenu from '../inc/sideBar';
import { Button } from 'react-bootstrap';


const StudentDashboard = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    let temp = 2;
    let no = 1;
    const [stuList, setStuList] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);

    /*const available = null;
    const theme = available;*/


    //const [updatedDisplayName, setUpdatedDisplayName] = useState("")

    useEffect(() => {
        if(!user || user.displayName !== "student" && user.displayName !== null){
          navigate("/");
        }

        console.log(auth.currentUser)
      },[]);

      
      /*const updateName = async () => {
        const updatedUser = await updateProfile(user, {
          displayName: "student"
        });
      };*/
      
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

      const announcementCollection = collection(db, "announcements");

      useEffect(()=>{
        const getAnnouncements = async () => {
          const data = await getDocs(announcementCollection)
          //set users to show all the data in the collection
          setAnnouncements(data.docs.map((doc)=>({
            ...doc.data(), id: doc.id
          })))
    
        }
    
        getAnnouncements()
      },[])

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
          setModalStatus(true)
        }, 2000);
        return () => clearTimeout(timer);
      }, []);


    
    return(
        <>

            <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
               <h1 className='text-center text-white' style={{paddingTop:'70px'}}>Student Dashboard</h1>
            </div>

            <div className='notificationbar'>
                <div className='text-center' style={{marginTop:'130px'}}>
                    <h5>Physical assessment schedule</h5>
                {stuList.map((stu) => {
                    return(
                    <div>{stu.assessmentDate ? <div style={{border:"3px solid red", width:"40%", margin:"auto", padding:"3px", borderRadius:"5px"}}>{stu.assessmentDate}</div> : <p style={{marginTop:"10px"}}>Not set</p>}</div>
                    )
                })}
                    <h5 style={{marginTop:'40px'}}>Announcements</h5>
                    
                    
                    <div style={{width:"60%", margin:"auto", border:"3px solid #4e54c8", padding:"3px", borderRadius:"5px", maxHeight:"170px", overflowX:"hidden",overflowY:"scroll", backgroundColor:"white"}}>
                    {announcements.map((ancmt)=>{
                        return(
                            <>
                                
                                    <div>{ancmt.announcement ?  (no++ +". " + ancmt.announcement + " ~ " + ancmt.date) : <div>None yet</div>}</div>
                              
                            </>
                        )
                    })}
                    </div>
                    
                    <GradeModal/>
                </div>
            </div>

          <SideBarMenu/>

            {isLoading ? 
            <div style={{height:"660px",width:'70%', textAlign:"center"}}>
                <div style={{marginTop:"250px"}}>
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
            <div style={{width:'70%', height:'70vh'}} className="main-area">  
                <div className='studentname'>
                {stuList.map((stu) => {
                    return(
                        <h4 className='text-center'>{stu.name ? (stu.name + "'s dashboard") : ("User Email: " + user.email)}</h4>
                     )
                    })}
                </div>
               
                        {stuList != "" ? 
                            (
                            <>
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
                              <div style={{marginTop:'40px'}}>
                              <Chart/>
                             
                                </div>
                                
                            </>
                             ):
                             (<div className='mx-auto text-center' style={{height:"660px"}}>
                                 <h3 style={{paddingTop:"150px"}}>Hi ,,, Update your details to proceed</h3>
                                  <SettingsModal handleAppear={modalStatus}/>
                              </div>)
                              }
            

            </div>}
            <Footer/>
        </>
    )
}

export default StudentDashboard;