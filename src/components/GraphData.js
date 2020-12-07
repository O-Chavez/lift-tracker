import React from 'react';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';

const GraphData = ({ currentPosts }) => {

    const lableData = [];
    const chartData = [];

  currentPosts.forEach((workout) => {
    const liftdate = dayjs(workout.liftDate).format('MMM DD, YYYY');
    lableData.push(liftdate)
    chartData.push(workout.liftWeight)
  });
        const data = {
          labels: lableData,
          datasets:[{
                        label: "Weight",
                        data: chartData,
                        borderColor: "black",
                        borderWidth: 2,
                        backgroundColor: "rgba(16, 77, 162, 0.56)",
                      }]
        }
        // console.log(currentPosts)

        if(currentPosts.length < 1){
          return (
           <div>No workouts found... yet... Add one and start tracking now!</div>
          ) 
        } else {
  
    return (
    <div className="chart-container">
    <Line 
      data={data}
      height={300}
      options={{
        scales: {
          xAxes: [{
            ticks: {
              // display: true,
              fontSize: 10,
              // lineHeight: 2
            }
          }],
          yAxes: [{
            ticks: {
              lineHeight: 1.2,
              fontSize: 12
            }
          }]
        },
        title:{
          display: true,
          text: "Lift Progress Over Time",
          fontSize: 25,
        },
        legend:{
          display:true,
          position:"bottom"
        },
        
        maintainAspectRatio: false
      }}
    ></Line>
    </div>
  )  
    }
}

export default GraphData

