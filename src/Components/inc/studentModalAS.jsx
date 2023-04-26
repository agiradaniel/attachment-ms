import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { db } from '../../firebase-config';
import {addDoc, collection, query, where, onSnapshot, limit, updateDoc, doc} from 'firebase/firestore';
import Dropdown from 'react-bootstrap/Dropdown';
import FileIcon from '../Images/fileIcon.jpeg'


function StudentModalAS(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);resetStates()};
  const handleShow = () => setShow(true);
  const activeId = props.studentId;
  const [adherence, setAdherence] = useState(0);
  const [presentation, setPresentation] = useState(0);
  const [evidence, setEvidence] = useState(0);
  const [organizational, setOrganizational] = useState(0);
  const [mandate, setMandate] = useState(0);
  const [general, setGeneral] = useState(0);
  const [activity, setActivity] = useState(0);
  const [penalty, setPenalty]  = useState(0);
  let marks = parseInt(adherence) + parseInt(presentation) + parseInt(evidence) + parseInt(organizational) + parseInt(mandate) + parseInt(general) + parseInt(activity) + parseInt(penalty)
  let name = "";

  const [dropValue, setDropValue] = useState("week1")
  const [stuList, setStuList] = useState([]);
  const [displaySettings, setDisplaySettings]  = useState("none");
  const [assessmentDate, setAssessmentDate] = useState("");
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
      const marksCollection = collection(db, "student-marksas");

      const submitMarks = async(e) => {
        //e.preventDefault();
        await addDoc(marksCollection, {
            studentName: name,
            adherence: adherence,
            presentation: presentation,
            evidence: evidence,
            organizational: organizational,
            mandate: mandate,
            general: general,
            activity: activity,
            penalty: penalty,
            totalMarks: marks,
            studentId: activeId
        })
      }

      const submitApproval = async (id) => {
        //in update you reference a specific doc not the whole collection
        
        const approveDoc = doc(db, "user-details", id);
        await updateDoc(approveDoc, { approvalStatus: true})
      }

      const submitAssesmentDate = async (id) => {
        //in update you reference a specific doc not the whole collection
        
        const assessmentDoc = doc(db, "user-details", id);
        await updateDoc(assessmentDoc, { assessmentDate: assessmentDate})
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

      const marksDataCollection = collection(db, "student-marksas");
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
        setAdherence(0);setPresentation(0);setEvidence(0);setOrganizational(0);setMandate(0);setGeneral(0);setActivity(0); name="";
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
                        <h4>Company: {stu.location}</h4>
                        <h4>Location: {stu.company || "Not set"}</h4>
                       </div>
                        <a className='moreDetailsLink' onClick={()=>
                          
                            displaySettings === "none" ? setDisplaySettings("block") : setDisplaySettings("none")
                          
                          }>More details</a>
                    </div>
                    {!stu.assessmentDate ?
                    (<div style={{textAlign:"center", marginTop:"20px", background: "#4e54c8", color: "white", width:"50%", padding:"15px", borderRadius:"15px"}} className="mx-auto">
                       
                       <h5>Set assessment date</h5>
                        <input type="date" style={{borderRadius:"8px", padding:"5px", backgroundColor:"#BBB2AC", color:"white", fontWeight:"bold"}}
                          onChange={(e)=>{
                            setAssessmentDate(e.target.value);
                            submitAssesmentDate(stu.id);
                          }}
                        />
                    </div>):(
                      <div style={{textAlign:"center", marginTop:"20px", background: "#4e54c8", color: "white", width:"50%", padding:"15px", borderRadius:"15px"}} className="mx-auto">
                       
                      <h5>Assessment date set to: {stu.assessmentDate}</h5>
          
                   </div>
                    )
                   }
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


  <div style={{marginTop:"40px", width:"70%", border:"1px solid grey", padding:"40px 50px 40px 50px", borderRadius:"15px"}} className="mx-auto">
    <h4 style={{textAlign:"center"}}>Assessment sheet</h4>
    
    <Form>
      <div className='d-flex justify-content-between' style={{marginTop:"40px"}}>
        <div><label>Adherence to Guidelines</label></div>
         <div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={1} onChange={(e)=>setAdherence(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={2} onChange={(e)=>setAdherence(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={3} onChange={(e)=>setAdherence(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          
        </div>   
      </div>   

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
          <div><label>Presentation Neatness</label></div>
          <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions2" value={1} onChange={(e)=>setPresentation(e.target.value)} />
                <label className="form-check-label" for="inlineRadio1">1</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions2" value={2} onChange={(e)=>setPresentation(e.target.value)}  />
              <label className="form-check-label" for="inlineRadio2">2</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions2" value={3} onChange={(e)=>setPresentation(e.target.value)}  />
              <label className="form-check-label" for="inlineRadio3">3</label>
            </div>
            
          </div>   
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Evidence of Learned Skills / Training</label></div>
         <div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={1} onChange={(e)=>setEvidence(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={2} onChange={(e)=>setEvidence(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={3} onChange={(e)=>setEvidence(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions3" value={4} onChange={(e)=>setEvidence(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
         
        </div>  
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Organizational Structure of Institution</label></div>
        <div>  
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={1} onChange={(e)=>setOrganizational(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={2} onChange={(e)=>setOrganizational(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={3} onChange={(e)=>setOrganizational(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={4} onChange={(e)=>setOrganizational(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions5" value={5} onChange={(e)=>setOrganizational(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">5</label>
          </div>
        </div>
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Mandate / Role of institutions</label></div>
         <div> 
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={1} onChange={(e)=>setMandate(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={2} onChange={(e)=>setMandate(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={3} onChange={(e)=>setMandate(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={4} onChange={(e)=>setMandate(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions6" value={5} onChange={(e)=>setMandate(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">5</label>
          </div>
        </div> 
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>General / Ongoing Work at Institution</label></div>
        <div> 
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={1} onChange={(e)=>setGeneral(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={2} onChange={(e)=>setGeneral(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={3} onChange={(e)=>setGeneral(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={4} onChange={(e)=>setGeneral(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions7" value={5} onChange={(e)=>setGeneral(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">5</label>
          </div>
        </div>   
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px"}}>Student Activity at Institution</label></div>
         <div>
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={1} onChange={(e)=>setActivity(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={2} onChange={(e)=>setActivity(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={3} onChange={(e)=>setActivity(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={4} onChange={(e)=>setActivity(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">4</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions8" value={5} onChange={(e)=>setActivity(e.target.value)}/>
            <label className="form-check-label" for="inlineRadio4">5</label>
          </div>
        </div>  
      </div>  

      <div className='d-flex justify-content-between' style={{marginTop:"10px"}}>
        <div><label style={{marginRight:"15px", color:"red"}}>Penalty for Character Assessment if any noted(-10mks)</label></div>
        <div> 
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" name="inlineRadioOptions9" value={-10} onChange={(e)=>setPenalty(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">-10</label>
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

  {stuList.map((stu) => {
       return(
        <div className='text-center mt-4 mb-4'>
        {!stu.approvalStatus ? 
            
         (<div>
            <Button variant="primary" className="btn btn-rounded" onClick={()=>submitApproval(stu.id)}>Approve and Terminate Attachment</Button>
         </div>
        ) : (<div>
             <Button variant="danger" className="btn btn-rounded" disabled>Approved and Terminated</Button>
            </div>)
        }
        </div>
    )}
    )}

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
export default StudentModalAS;