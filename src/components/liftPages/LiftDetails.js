import React, {useState, useContext, useEffect} from 'react';
import { url } from '../../api/';

import GraphData from '../GraphData';
import WorkoutModal from '../WorkoutModal';
import LiftModal from '../LiftModal';
import Pagination from '../Pagination';
import NewWorkoutForm from '../NewWorkoutForm';
import WorkoutTable from '../WorkoutTable';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../UserContext';

export default function LiftDetails(props) {
  // info on the current lift
  const [currentLift, setCurrentLift] = useState({});
  // lift objects from mongo
  const [workouts, setWorkouts] = useState([]);
  // User context
  const {userData} = useContext(UserContext);
   // workout edit modal functions
   const [isWorkoutModalOpen, setisWorkoutModalOpen] = useState(false);
   const [deleteableWorkout, setDeleteableWorkout] = useState({});
  //  lift edit modal
  const [isLiftModelOpen, setisLiftModelOpen] = useState(false);
  // new lift form display 
   const [formOpen, setFormOpen] = useState(false);
  //  reRender on added workout
  const [workoutAdded, setWorkoutAdded] = useState(false);
    //  reRender on added removed
  const [workoutRemoved, setWorkoutRemoved] = useState(false);
     // Re-render uppon positive api response
  const [isRendered, setIsRendered] = useState("");

  const [dataToGraph, setDataToGraph] = useState("");

  const history = useHistory();

   // pagination
   const [currentPage, setCurrenetPage] = useState(1);
   const [postsPerPage, setPostsPerPage] = useState(5);
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
        url: `${url}/lifts/${liftId}`,
        headers: {"x-auth-token": userData.token}
      })
      setCurrentLift(retrievedLift.data)
    }
    getCurrentLift();
    // ------ get workouts -----
    const getWorkouts = async () => {
        const retrievedWorkouts = await axios({
            baseURL: `${url}/workouts/${props.location.liftId}`,
            headers: {"x-auth-token": userData.token}
          })
          if (retrievedWorkouts.status === 200){
            setIsRendered(true)
          }
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
          if(userData.token === undefined){
            history.push('/login')
          }
  }, [props.location.liftId, userData.token, workoutAdded])
  const onAddWorkoutClick = () => {
    setFormOpen(true);
    setWorkoutAdded(false);
  }
  const workoutModalClose = () => {
    setFormOpen(false)
  }
  const handleWorkoutAdded = (e) => {
    if(e === 200){
      setWorkoutAdded(true)
    }
  }
  const handleWorkoutRemoved = (e) => {
    let removeIndex = workouts.map(workoutToRemove => {return workoutToRemove._id}).indexOf(e._id)
    workouts.splice(removeIndex, 1)
    setWorkoutRemoved(true)
  }

  const selectData = () => {
    if (currentPosts.length > 1){
      return null;
    } else {
      return (
        <div className="ml-2" onChange={(e) => setDataToGraph(e.target.value)}>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="graphDataSelector" type="radio" value="GraphWeight" defaultChecked></input>
              <label className="form-check-label">Weight</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="graphDataSelector" type="radio" value="GraphRPE"></input>
              <label className="form-check-label">RPE</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="graphDataSelector" type="radio" value="GraphVolume"></input>
              <label className="form-check-label">Total Volume</label>
            </div>
          </div>
      )
      
    }
  }

  if (!isRendered){
    return (
      <div className="h-100 text-center d-flex flex-column justify-content-center my-auto align-self-center" >
       <h4 className="my-5" >Getting your workouts...</h4>
       <div className="h-100" >
        <div style={{width: "20em", height: "20em", }} className="spinner-grow text-center" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      </div>
    )
} else {
  return (
    <div>
      <div className="container mb-5"> 
      <WorkoutModal 
        open={isWorkoutModalOpen} 
        onClose={() => setisWorkoutModalOpen(false)} 
        workoutDetails={deleteableWorkout} 
        userData={userData} 
        currentLift={currentLift._id}
        optimisticWorkoutRemoved={(OW) => handleWorkoutRemoved(OW)}
      />
      <LiftModal 
        open={isLiftModelOpen}
        onClose={() => setisLiftModelOpen(false)}
        liftDetails={currentLift}
        userData={userData}
      />
      <div>
          <h3>{currentLift.liftname} - Lift Details </h3>
          <button 
            className="btn btn-primary float-right" 
            onClick={() => onAddWorkoutClick()} 
            >Add workout
          </button>
          <button 
            onClick={() => history.push('/')} 
            className="btn btn-secondary ml-2 ">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.5 8.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"/>
            </svg> Back
          </button>
          <button 
            onClick={() => setisLiftModelOpen(true)} 
            className="btn btn-dark mr-2 float-right">
            Edit Lift
            </button>
          <hr></hr>
      </div>
      <div>
        <NewWorkoutForm
          onOpen={formOpen}
          onClose={() => workoutModalClose()}
          currentLift={currentLift}
          userData={userData}
          confirmWorkoutAdded={(e) => handleWorkoutAdded(e)}
          optimisticWorkout={(OW) => workouts.unshift(OW)}
        />
      </div>
      <div className="jumbotron px-1 mb-0 pb-0">
        <h6 className="display-4 ml-4">Workouts</h6>
        <div className="float-right mt-4 mr-2">
          <nav>
            <ul className="pagination pagination-sm">
              <li className="page-item" aria-current="page">
                <button 
                className="page-link bg-dark text-white"
                onClick={() => setPostsPerPage(5)}>5</button>
              </li>
              <li className="page-item" aria-current="page">
                <button 
                className="page-link bg-dark text-white"
                onClick={() => setPostsPerPage(10)}>10</button>
              </li>
              <li className="page-item" aria-current="page">
                <button 
                className="page-link bg-dark text-white"
                onClick={() => setPostsPerPage(20)}>20</button>
              </li>
              <li className="page-item" aria-current="page">
                <button 
                className="page-link bg-dark text-white"
                onClick={() => setPostsPerPage(workouts.length)}>All</button>
              </li>
            </ul>
          </nav>
        </div>
        
        <hr></hr>
        <div className={`${!isRendered ? "collapsed" : ""}`}>
          <div className="panel panel-default">
            <WorkoutTable
              currentPosts={currentPosts}
              deleteableWorkout={setDeleteableWorkout}
              openDeleteWorkoutModel={() => setisWorkoutModalOpen(true)}
              deleteClicked={() => setWorkoutRemoved(false)}
            />
          </div>
          <Pagination
            postsPerPage={postsPerPage} 
            totalPosts={workouts.length} 
            paginate={paginate} 
          />

          <selectData />


          <div style={{display: "flex", flexDirection: "column"}}> 
            <GraphData
              currentPosts={currentPosts}
              dataToGraph={dataToGraph}
              update/>
          </div>
        </div>
      </div>
      </div>
    </div> 
  )     
  }  
}
