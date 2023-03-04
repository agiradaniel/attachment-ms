import React, { useState } from 'react'
import Image from '../Images/login-img.jpg';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import Dropdown from 'react-bootstrap/Dropdown';

const AcademicSupervisorLogin = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

    const signUserIn = async (e) => {
       try{
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/AcademicSupervisorDashboard")
       }catch(err){
        setErrorMessage(err.message)
       }
    }
    
    return(
        <>
            
            <div className='loginArea mx-auto'>
                <div className='text-white text-center loginImg' style={{backgroundImage: `url(${Image})`}} ><h1 className='mainH1'>SIGN IN</h1></div>
                
                <div className='container myForm'>

                <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            Academic Supervisor Login
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to="/"><Dropdown.Item href="#/action-2">Student</Dropdown.Item></Link>
                            <Link to="/FieldSupervisorLogin"><Dropdown.Item href="#/action-3">Field supervisor</Dropdown.Item></Link>
                            <Link to="/AcademicSupervisorLogin"><Dropdown.Item href="#/action-4">Academic supervisor</Dropdown.Item></Link>
                            <Link to="/AdminLogin"><Dropdown.Item href="#/action-5">Admin</Dropdown.Item></Link>
                        </Dropdown.Menu>
                    </Dropdown>

                <form onSubmit={signUserIn}>
                    
                    <div className="mb-3" style={{marginTop:30}}>
                        <label for="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                       
                    </div>
                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </div>

                    <div>{errorMessage}</div>
                   
                    <div className="mb-3 form-check" style={{marginTop:20}}>
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-purple-moon btn-rounded" style={{marginTop:20}} >Sign in</button>

                    <p className="small fw-bold" style={{marginTop:30}}>Don't have an account? <Link to="/register"
                     className="link-primary">Register</Link></p>

                </form>
                </div>

            </div>
            
        </>
    );

}

export default AcademicSupervisorLogin;