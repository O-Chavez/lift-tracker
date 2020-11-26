import React, {useState, useContext, useEffect} from 'react';
import GraphData from '../GraphData';
import axios from 'axios';

import UserContext from '../../UserContext';


export default function LiftDetails(props) {

  // data for creating a new workout
  const [liftDate, setLiftDate] = useState("");
  const [liftSets, setLiftSets] = useState("");
  const [liftReps, setLiftReps] = useState("");
  const [liftWeight, setLiftWeight] = useState("");

// info on the current lift
  const [currentLift, setCurrentLift] = useState({});

  // lift objects from mongo
  const [workouts, setWorkouts] = useState([]);

  // graph state
  const [graphData, setGraphData] = useState();

  // refresh state
  const [rendered, setRendered] = useState(false);

  const {userData} = useContext(UserContext);


  useEffect(() => {
// get info on currently selected lift    
    const getCurrentLift = async () => {
      const liftId = props.location.liftId
      const retrievedLift = await axios({
        url: `http://localhost:3001/lifts/${liftId}`,
        headers: {"x-auth-token": userData.token}
      })
      setCurrentLift(retrievedLift.data)
    }
    getCurrentLift();
    // ------ get workouts -----
    const getWorkouts = async () => {
      const retrievedWorkouts = await axios({
            baseURL: `http://localhost:3001/workouts/${props.location.liftId}`,
            headers: {"x-auth-token": userData.token}
          })
          setWorkouts(retrievedWorkouts.data)
    }
          getWorkouts();



  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // console.log('list side', graphData)

  useEffect(() => {
// --------------- graph data ---------
      const getGraphData = () => {
        const lableData = [];
        const chartData = [];

      workouts.forEach((workout) => {
        lableData.push(workout.liftDate)
        chartData.push(workout.liftWeight)
      });
            
            setGraphData({
            labels: lableData,
            datasets:[{
              label: "Weight",
              data: chartData
            }],
          }
          )
          }

          getGraphData();
  }, [workouts])

  // console.log(graphData)
      
      

  const onSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `/${currentLift._id}`,
      method: "post",
      headers: {"x-auth-token": userData.token},
      baseURL: "http://localhost:3001/lifts/update/",
      data: {
        liftdate: liftDate,
        liftsets: liftSets,
        liftreps: liftReps,
        liftweight: liftWeight
      }
    })
    setRendered(!rendered);
    
  }

  const renderedWorkouts = (workout, index) => {
        return(
          <tr key={index}>
            <td>{workout.liftDate}</td>
            <td>{workout.liftWeight}</td>
            <td>{workout.liftSets}</td>
            <td>{workout.liftReps}</td>
          </tr>
        )
      }

  const workoutTable = () => {
    if(workouts.length < 1){
      return (
       <div>No workouts found... Add one now!</div>
      ) 
    } else {
      return(
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Weight</th>
            <th scope="col">Sets</th>
            <th scope="col">Reps</th>
          </tr>
        </thead>
        <tbody>
        {workouts.map(workout => renderedWorkouts(workout))}
        </tbody>
      </table>
      )
    }
  }

  if (currentLift === {}){
    return (
      <div>Hmmm... There seems to be a problem getting your lift... Please try re-logging in!</div>
    )
} else {
  return (
    <div className="container">
      <h3>{currentLift.liftname} - Lift Details </h3>

        <form>
            <div className="input-group mb-3 container">
              <div className="input-group-prepend">
                <span className="input-group-text">Date</span>
              </div>
              <input onChange={(e) => setLiftDate(e.target.value)} name="lift" type="date"></input>
              <div className="input-group-prepend">
                <span className="input-group-text">Sets</span>
              </div>
              <input onChange={(e) => setLiftSets(e.target.value)} name="lift" type="number"></input>

              <div className="input-group-prepend">
                <span className="input-group-text">Reps</span>
              </div>
              <input onChange={(e) => setLiftReps(e.target.value)} type="number"></input>
              <div className="input-group-prepend">
                <span className="input-group-text">Weight</span>
              </div>
              <input onChange={(e) => setLiftWeight(e.target.value)} type="number"></input>
          </div>
          <div className="container">
            <button onClick={e => onSubmit(e)} className="btn btn-primary">Add new Workout</button>
          </div>
        </form>

        

        <div className="jumbotron m-3">
          <h6 className="display-4">Workouts</h6>
          <hr></hr>

          <div>
            {workoutTable()}
          </div>
          <div> 
            <GraphData chartData={graphData} update/>
          </div>
        </div>
    </div> 
  )     
  }  
}
