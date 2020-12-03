import React, {useState, useContext, useEffect} from 'react';
import GraphData from '../GraphData';
import Modal from '../Modal';
import Modal2 from '../Modal2';
import Pagination from '../Pagination';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

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
  // User context
  const {userData} = useContext(UserContext);
   // workout edit modal functions
   const [isOpen, setIsOpen] = useState(false);
   const [deleteableWorkout, setDeleteableWorkout] = useState({});
  //  lift edit modal
  const [isOpen1, setIsOpen1] = useState(false);
  // const [deleteableWorkout, setDeleteableWorkout] = useState({});
  // new lift form display 
   const [formOpen, setFormOpen] = useState(false);

   const history = useHistory();


   // pagination
   const [currentPage, setCurrenetPage] = useState(1);
   const [postsPerPage] = useState(5);
   const indexOfLastPosts = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPosts - postsPerPage;
   const currentPosts = workouts.slice(indexOfFirstPost, indexOfLastPosts);
      // change page
   const paginate = (pageNumber) => setCurrenetPage(pageNumber)



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
          // sort by date
          const sortedWorkouts = retrievedWorkouts.data.sort((a, b) => {
            if (a.liftDate < b.liftDate) {
              return 1
            } else {
              return -1
            }
          })
            setWorkouts(sortedWorkouts)
    };
          getWorkouts();
  }, [props.location.liftId, userData.token])

  useEffect(() => {
// --------------- graph data ---------
    const getGraphData = () => {
      const lableData = [];
      const chartData = [];

    currentPosts.forEach((workout) => {
      const liftdate = dayjs(workout.liftDate).format('MMM DD, YYYY');
      lableData.push(liftdate)
      chartData.push(workout.liftWeight)
    });
        if(lableData > []){
          setGraphData({
          labels: lableData,
          datasets:[{
            label: "Weight",
            data: chartData,
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: "rgba(16, 77, 162, 0.56)",

          }],
        })
        } else {
          return null
        }
          
        }
          getGraphData();
  }, [currentPage, workouts])

  if(userData.token === undefined){
    history.push('/login')
  }

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
  }

  const onWorkoutDelete = (workout) => {
    setDeleteableWorkout(workout);
    setIsOpen(true)
  }

  
  const renderedWorkouts = (currentPosts) => {

    return currentPosts.map((workout, index) => {
      
      const liftdate = dayjs(workout.liftDate).format('MMM D, YYYY');
      return(
                <tr key={workout._id}>
                  <td>{liftdate}</td>
                  <td>{workout.liftWeight}</td>
                  <td>{workout.liftSets}</td>
                  <td>{workout.liftReps}</td>            
                  <td>
                    <button 
                      onClick={() => onWorkoutDelete(workout)} 
                      className="btn btn-outline-danger"
                      >delete
                    </button>
                  </td>            
                </tr>
              );
    })
  }

  const workoutTable = () => {
    if(workouts.length < 1){
      return (
       <div>No workouts found... yet... Add one and start tracking now!</div>
      ) 
    } else {
      return(
      <table className="table table-sm table-dark mb-2">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Weight</th>
            <th scope="col">Sets</th>
            <th scope="col">Reps</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
        {renderedWorkouts(currentPosts)}
        </tbody>
      </table>
      )
    }}

    const newLiftFrom = () => {
      if(!formOpen){
      return null
    } else {
      return (
        <div className="card bg-light border-dark mt-2">
        <button onClick={() => setFormOpen(false)} className="close mt-3" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="card-body">
          
            <form className="container">
                <div className="input-group mb-3 ">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Date</span>
                  </div>
                  <input onChange={(e) => setLiftDate(e.target.value)} className="form-control" name="lift" type="date"></input>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Sets</span>
                  </div>
                  <input onChange={(e) => setLiftSets(e.target.value)} className="form-control" name="lift" type="number"></input>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Reps</span>
                    </div>
                  <input onChange={(e) => setLiftReps(e.target.value)} className="form-control" type="number"></input>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Weight</span>
                    </div>
                    <input onChange={(e) => setLiftWeight(e.target.value)} className="form-control" type="number"></input>
                  </div>
                  
                <button onClick={e => onSubmit(e)} className="btn btn-primary">+</button>
            </form>
          </div>
        </div>
      )
    }
    }
    

  if (!currentLift === {}){
    return (
      <div>Hmmm... There seems to be a problem getting your lift... Please try re-logging in!</div>
    )
} else {
  return (


    <div className="container">
    <Modal 
      open={isOpen} 
      onClose={() => setIsOpen(false)} 
      workoutDetails={deleteableWorkout} 
      userData={userData} 
      currentLift={currentLift._id}
    />
    <Modal2 
      open={isOpen1}
      onClose={() => setIsOpen1(false)}
      liftDetails={currentLift}
      userData={userData}
    />
    <div>


        <h3>{currentLift.liftname} - Lift Details </h3>
        <button 
          className="btn btn-primary" 
          onClick={() => setFormOpen(true)} 
          >Add workout
          </button>
        <button 
          onClick={() => setIsOpen1(true)} 
          className="btn btn-secondary ml-2">
          Edit Lift
          </button>
        <hr></hr>
    </div>
      <div>{newLiftFrom()}</div>
        
        <div className="jumbotron px-2 mx-0">
          <h6 className="display-4 mx-5">Workouts</h6>
          <hr></hr>
          
          <div>
            {workoutTable()}
          </div>
          <Pagination
           postsPerPage={postsPerPage} 
           totalPosts={workouts.length} 
           paginate={paginate} />
          <div> 
            <GraphData chartData={graphData} update/>
          </div>
        </div>
    </div> 
  )     
  }  
}
