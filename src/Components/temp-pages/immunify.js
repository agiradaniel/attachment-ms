import React from 'react'
import { Button } from 'react-bootstrap'

const Immunify = () => {
  return (
    <div style={{backgroundColor: "#8245D0", width:"1430px", height:"800px", margin: "auto"}}>
        <div style={{color:"white",padding:"200px 0 0 300px"}}>
            <h2 style={{fontWeight:"bold"}}>Find an <br/> Immunization <br/> centre near you</h2>
            <p style={{width:"30%", margin:"20px 0 20px"}}>Immunify seeks to help mothers locate the closest vaccination centre and also notify them of what vaccine their children need to take to reduce child mortality rate</p>
            <Button style={{backgroundColor:"#A554F2", border:"none"}}>Contact us</Button>
        </div>
        <div style={{margin:"90px 0 0 300px", backgroundColor:"#9E72CA", width:"600px", height: "180px", borderRadius:"15px", color:"white"}}>
            <h2 style={{fontWeight:"bold", padding:"10px"}}>Find an Immunization centre near you</h2>
        </div>

    </div>
  )
}

export default Immunify