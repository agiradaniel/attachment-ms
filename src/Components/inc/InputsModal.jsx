import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../firebase-config';
import Form from 'react-bootstrap/Form';
import {addDoc, collection, updateDoc, query, where, onSnapshot, doc} from 'firebase/firestore';
import Dropdown from 'react-bootstrap/Dropdown';


function InputModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [user] = useAuthState(auth);
  const [dropValue, setDropValue] = useState("week1");
  const [stuList, setStuList] = useState([]);
  const [progressIncrease, setProgressIncrease] = useState(null);
  const [progressDecrease, setProgressDecrease] = useState(null);
  const [logbookEmptyError, setLogbookEmptyError] = useState("");

    //States for weekly data
    const [mondayLog, setMondayLog] = useState("");
    const [tuesdayLog, setTuesdayLog] = useState("");
    const [wednesdayLog, setWednesdayLog] = useState("");
    const [thursdayLog, setThursdayLog] = useState("");
    const [fridayLog, setFridayLog] = useState("");
    const [reportLog, setReportLog] = useState("");


useEffect(()=>{
    console.log(user);
})

const students = collection(db, "user-details");
//this code queries student details ie name number location
useEffect(()=>{

const data = query(students, where("creatorId", "==", user.uid));
const unsuscribe =  onSnapshot(data, (snapshot) => {
    let stuList = []
    snapshot.docs.forEach((doc)=>{
       stuList.push({...doc.data(), id: doc.id})
    })
    setStuList(stuList);
    
    stuList.map((stu)=>{
      setProgressIncrease(stu.progress)
      setProgressDecrease(stu.progressNeg)
    })
   
})
console.log("Data from user details retrieved")
return () => unsuscribe();

},[])

const updateProgress = async(id) => {
    const progressDoc = doc(db, "user-details", id);
    await updateDoc(progressDoc, { progress: progressIncrease + 1, progressNeg: progressDecrease - 1})
}

const weekCollection = collection(db, dropValue);

      const submitLog = async(e) => {
        if(mondayLog && tuesdayLog && wednesdayLog && thursdayLog && fridayLog){
            e.preventDefault();
            await addDoc(weekCollection, {
                monday: mondayLog, 
                tuesday: tuesdayLog,
                wednesday: wednesdayLog,
                thursday: thursdayLog,
                friday: fridayLog,
                report: reportLog,
                creatorId: user.uid
            })
            stuList.map((stu) => {   
                updateProgress(stu.id)
             });
             handleClose();
        }else{
            setLogbookEmptyError("Logs cannot be empty")
        }
       
        
      }

 //this code clears the states to empty the input values
 const clearStateValues = () =>{
    setMondayLog(""); setTuesdayLog(""); setWednesdayLog(""); setThursdayLog(""); setFridayLog(""); setLogbookEmptyError("");
  }


  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded' style={{marginLeft:"30px"}}>
        + New
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Weekly Logs input</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Dropdown style={{textAlign: "center", marginTop:40}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            {dropValue}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item value="week1" onClick={()=>{setDropValue("week1"); clearStateValues()}}>Week 1</Dropdown.Item>
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("week2"); clearStateValues()}}>Week 2</Dropdown.Item>
                            <Dropdown.Item value="week3" onClick={()=>{setDropValue("week3"); clearStateValues()}}>Week 3</Dropdown.Item>
                            <Dropdown.Item value="week4" onClick={()=>{setDropValue("week4"); clearStateValues()}}>Week 4</Dropdown.Item>
                            <Dropdown.Item value="week5" onClick={()=>{setDropValue("week5"); clearStateValues()}}>Week 5</Dropdown.Item>
                            <Dropdown.Item value="week6" onClick={()=>{setDropValue("week6"); clearStateValues()}}>Week 6</Dropdown.Item>
                            <Dropdown.Item value="week7" onClick={()=>{setDropValue("week7"); clearStateValues()}}>Week 7</Dropdown.Item>
                            <Dropdown.Item value="week8" onClick={()=>{setDropValue("week8"); clearStateValues()}}>Week 8</Dropdown.Item>
                            <Dropdown.Item value="week9" onClick={()=>{setDropValue("week9"); clearStateValues()}}>Week 9</Dropdown.Item>
                            <Dropdown.Item value="week10" onClick={()=>{setDropValue("week10"); clearStateValues()}}>Week 10</Dropdown.Item>
                            
                            
                        </Dropdown.Menu>
            </Dropdown>

        <Form style={{marginTop:40}}>
                     <p style={{color:"red", fontWeight:"bold", textAlign:"center"}}>{logbookEmptyError}</p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done"  rows={1} value={mondayLog}
                            onChange={(e)=>{
                                setMondayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={tuesdayLog}
                            onChange={(e)=>{
                                setTuesdayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={wednesdayLog}
                            onChange={(e)=>{
                                setWednesdayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={thursdayLog}
                            onChange={(e)=>{
                                setThursdayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={fridayLog}
                            onChange={(e)=>{
                                setFridayLog(e.target.value)
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Text area" rows={3}
                            onChange={(e)=>{
                                setReportLog(e.target.value)
                            }}
                        />
                    </Form.Group>

                </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={submitLog} className="btn btn-purple-moon btn-rounded" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default InputModal;