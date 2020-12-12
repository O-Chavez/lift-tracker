import React from 'react';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';

const GraphData = ({ currentPosts, dataToGraph }) => {

    const lableData = [];
    const chartData = [];
    let backgroundColor= "";
    let lable = "";

  switch (dataToGraph) {
    case 'GraphWeight':
      
      currentPosts.forEach((workout) => {
        const liftdate = dayjs(workout.liftDate).format('MMM D, YY');
        lableData.push(liftdate);
        chartData.push(workout.liftWeight);
        backgroundColor = "rgba(16, 77, 162, 0.56)"
        lable = "Weight";
      });
      break;

    case 'GraphRPE' :
      currentPosts.forEach((workout) => {
        const liftdate = dayjs(workout.liftDate).format('MMM D, YY');
        lableData.push(liftdate);
        chartData.push(workout.liftRPE);
        backgroundColor = "rgba(221, 189, 74, 0.73)";
        lable = "RPE";
      });
      break;

    case 'GraphVolume' :
      currentPosts.forEach((workout) => {
        const liftdate = dayjs(workout.liftDate).format('MMM D, YY');
        lableData.push(liftdate);
        chartData.push(workout.liftVolume);
        backgroundColor = "rgba(186, 48, 50, 0.65)";
        lable = "Total Volume";
      });
      break;
    
      default:
        currentPosts.forEach((workout) => {
        const liftdate = dayjs(workout.liftDate).format('MMM D, YY');
        lableData.push(liftdate);
        chartData.push(workout.liftWeight);
        backgroundColor = "rgba(16, 77, 162, 0.56)";
        lable = "Weight";


  });
  }

  // currentPosts.forEach((workout) => {
  //   const liftdate = dayjs(workout.liftDate).format('MMM D, YY');
  //   lableData.push(liftdate)
  //   chartData.push(workout.liftWeight)
  // });
        const data = {
          labels: lableData,
          datasets:[{
                        label: lable,
                        data: chartData,
                        borderColor: "black",
                        borderWidth: 2,
                        backgroundColor: backgroundColor,
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
      height={350}
      options={{
        scales: {
          xAxes: [{
            ticks: {
              // display: true,
              fontSize: 12,
              // lineHeight: 2
            }
          }],
          yAxes: [{
            ticks: {
              // lineHeight: 1.2,
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

