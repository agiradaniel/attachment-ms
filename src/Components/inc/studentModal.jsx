import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { db } from '../../firebase-config';
import {addDoc, collection, query, where, onSnapshot, limit} from 'firebase/firestore';
import Dropdown from 'react-bootstrap/Dropdown';


function StudentModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);
  const activeId = props.studentId;

  const [dropValue, setDropValue] = useState("week1")
  const [stuList, setStuList] = useState([]);

    //States for weekly data
    /*const [mondayLog, setMondayLog] = useState("");
    const [tuesdayLog, setTuesdayLog] = useState("");
    const [wednesdayLog, setWednesdayLog] = useState("");
    const [thursdayLog, setThursdayLog] = useState("");
    const [fridayLog, setFridayLog] = useState("");
    const [reportLog, setReportLog] = useState("");*/
    const [logged, setLogged] = useState([]);

//code to input data to the database
    /*const weekCollection = collection(db, dropValue);

      const submitLog = async(e) => {
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
      }*/

 //this code clears the states to empty the input values
 /*const clearStateValues = () =>{
    setMondayLog(""); setTuesdayLog(""); setWednesdayLog(""); setThursdayLog(""); setFridayLog(""); 
  }*/

  const students = collection(db, "user-details");

    useEffect(()=>{
        
        const data = query(students, where("creatorId", "==", activeId));
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let stuList = []
            snapshot.docs.forEach((doc)=>{
               stuList.push({...doc.data(), id: doc.id})
            })
            setStuList(stuList)
           
      })
      return () => unsuscribe();
      },[])

    
      const weekCollection = collection(db, dropValue);
      
     
     useEffect(()=>{
        
        const data = query(weekCollection, where("creatorId", "==", activeId), limit(1))
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let logged = []
            snapshot.docs.forEach((doc)=>{
               logged.push({...doc.data(), id: doc.id})
            })
            setLogged(logged)
           
      })
      return () => unsuscribe();
      },[])


  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded' style={{marginLeft:"30px",fontSize: "10px"}}>
        View Student
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Student details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {stuList.map((stu) => {
                return(
                    <div>
                        <p>{stu.name}</p>
                    </div>
                ) 
            })
        }

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

        <Form style={{marginTop:40}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" value={log.monday || ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" value={log.tuesday || ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" value={log.wednesday || ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" value={log.thursday || ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" value={log.friday || ""}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Text area" rows={3} value={log.report || ""}
                        />
                    </Form.Group>

                </Form>
         ) 
        })
    }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" className="btn btn-purple-moon btn-rounded" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default StudentModal;