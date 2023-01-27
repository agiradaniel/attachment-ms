import React from 'react'
import './App.css';
import Login from './Components/pages/login';
import StudentDashboard from './Components/pages/StudentsDashboard';
import ELogbook from './Components/pages/eLogbook';
import Report from './Components/pages/report';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    
     <BrowserRouter>
       <div>
         
          <Routes>

          <Route path="/" element={<Login/>} />
          <Route path="/StudentDashboard" element={<StudentDashboard/>} />
          <Route path="/ELogbook" element={<ELogbook/>}/>
          <Route path="/Report" element={<Report/>}/>
          
          
          </Routes> 
         
        </div>
      </BrowserRouter>
     
    
  );
}

export default App;
