import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from '../../firebase-config';
import {getDocs, collection, query, where, onSnapshot, limit, updateDoc, doc} from 'firebase/firestore';
import Dropdown from 'react-bootstrap/Dropdown';

function SupervisorModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [user] = useAuthState(auth);
  const [fdSupervisorList, setFdSupervisorList] = useState([]);
  const [stuList, setStuList] = useState([]);
  let fid = "";
  let fname = "";
 
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
      <div onClick={handleShow}>
        Supervisor
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Choose Your Field Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {stuList.map((stu) => {
               return(
                <>
                  {!stu.fdSupervisorId ?
                                (<Dropdown style={{textAlign: "center"}}>
                                  <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                                    Choose Field Supervisor
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
               )}
        )}
              

        
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="btn btn-purple-moon btn-rounded">
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default SupervisorModal;