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

const ELogbook = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [dropValue, setDropValue] = useState("week1")

    const [logged, setLogged] = useState([]);


   
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

            <InputModal/>
            </div> 
         
            {logged.map((log) => {
                return(
                    <Form style={{marginTop:40}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.monday || ""}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.tuesday || ""}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.wednesday || ""}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.thursday || ""}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.friday || ""}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Weekly report" rows={3} value={log.report || ""}/>
                    </Form.Group>
                </Form>
                ) 
            })
        }
        
                
            </div>
        </>
    )
}

export default ELogbook;