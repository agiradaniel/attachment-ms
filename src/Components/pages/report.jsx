import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { Button } from 'react-bootstrap';
import SideBarMenu from '../inc/sideBar';
import {addDoc, collection, query, where, onSnapshot, limit} from "firebase/firestore"
import { db } from '../../firebase-config';
import FileIcon from '../Images/fileIcon.jpeg'

const Report = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const [fileUpload, setFileUpload] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [link, setLink] = useState("");
    const [report, setReport] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("");
   /* useEffect(() => {
        if(!user){
          navigate("/");
        }
      },[]);*/

      const uploadFile = async (e) => {
        e.preventDefault();
        if (!fileUpload) return;
      
        const filesFolderRef = ref(storage, `Reports/${fileUpload.name}`);
      
        try {
          setSuccessMessage("Uploading Report...");
          const uploadTaskSnapshot = await uploadBytesResumable(filesFolderRef, fileUpload);
          setSuccessMessage(fileUpload.name + " was uploaded successfully");
          setLoadingStatus("Preparing Report.....");
      
          getDownloadURL(ref(storage, uploadTaskSnapshot.metadata.fullPath)).then((downloadURL) => {
            setLink(downloadURL);
            addLinkToDB(downloadURL);
          }).catch((err) => {
            console.error(err);
          });
        } catch (err) {
          console.error(err);
        }
      };
      
      const reportsCollectionRef = collection(db, "reports");

      const addLinkToDB = async (downloadURL) => {
        try {
          await addDoc(reportsCollectionRef, { creatorId: user.uid, reportLink: downloadURL, reportName: fileUpload.name });
          setLoadingStatus("");
        } catch (error) {
          console.error("Error adding document:", error);
        }
      };
      

      const reportDataCollection = collection(db, "reports");
      //this code is to query report file
      useEffect(()=>{
        
        const data = query(reportDataCollection, where("creatorId", "==", user.uid), limit(1))
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
      
    
    return(
        <>
            <div style={{backgroundColor:'#4e54c8', height: '100px'}}>
               <h1 className='text-center text-white' style={{paddingTop:'20px'}}>Report</h1>
            </div>

            <SideBarMenu/>

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
                <div style={{marginTop:"10px"}}><p>{successMessage}</p></div>
                <div style={{marginTop:"40px"}}><p>{loadingStatus}</p></div>

                {report.map((repData) => {
                return(
                   <>
                  
                   <h4 style={{marginTop:"60px"}}>My Report</h4>
                   <div style={{display:"flex", justifyContent:"center"}}>
                    <img src={FileIcon} alt="file icon" style={{width:"35px", height:"35px", margin:"3px 20px 0 0"}}/>
                    <p style={{margin:"8px 20px 0 0"}}>{repData.reportName}</p>
                    <a href={repData.reportLink || link} target="_blank"><Button className="btn btn-purple-moon btn-rounded" style={{height:"40px"}}>Open Report</Button></a>
                   </div>
                  
                   </>
                ) 
            })
        }

            </div>
        </>
    )
}

export default Report;