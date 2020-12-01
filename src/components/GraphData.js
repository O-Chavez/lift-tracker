import React from 'react';
import { Line } from 'react-chartjs-2';

function GraphData(props) {
  return (
    <div className="chart-container">
    <Line 
      data={props.chartData}
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
      }}
    ></Line>
    </div>
  )
}

export default GraphData

