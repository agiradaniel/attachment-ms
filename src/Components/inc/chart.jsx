import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const data = {
  datasets: [
    {
      data: [4, 6],
      backgroundColor: [
        "#4e54c8",
        "#99CCFF",
        
      ],
      display: true,
      borderColor: "#D1D6DC"
    }
  ]
};

const Charts = () => {
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