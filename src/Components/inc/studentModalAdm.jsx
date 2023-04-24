import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { db } from '../../firebase-config';
import {getDocs, collection, query, where, onSnapshot, limit, updateDoc, doc} from 'firebase/firestore';
import Dropdown from 'react-bootstrap/Dropdown';


function StudentModalAdm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const activeId = props.studentId;
  let name = "";
  let sname = "";
  let sid = "";
  let fid = "";
  let fname = "";

  const [dropValue, setDropValue] = useState("week1");
  const [stuList, setStuList] = useState([]);
  const [displaySettings, setDisplaySettings]  = useState("none");
  const [supervisorList, setSupervisorList] = useState([]);
  const [fdSupervisorList, setFdSupervisorList] = useState([]);
  
    //States for weekly data
    /*const [mondayLog, setMondayLog] = useState("");
    const [tuesdayLog, setTuesdayLog] = useState("");
    const [wednesdayLog, setWednesdayLog] = useState("");
    const [thursdayLog, setThursdayLog] = useState("");
    const [fridayLog, setFridayLog] = useState("");
    const [reportLog, setReportLog] = useState("");*/
    const [logged, setLogged] = useState([]);


  const students = collection(db, "user-details");
    //this code queries student details ie name number location
    useEffect(()=>{
        
        const data = query(students, where("creatorId", "==", activeId));
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

    
    const weekCollectionData = collection(db, dropValue);
      
     //this code queries logbook details for a specific student
     useEffect(()=>{
        
        const data = query(weekCollectionData, where("creatorId", "==", activeId), limit(1))
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let logged = []
            snapshot.docs.forEach((doc)=>{
               logged.push({...doc.data(), id: doc.id})
            })
            setLogged(logged);
            
           
      })
      console.log("Data from week collection retrieved")
      return () => unsuscribe();
      
      },[dropValue])

         //specifying the database collection
        const supervisorsCollectionRef = collection(db, "Academic-supervisor-details");

        //showing the data on the database collection on your page
         useEffect(()=>{
            const getSupervisors = async () => {
            const data = await getDocs(supervisorsCollectionRef)
        //set users to show all the data in the collection
             setSupervisorList(data.docs.map((doc)=>({
               ...doc.data(), id: doc.id
            })))

         }

          getSupervisors()
         },[])

        const updateSupervisorDetails = async (id) => {
          //in update you reference a specific doc not the whole collection
          
          const userDoc = doc(db, "user-details", id);
          await updateDoc(userDoc, {supervisorName: sname, supervisorId: sid});
      
        }

         //specifying the database collection
         const fdSupervisorsCollectionRef = collection(db, "Field-supervisor-details");

         //showing the data on the database collection on your page
          useEffect(()=>{
             const getFdSupervisors = async () => {
             const data = await getDocs(fdSupervisorsCollectionRef)
         //set users to show all the data in the collection
              setFdSupervisorList(data.docs.map((doc)=>({
                ...doc.data(), id: doc.id
             })))
 
          }
 
           getFdSupervisors()
          },[])

        const updateFdSupervisorDetails = async (id) => {
          //in update you reference a specific doc not the whole collection
          
          const userDocFd = doc(db, "user-details", id);
          await updateDoc(userDocFd, {fdSupervisorName: fname, fdSupervisorId: fid});
         
      
        }
       
  

  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded' style={{marginLeft:"30px",fontSize: "12px"}}>
        View Student
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Student details</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        {stuList.map((stu) => {
               return(
                <>
                     
                {!stu.approvalStatus ? 
            
                 (<div className='d-flex' style={{position:"absolute", right:"10px", top:"80px", border:"1px solid green", borderRadius:"8px",fontSize:"14px", fontWeight:"bold", height:"40px"}}>
                    <div style={{padding:"8px 2px 5px 10px"}}>Attachment status</div> <div style={{backgroundColor:"green",padding:"8px 10px 5px 5px", borderRadius:"0 8px 8px 0", color:"white"}}> Ongoing</div>
                 </div>
                ) : (<div className='d-flex' style={{position:"absolute", right:"10px", top:"80px", border:"1px solid red", borderRadius:"8px",fontSize:"14px", fontWeight:"bold", height:"40px"}}>
                 <div style={{padding:"8px 2px 5px 10px"}}>Attachment status</div> <div style={{backgroundColor:"red",padding:"8px 10px 5px 5px", borderRadius:"0 8px 8px 0", color:"white"}}> Terminated</div>
                </div>)
                }

                    <div style={{textAlign:"center", marginTop:"20px", background: "#4e54c8", color: "white", width:"50%", padding:"15px", borderRadius:"15px"}} className="mx-auto">
                       
                        <h4>Student Name: {stu.name}</h4>
                        <h4>Adm No: {stu.admNo}</h4>
                        <div style={{display:"none"}}> {name = stu.name} </div>
                        <div style={{display: displaySettings}}>
                        <h4>Phone: {stu.phone}</h4>
                        <h4>Location: {stu.location}</h4>
                       </div>
                        <a className='moreDetailsLink' onClick={()=>
                          
                            displaySettings === "none" ? setDisplaySettings("block") : setDisplaySettings("none")
                          
                          }>More details</a>
                    </div>

          {!stu.supervisorId ?
                      (<Dropdown style={{textAlign: "center", marginTop:40}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                          Assign Academic Supervisor
                        </Dropdown.Toggle>

                       <Dropdown.Menu>
                        {supervisorList.map((supervisor)=>{
                          return(
                            <Dropdown.Item onClick={()=>{
                              sname = supervisor.name;
                              sid = supervisor.creatorId;
                              updateSupervisorDetails(stu.id);
                            }}>{supervisor.name}</Dropdown.Item>
                          )
                        })}
                  
                      </Dropdown.Menu>
               </Dropdown>) : (<div style={{textAlign:"center", marginTop:"20px", background: "#4e54c8", color: "white", width:"50%", padding:"15px", borderRadius:"15px"}} className="mx-auto">
                  Student assigned to {stu.supervisorName}
                 </div>)}

      {!stu.fdSupervisorId ?
                      (<Dropdown style={{textAlign: "center", marginTop:40}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                          Assign Field Supervisor
                        </Dropdown.Toggle>

                       <Dropdown.Menu>
                        {fdSupervisorList.map((fdsupervisor)=>{
                          return(
                            <Dropdown.Item onClick={()=>{
                              fname = fdsupervisor.name;
                              fid = fdsupervisor.creatorId;
                              updateFdSupervisorDetails(stu.id);
                            }}>{fdsupervisor.name}</Dropdown.Item>
                          )
                        })}
                  
                      </Dropdown.Menu>
      </Dropdown>) : (<div style={{textAlign:"center", marginTop:"20px", background: "#4e54c8", color: "white", width:"50%", padding:"15px", borderRadius:"15px"}} className="mx-auto">
          Field Supervisor {stu.fdSupervisorName}
      </div>)}
              

                </>
                ) 
             
            })
        }


    <div className='logBookArea mx-auto' style={{width:"70%", marginTop:"20px"}}>
      <h3 style={{textAlign:"center"}}>Student Logbook</h3>
        <Dropdown style={{textAlign: "center", marginTop:40}}>
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

    {logged.map((log) => {
        return(      
        <>
        <Form style={{marginTop:40}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.monday || ""} readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.tuesday || ""} readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.wednesday || ""} readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.thursday || ""} readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.friday || ""} readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Not logged yet" rows={3} value={log.report || ""} readOnly
                        />
                    </Form.Group>
                    
    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Field Supervisor comments</Form.Label>
                        <Form.Control as="textarea" placeholder="Comments not made yet" rows={4} value={log.fieldSupervisorComments || ""} readOnly
                        />
                    </Form.Group>
                    <div className='d-flex justify-content-center'>
                      
                     {!log.approvalStatus ? (<div className='text-center' style={{marginLeft:"20px"}}><Button className="btn btn-rounded"  variant="danger" disabled>
                        {dropValue} Not Approved
                    </Button></div>  ):(<div style={{marginLeft:"20px"}}><a className='disabledButton'><Button variant="warning" className="disabled">{dropValue} Approved</Button></a></div>)
                    }
                    </div>

                </Form>
                </>
         ) 
        })
    }
  </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default StudentModalAdm;