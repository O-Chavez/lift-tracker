import React from 'react';
import { Line } from 'react-chartjs-2';

function GraphData(props) {


  console.log(props.chartData)

  if(!props.chartData){
    return null
  } else {
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
          display:false,
          position:"right"
        }
      }}
    ></Line>
    </div>
  )
  }
  
}

export default GraphData

