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
  
    return (
    <div className="chart-container">
    <Line 
      data={data}
      options={{
        title:{
          display: true,
          text: "Lift Progress Over Time",
          fontSize: 25,
        },
        legend:{
          display:true,
          position:"bottom"
        }
      }}
    ></Line>
    </div>
  )  
}

export default GraphData

