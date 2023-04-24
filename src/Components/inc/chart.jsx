import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"



const Charts = () => {

const [user] = useAuthState(auth);
const [stuList, setStuList] = useState([]);
const [progressIncrease, setProgressIncrease] = useState(null);
const [progressDecrease, setProgressDecrease] = useState(null);

      const students = collection(db, "user-details");
        //this code queries student details ie name number location
        useEffect(()=>{
        
        const data = query(students, where("creatorId", "==", user.uid));
        const unsuscribe =  onSnapshot(data, (snapshot) => {
            let stuList = []
            snapshot.docs.forEach((doc)=>{
               stuList.push({...doc.data(), id: doc.id})
            })
            setStuList(stuList);
            
            stuList.map((stu)=>{
              setProgressIncrease(stu.progress)
              setProgressDecrease(stu.progressNeg)
            })
           
      })
      console.log("Data from user details retrieved")
      return () => unsuscribe();
      
      },[])

      Chart.register(ArcElement);

      const data = {
        datasets: [
          {
            data: [progressIncrease, progressDecrease],
            backgroundColor: [
              "#4e54c8",
              "#99CCFF",
              
            ],
            display: true,
            borderColor: "#D1D6DC"
          }
        ]
      };

  return (
    <div  className='donut'>
      <Doughnut
       
        data={data}
        options={{
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: true,
          responsive: true
        }}
      />
      <div
        style={{
          margin:'-115px 0 0 120px'
        }}
      >
        <div>Progress</div>
      </div>
    </div>
  );
};

export default Charts;