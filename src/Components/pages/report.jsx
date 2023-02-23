import {React, useEffect, useState} from 'react';
import Navbar from '../inc/Navbar';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"
import SignOut from '../inc/signOut';
import {ref, uploadBytes} from 'firebase/storage'

const Report = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const [fileUpload, setFileUpload] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")

   /* useEffect(() => {
        if(!user){
          navigate("/");
        }
      },[]);*/

     const uploadFile = async(e) => {
      e.preventDefault();
      if(!fileUpload) return;
      const filesFolderRef = ref(storage, `Reports/${fileUpload.name}`)
      
      try{
        await uploadBytes(filesFolderRef, fileUpload);
        setSuccessMessage(fileUpload.name +" was uploaded successfully");
      }catch(err){
        console.error(err)
      }  
     } 
    
    return(
        <>
            <div style={{backgroundColor:'#4e54c8', height: '100px'}}>
               <Navbar/>
               <SignOut/>
               <h1 className='text-center text-white' style={{marginTop:'-20px'}}>Report</h1>
            </div>

            <div className="reportContainer container text-center">
                <form>
                <h2 style={{padding:'60px 0 60px 0'}}>Upload report</h2>
                <input type="file" className="form-control mx-auto" id="customFile" style={{width:'60%'}} 
                  onChange={(e )=>{
                    setFileUpload(e.target.files[0])
                  }}
                />
                <button type="submit" className="btn btn-purple-moon btn-rounded" style={{marginTop:'60px'}}
                  onClick={uploadFile}
                >Upload</button>
                </form>
                <div><p>{successMessage}</p></div>
            </div>
        </>
    )
}

export default Report;