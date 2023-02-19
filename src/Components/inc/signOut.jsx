import React from 'react';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  
    const navigate = useNavigate();

    const signUserOut = async () => {
        await signOut(auth);
        navigate("/")
    }
  
  return (
    <div>
        <button onClick={signUserOut} className='btn btn-purple-moon btn-rounded' style={{position:"absolute",right: "0px", top:"0"}}>Log Out</button>
    </div>
  )
}

export default SignOut