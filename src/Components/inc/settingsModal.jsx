import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from '../../firebase-config';
import { updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

function SettingsModal(props) {
  const handleToggle = props.handleAppear;
  const [show, setShow] = useState(handleToggle || false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [user] = useAuthState(auth);
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [admNo, setAdmNo] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");



const updateName = async () => {
    const updatedUser = await updateProfile(user, {
    displayName: "student"
  });
  handleClose();
};

const userCollection = collection(db, "user-details");

      const updateDetails = async() => {
        
        await addDoc(userCollection, {
            name: updatedDisplayName,
            admNo: admNo,
            location: company,
            company: location,
            phone: phone,
            role: "student",
            progress: 0,
            progressNeg: 10,
            creatorId: user.uid
        })
      }

  return (
    
    <>
      <span onClick={handleShow}>
        Settings
      </span>

      <Modal show={show}>
        <Modal.Header style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Update user settings to proceed</Modal.Title>
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
                     <label> Company </label>
                    <br/>
                    <input
                        type="text"
                        onChange={(event) => setCompany(event.target.value)}
                        style={{margin: "10px 0 10px"}}
                     />
                      <br/>
                     <label> Location</label>
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
          <Button onClick={()=>{updateName(); updateDetails()}} className="btn btn-purple-moon btn-rounded">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default SettingsModal;