import React from 'react'
import './App.css';
import Login from './Components/pages/login';
import StudentDashboard from './Components/pages/StudentsDashboard';
import ELogbook from './Components/pages/eLogbook';
import Report from './Components/pages/report';
import Register from './Components/pages/register';
import FieldSupervisorLogin from './Components/pages/fieldSupervisorLogin';
import FieldSupervisorDashboard from './Components/pages/fieldSupervisorDashboard';
import AcademicSupervisorLogin from './Components/pages/academicSupervisorLogin';
import AcademicSupervisorDashboard from './Components/pages/academicSupervisorDashboard';
import MapContainer from './Components/inc/map';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/pages/adminLogin';
import AdminDashboard from './Components/pages/adminDashboard';
import Immunify from './Components/temp-pages/immunify';
import Search from './Components/pages/search';


function App() {
  
  return (
    
     <BrowserRouter>
       <div>
         
          <Routes>

          <Route path="/" element={<Login/>} />
          <Route path="/StudentDashboard" element={<StudentDashboard/>} />
          <Route path="/ELogbook" element={<ELogbook/>}/>
          <Route path="/Report" element={<Report/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/FieldSupervisorLogin" element={<FieldSupervisorLogin/>}/>
          <Route path="/AcademicSupervisorLogin" element={<AcademicSupervisorLogin/>}/>
          <Route path="/FieldSupervisorDashboard" element={<FieldSupervisorDashboard/>}/>
          <Route path="AcademicSupervisorDashboard" element={<AcademicSupervisorDashboard/>}/>
          <Route path="AdminLogin" element={<AdminLogin/>}/>
          <Route path="maps" element={<MapContainer/>}/>
          <Route path="AdminDashboard" element={<AdminDashboard/>}/>
          <Route path="Immunify" element={<Immunify/>}/>
          <Route path="search" element={<Search/>}/>

          
          
          </Routes> 
         
        </div>
      </BrowserRouter>
     
    
  );
}

export default App;
