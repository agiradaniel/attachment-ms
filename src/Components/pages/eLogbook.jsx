import {React, useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Navbar from '../inc/Navbar';
import Chart from '../inc/chart';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"
import SignOut from '../inc/signOut';
import Dropdown from 'react-bootstrap/Dropdown';
import { db } from '../../firebase-config';
import {collection, getDocs, limit, onSnapshot, query, where} from 'firebase/firestore'
import InputModal from '../inc/InputsModal';
import { Button } from 'react-bootstrap';

const ELogbook = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [dropValue, setDropValue] = useState("week1")

    const [logged, setLogged] = useState([]);
    const [stuList, setStuList] = useState([]);


   
//this code is used to ensure that the current user is logged in otherwise it redirects to the login page
   /* useEffect(() => {
        if(!user){
          navigate("/");
        }
      },[]);*/

      const weekCollection = collection(db, dropValue);

     //this code is the same as the one below but it is more precise and only show the data related to the current user
      
     
     useEffect(()=>{
        
        const data = query(weekCollection, where("creatorId", "==", user.uid,), limit(1))
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let logged = []
            snapshot.docs.forEach((doc)=>{
               logged.push({...doc.data(), id: doc.id})
            })
            setLogged(logged)
           
      })
      console.log("Data retrieved from weekCollection")
      return () => unsuscribe();
      },[weekCollection])

      
      
     //this code shows data from the database but in a general manner(it shows everything)
/*
     useEffect(()=>{
        const getUsers = async() => {
          //const data = await getDocs(weekCollection)
          const data = query(weekCollection, where("creatorId", "==", "6URj5wbLUDXFRUyNha2E2QPpaBs2"))
          //set users to show all the data in the collection
          setLogged(data.docs.map((doc)=>({
            ...doc.data(), id: doc.id
          })))
          console.log(data.docs)
        }
       
       getUsers()
      })*/

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
            <div style={{backgroundColor:'#4e54c8', height: '100px'}}>
               <Navbar/>
               <SignOut/>
               <h1 className='text-center text-white' style={{marginTop:'-20px'}}>E-Logbook</h1>
            </div>

            <div className='lognotificationbar'>
              <div style={{margin:'140px 0 0 30px'}}>
                <Chart/>
            </div>   
            </div>
            

            <div className="logInputs">

           <div className='actionButtons'> 
            <Dropdown style={{textAlign: "center"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            {dropValue}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item value="week1" onClick={()=>{setDropValue("week1")}}>Week 1</Dropdown.Item>
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("week2")}}>Week 2</Dropdown.Item>
                            <Dropdown.Item value="week3" onClick={()=>{setDropValue("week3")}}>Week 3</Dropdown.Item>
                            <Dropdown.Item value="week4" onClick={()=>{setDropValue("week4")}}>Week 4</Dropdown.Item>
                            <Dropdown.Item value="week5" onClick={()=>{setDropValue("week5")}}>Week 5</Dropdown.Item>
                            <Dropdown.Item value="week6" onClick={()=>{setDropValue("week6")}}>Week 6</Dropdown.Item>
                            <Dropdown.Item value="week7" onClick={()=>{setDropValue("week7")}}>Week 7</Dropdown.Item>
                            <Dropdown.Item value="week8" onClick={()=>{setDropValue("week8")}}>Week 8</Dropdown.Item>
                            <Dropdown.Item value="week9" onClick={()=>{setDropValue("week9")}}>Week 9</Dropdown.Item>
                            <Dropdown.Item value="week10" onClick={()=>{setDropValue("week10")}}>Week 10</Dropdown.Item>
                            
                            
                        </Dropdown.Menu>
            </Dropdown>

          

            {stuList.map((stu) => {
               return(
                <>
                     
                {!stu.approvalStatus ? 
            
                 (
                    <InputModal/>
                ) : (<div className='d-flex' style={{border:"1px solid red", borderRadius:"8px",fontSize:"14px", fontWeight:"bold", height:"40px", marginLeft:"30px"}}>
                 <div style={{padding:"8px 2px 5px 10px"}}>Attachment status</div> <div style={{backgroundColor:"red",padding:"8px 10px 5px 5px", borderRadius:"0 8px 8px 0", color:"white"}}> Terminated</div>
                </div>)
                }
                </>
               )}
            )}

            </div> 
         
            {logged.map((log) => {
                return(
                    <Form style={{marginTop:40}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.monday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.tuesday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.wednesday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.thursday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.friday || ""} readOnly/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Weekly report" rows={3} value={log.report || ""} readOnly/>
                    </Form.Group>

                    {log.fieldSupervisorComments &&
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <h4 className="text-center" style={{margin:"20px 0 20px"}}>Field Supervisor Comments</h4>
                        <Form.Control as="textarea" placeholder="Weekly report" rows={3} style={{backgroundColor:"#EBEEF0"}} value={log.fieldSupervisorComments || ""} readOnly/>
                    </Form.Group>
                    }
                    {log.approvalStatus &&
                    <div className='text-center' style={{margin:"20px 0 20px"}}>
                    <a className='disabledButton'><Button variant="warning" className="btn btn-rounded" disabled>
                       <strong>{dropValue} Approved by Field Supervisor</strong> 
                    </Button></a>
                    </div>
                    }
                </Form>
                ) 
            })
        }
        
                
            </div>
        </>
    )
}

export default ELogbook;