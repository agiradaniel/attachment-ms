import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from '../../firebase-config';
import { updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

function SettingsModalFd(props) {

  const handleToggle = props.handleAppear;
  const [show, setShow] = useState(handleToggle || false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [user] = useAuthState(auth);
const [updatedDisplayName, setUpdatedDisplayName] = useState("");
const [company, setCompany] = useState("");
const [phone, setPhone] = useState("");



const updateName = async () => {
    const updatedUser = await updateProfile(user, {
    displayName: "Field Supervisor",
  });
};

const userCollection = collection(db, "Field-supervisor-details");

      const updateDetails = async() => {
        
        await addDoc(userCollection, {
            name: updatedDisplayName,
            company: company,
            phone: phone,
            role: "Field Supervisor",
            approval: false,
            creatorId: user.uid
        })
        handleClose(); 
      }

  return (
    
    <>
      <span onClick={handleShow}>
        Settings
      </span>

      <Modal show={show}>
        <Modal.Header style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Update user details to proceed</Modal.Title>
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
                     <label> Company </label>
                    <br/>
                    <input
                        type="text"
                        onChange={(event) => setCompany(event.target.value)}
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
         
          <Button onClick={()=>{updateName(); updateDetails()}} className="btn btn-purple-moon btn-rounded">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default SettingsModalFd;