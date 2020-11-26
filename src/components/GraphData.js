import React from 'react';
import { Line } from 'react-chartjs-2';

function GraphData(props) {
  return (
    <div className="chart">
    <Line 
      data={props.chartData}
      // width={100}
      // height={50}
      options={{
        
        title:{
          display: true,
          text: "Lift Progress Over Time",
          fontSize: 25,
        },
        legend:{
          display:true,
          position:"right"
        }
        // maintainAspectRatio: false
      }}
    ></Line>
    </div>
  )
}

export default GraphData

