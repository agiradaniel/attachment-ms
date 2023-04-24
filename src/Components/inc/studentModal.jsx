import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { db } from '../../firebase-config';
import {addDoc, collection, query, where, onSnapshot, limit, updateDoc, doc} from 'firebase/firestore';
import Dropdown from 'react-bootstrap/Dropdown';
import FileIcon from '../Images/fileIcon.jpeg'


function StudentModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);resetStates()};
  const handleShow = () => setShow(true);
  const activeId = props.studentId;
  const [punctuality, setPunctuality] = useState(0);
  const [adherence, setAdherence] = useState(0);
  const [workmanship, setWorkmanship] = useState(0);
  const [workOutput, setWorkOutput] = useState(0);
  const [adaptability, setAdaptability] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [reliability, setReliability] = useState(0);
  const [teamwork, setTeamwork] = useState(0);
  let marks = parseInt(punctuality) + parseInt(adherence) + parseInt(workmanship) + parseInt(workOutput) + parseInt(adaptability) + parseInt(communication) + parseInt(reliability) + parseInt(teamwork)
  let name = "";

  const [dropValue, setDropValue] = useState("week1")
  const [stuList, setStuList] = useState([]);
  const [supervisorComments, setSupervisorComments] = useState("");
  const [displaySettings, setDisplaySettings]  = useState("none");
  const [report, setReport] = useState([]);


    //States for weekly data
    /*const [mondayLog, setMondayLog] = useState("");
    const [tuesdayLog, setTuesdayLog] = useState("");
    const [wednesdayLog, setWednesdayLog] = useState("");
    const [thursdayLog, setThursdayLog] = useState("");
    const [fridayLog, setFridayLog] = useState("");
    const [reportLog, setReportLog] = useState("");*/
    const [logged, setLogged] = useState([]);
    const [stuMarks, setStuMarks] = useState([]);

//code to input marks data to the database
      const marksCollection = collection(db, "student-marks");

      const submitMarks = async(e) => {
        //e.preventDefault();
        await addDoc(marksCollection, {
            studentName: name,
            punctuality: punctuality, 
            aherence: adherence,
            workmanship: workmanship,
            workOutput: workOutput,
            adaptability: adaptability,
            communication: communication,
            reliability: reliability,
            teamwork: teamwork,
            totalMarks: marks,
            studentId: activeId
        })
      }

      const submitApproval = async (id) => {
        //in update you reference a specific doc not the whole collection
        
        const approveDoc = doc(db, dropValue, id);
        await updateDoc(approveDoc, { approvalStatus: true})
      }

      //code to input supervisor comments data to the database
      const updateSupervisorComments = async (id) => {
        //in update you reference a specific doc not the whole collection
        
        const userDoc = doc(db, dropValue, id);
        await updateDoc(userDoc, { fieldSupervisorComments: supervisorComments})
      }

 //this code clears the states to empty the input values
 const clearState = () =>{
    setSupervisorComments("")
  }

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

      const reportDataCollection = collection(db, "reports");
      //this code is to query report data
      useEffect(()=>{
        
        const data = query(reportDataCollection, where("creatorId", "==", activeId), limit(1))
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let report = []
            snapshot.docs.forEach((doc)=>{
               report.push({...doc.data(), id: doc.id})
            })
            setReport(report)
           
      })
      console.log("Data from marks collection retrieved")
      return () => unsuscribe();
      
      },[])

      const marksDataCollection = collection(db, "student-marks");
      //this code is to query marks data
      useEffect(()=>{
        
        const data = query(marksDataCollection, where("studentId", "==", activeId), limit(1))
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let stuMarks = []
            snapshot.docs.forEach((doc)=>{
               stuMarks.push({...doc.data(), id: doc.id})
            })
            setStuMarks(stuMarks)
           
      })
      console.log("Data from marks collection retrieved")
      return () => unsuscribe();
      
      },[])

      //this is to reset assigned marks back to 0 it is called with the handleclose function
      const resetStates = () =>{
        setPunctuality(0);setAdherence(0);setWorkmanship(0);setWorkOutput(0);setAdaptability(0);setCommunication(0);setReliability(0);setTeamwork(0);setSupervisorComments(""); name="";
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
                            <Dropdown.Item value="week1" onClick={()=>{setDropValue("week1"); clearState()}}>Week 1</Dropdown.Item>
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("week2"); clearState()}}>Week 2</Dropdown.Item>
                            <Dropdown.Item value="week3" onClick={()=>{setDropValue("week3"); clearState()}}>Week 3</Dropdown.Item>
                            <Dropdown.Item value="week4" onClick={()=>{setDropValue("week4"); clearState()}}>Week 4</Dropdown.Item>
                            <Dropdown.Item value="week5" onClick={()=>{setDropValue("week5"); clearState()}}>Week 5</Dropdown.Item>
                            <Dropdown.Item value="week6" onClick={()=>{setDropValue("week6"); clearState()}}>Week 6</Dropdown.Item>
                            <Dropdown.Item value="week7" onClick={()=>{setDropValue("week7"); clearState()}}>Week 7</Dropdown.Item>
                            <Dropdown.Item value="week8" onClick={()=>{setDropValue("week8"); clearState()}}>Week 8</Dropdown.Item>
                            <Dropdown.Item value="week9" onClick={()=>{setDropValue("week9"); clearState()}}>Week 9</Dropdown.Item>
                            <Dropdown.Item value="week10" onClick={()=>{setDropValue("week10"); clearState()}}>Week 10</Dropdown.Item>
                            
                            
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
                        <Form.Control as="textarea" placeholder="Text area" rows={3} value={log.report || ""} readOnly
                        />
                    </Form.Group>
                    
                    <h4 style={{textAlign:"center",margin:"50px 0 40px"}}>Field supervior comments for {dropValue}</h4>
    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control as="textarea" placeholder="Input comments here" rows={4} value={log.fieldSupervisorComments || supervisorComments}
                          onChange={(e)=>{setSupervisorComments(e.target.value)}}
                        />
                    </Form.Group>
                    <div className='d-flex justify-content-center'>
                    {!log.fieldSupervisorComments ? (<div className='text-center'><Button className="btn btn-purple-moon btn-rounded" onClick={()=>updateSupervisorComments(log.id)}>
                        Save Comment
                      </Button></div>):(<div><a className='disabledButton'><Button variant="warning" className="disabled">Comment Saved</Button></a></div>)
                    }
                      
                     {!log.approvalStatus ? (<div className='text-center' style={{marginLeft:"20px"}}><Button className="btn btn-purple-moon btn-rounded" onClick={()=>submitApproval(log.id)}>
                        Approve {dropValue}
                    </Button></div>  ):(<div style={{marginLeft:"20px"}}><a className='disabledButton'><Button variant="warning" className="disabled">{dropValue} Approved</Button></a></div>)
                    }
                    </div>

                </Form>
                </>
         ) 
        })
    }
      <div style={{textAlign:"center", marginTop:"40px", background: "#4e54c8", color: "white", padding:"15px", borderRadius:"15px"}} className="mx-auto">
        <h4 style={{textAlign:"center", textDecoration:"underline"}}>Student Report</h4>
        
      {report.length > 0 ? (

        report.map((repData) => {
             return(
               <>  
           
                <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}>
                  <img src={FileIcon} alt="file icon" style={{width:"35px", height:"35px", margin:"3px 20px 0 0"}}/>
                  <p style={{margin:"8px 20px 0 0"}}>{repData.reportName}</p>
                  <a href={repData.reportLink} target="_blank"><Button className="btn btn-purple-moon btn-rounded" style={{height:"40px"}}>View Report</Button></a>
                </div>
                     
                </>
                ) 
            })
          
          ):(
            <p>Not Uploaded Yet!</p>
          )}
      </div>


  </div>

  <div style={{marginTop:"60px", width:"70%"}} className="mx-auto">
    
  </div>

  <div style={{marginTop:"40px", width:"70%", border:"1px solid grey", padding:"40px 100px 40px 100px", borderRadius:"15px"}} className="mx-auto">
    <h4 style={{textAlign:"center"}}>Assessment sheet</h4>
    
    <Form>
      <div className='d-flex justify-content-between' style={{marginTop:"40px"}}>
        <div><label>Punctuality</label></div>
         <div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={1} onChange={(e)=>setPunctuality(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={2} onChange={(e)=>setPunctuality(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={3} onChange={(e)=>setPunctuality(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value={4} onChange={(e)=>setPunctuality(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
        </div>   
      </div>   

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
          <div><label>Adherence to regulations</label></div>
          <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions2" value={1} onChange={(e)=>setAdherence(e.target.value)} />
                <label className="form-check-label" for="inlineRadio1">1</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions2" value={2} onChange={(e)=>setAdherence(e.target.value)}  />
              <label className="form-check-label" for="inlineRadio2">2</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions2" value={3} onChange={(e)=>setAdherence(e.target.value)}  />
              <label className="form-check-label" for="inlineRadio3">3</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions2" value={4} onChange={(e)=>setAdherence(e.target.value)}  />
              <label className="form-check-label" for="inlineRadio4">4</label>
            </div>
          </div>   
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Workmanship</label></div>
         <div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={1} onChange={(e)=>setWorkmanship(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={2} onChange={(e)=>setWorkmanship(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={3} onChange={(e)=>setWorkmanship(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={4} onChange={(e)=>setWorkmanship(e.target.value)} disabled/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
        </div>  
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Work Output</label></div>
        <div>  
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={1} onChange={(e)=>setWorkOutput(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={2} onChange={(e)=>setWorkOutput(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={3} onChange={(e)=>setWorkOutput(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={4} onChange={(e)=>setWorkOutput(e.target.value)} disabled/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
        </div>
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Adaptability</label></div>
         <div> 
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={1} onChange={(e)=>setAdaptability(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={2} onChange={(e)=>setAdaptability(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={3} onChange={(e)=>setAdaptability(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={4} onChange={(e)=>setAdaptability(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
        </div> 
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Communication</label></div>
        <div> 
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={1} onChange={(e)=>setCommunication(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={2} onChange={(e)=>setCommunication(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={3} onChange={(e)=>setCommunication(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={4} onChange={(e)=>setCommunication(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
        </div>   
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Reliability</label></div>
         <div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={1} onChange={(e)=>setReliability(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={2} onChange={(e)=>setReliability(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={3} onChange={(e)=>setReliability(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={4} onChange={(e)=>setReliability(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
        </div>  
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Teamwork</label></div>
        <div> 
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions9" value={1} onChange={(e)=>setTeamwork(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions9" value={2} onChange={(e)=>setTeamwork(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions9" value={3} onChange={(e)=>setTeamwork(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions9" value={4} onChange={(e)=>setTeamwork(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
        </div>   
      </div>  
  

      {(stuMarks != "") ? (stuMarks.map((mks) => {
            
               return(
                 <> 
                 
                  <div className='text-center' style={{marginTop:"20px"}}>
                      <p>Submitted Marks: {mks.totalMarks}</p>
                     <a className='disabledButton'><Button variant="warning" className="btn btn-rounded" onClick={submitMarks} disabled>
                        Submitted
                      </Button></a>
                  </div>
                  
                </>   
                ) 
              })
              ):(
                <div className='text-center' style={{marginTop:"20px"}}>
                  <p>Assigned Marks: {marks}</p>
                 <Button className="btn btn-purple-moon btn-rounded" onClick={submitMarks}>
                  Submit Marks
                </Button>
             </div> 
      )}

    </Form>
    
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

//render(<Example />);
export default StudentModal;