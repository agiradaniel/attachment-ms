import React from 'react'
import Image from '../Images/login-img.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from '../inc/Navbar';

const Login = () => {
    return(
        <>
            
            <div className='loginArea mx-auto'>
                <div className='text-white text-center loginImg' style={{backgroundImage: `url(${Image})`}} ><h1 className='mainH1'>SIGN IN</h1></div>
                
                <div className='container myForm'>
                <form>

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
                    
                    <div className="mb-3" style={{marginTop:30}}>
                        <label for="exampleInputEmail1" className="form-label">Username</label>
                        <input type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                       
                    </div>
                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3 form-check" style={{marginTop:20}}>
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-purple-moon btn-rounded" style={{marginTop:20}}>Sign in</button>
                </form>
                </div>

            </div>
            <Navbar />
        </>
    );

}

export default Login;