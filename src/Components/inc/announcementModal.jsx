import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from '../../firebase-config';

import { addDoc, collection } from 'firebase/firestore';

function AnnouncementModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [user] = useAuthState(auth);

const [announcement, setAnnouncement] = useState("");





const announcementCollection = collection(db, "announcements");

      const updateAnnouncement = async() => {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB');
        await addDoc(announcementCollection, {
            announcement: announcement,
            creatorId: user.uid,
            date: date
            
        })
      }



  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded' >
        New Announcement
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Make an Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mx-auto text-center">
                    <label>New Announcement</label>
                    <br/>
                    <textarea
                        type="text"
                        onChange={(event) => setAnnouncement(event.target.value)}
                        style={{margin: "10px 0 10px", width:"50%", borderRadius:"5px"}}
                     />
                    
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>{handleClose(); updateAnnouncement()}} className="btn btn-purple-moon btn-rounded">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default AnnouncementModal;