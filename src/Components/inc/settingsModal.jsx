import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from '../../firebase-config';
import { updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

function SettingsModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [user] = useAuthState(auth);
const [updatedDisplayName, setUpdatedDisplayName] = useState("");
const [admNo, setAdmNo] = useState("");
const [location, setLocation] = useState("");
const [phone, setPhone] = useState("");



const updateName = async () => {
    const updatedUser = await updateProfile(user, {
    displayName: updatedDisplayName,
  });
};

const userCollection = collection(db, "user-details");

      const updateDetails = async() => {
        
        await addDoc(userCollection, {
            name: updatedDisplayName,
            admNo: admNo,
            location: location,
            phone: phone,
            role: "student",
            creatorId: user.uid
        })
      }

useEffect(()=>{
    console.log(user);
})



  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded'>
        Update Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update user settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mx-auto text-center">
                    <label> Update username </label>
                    <br/>
                    <input
                        type="text"
                        value={updatedDisplayName}
                        onChange={(event) => setUpdatedDisplayName(event.target.value)}
                        style={{margin: "10px 0 10px"}}
                     />
                     <br/>
                     <label> Adm No </label>
                    <br/>
                    <input
                        type="text"
                        onChange={(event) => setAdmNo(event.target.value)}
                        style={{margin: "10px 0 10px"}}
                     />
                      <br/>
                     <label> Location </label>
                    <br/>
                    <input
                        type="text"
                        onChange={(event) => setLocation(event.target.value)}
                        style={{margin: "10px 0 10px"}}
                     />
                      <br/>
                     <label> Phone </label>
                    <br/>
                    <input
                        type="text"
                        onChange={(event) => setPhone(event.target.value)}
                        style={{margin: "10px 0 10px"}}
                     />

                   
                    
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>{handleClose(); updateName(); updateDetails()}} className="btn btn-purple-moon btn-rounded">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default SettingsModal;