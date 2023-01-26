import React from 'react'
import './App.css';
import Login from './Components/pages/login';
import StudentDashboard from './Components/pages/StudentsDashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    
     <BrowserRouter>
       <div>
         
          <Routes>

          <Route path="/" element={<Login/>} />
          <Route path="/StudentDashboard" element={<StudentDashboard/>} />
          
          
          </Routes> 
         
        </div>
      </BrowserRouter>
     
    
  );
}

export default App;
