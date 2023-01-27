import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from '../inc/Navbar';
import Chart from '../inc/chart';

const ELogbook = () => {
    return(
        <>
            <div style={{backgroundColor:'#4e54c8', height: '100px'}}>
               <Navbar/>
               <h1 className='text-center text-white' style={{marginTop:'-20px'}}>E-Logbook</h1>
            </div>

            <div className='notificationbar'>
              <div style={{margin:'140px 0 0 30px'}}>
                <Chart/>
            </div>   
            </div>

            <div className="logInputs">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control type="text" placeholder="Description of work done" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Text area" rows={3}/>
                    </Form.Group>

                    <Button className="btn-purple-moon" type="submit">
                        Edit
                    </Button>

                    <Button className="btn-purple-moon" type="submit" style={{marginLeft:'30px'}}>
                        Submit
                    </Button>

                    
                </Form>
            </div>
        </>
    )
}

export default ELogbook;