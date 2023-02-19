import React, { useState } from 'react'
import Image from '../Images/login-img.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from '../inc/Navbar';
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


    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(newPassword === confirmPassword){
            await createUserWithEmailAndPassword(auth, newEmail, newPassword);
            navigate("/");
           }else{
             setErrorMessage("Passwords dont match")
        }
    }



    return(
        <>
            
            <div className='loginArea mx-auto'>
                <div className='text-white text-center loginImg' style={{backgroundImage: `url(${Image})`}} ><h1 className='mainH1'>CREATE ACCOUNT</h1></div>
                
                <div className='container myForm'>
                <form onSubmit={handleSubmit}>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            Student
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Student</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Field supervisor</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Academic supervisor</Dropdown.Item>
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