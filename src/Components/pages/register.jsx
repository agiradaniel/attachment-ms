import React, { useState } from 'react'
import Image from '../Images/login-img.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [value, setValue] = useState("Student")
    const [firebaseError, setFirebaseError] = useState("")


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(newPassword === confirmPassword){
                await createUserWithEmailAndPassword(auth, newEmail, newPassword);
                if(value === "Student"){
                    navigate("/");
                }else if(value === "Field Supervisor"){
                    navigate("/FieldSupervisorLogin");
                }else{
                    navigate("/AcademicSupervisorLogin");
                }
            }else{
                setErrorMessage("Passwords dont match")
            }
        }catch(err){
            setFirebaseError(err.message)
        }    
    }



    return(
        <>
            
            <div className='loginArea mx-auto'>
                <div className='text-white text-center loginImg' style={{backgroundImage: `url(${Image})`}} ><h1 className='mainH1'>CREATE ACCOUNT</h1></div>
                
                <div className='container myFormRegister'>
                <form onSubmit={handleSubmit}>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            {value}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item value="Student" onClick={()=>{setValue("Student")}}>Student</Dropdown.Item>
                            <Dropdown.Item value="fieldSupervisor" onClick={()=>{setValue("Field Supervisor")}}>Field supervisor</Dropdown.Item>
                            <Dropdown.Item value="academicSupervisor" onClick={()=>{setValue("Academic Supervisor")}}>Academic supervisor</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <div className="mb-3" style={{marginTop:10}}>
                        <label for="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={(e)=>{
                            setNewEmail(e.target.value);
                        }}/>
                       
                    </div>
                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setNewPassword(e.target.value);
                        }}/>
                    </div>

                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setConfirmPassword(e.target.value);
                        }}/>
                    </div>

                    <div><p>{errorMessage}</p></div>
                    <div><p>{firebaseError}</p></div>
                   
                    <button type="submit" className="btn btn-purple-moon btn-rounded" style={{marginTop:20}} >Create Account</button>

                    <p className="small fw-bold" style={{marginTop:20}}>Already have an account? <Link to="/"
                     className="link-primary">Login</Link></p>

                </form>
                </div>

            </div>
            
        </>
    );

}

export default Login;