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
   const [optimisticWorkoutToDelete, setOptimisticWrokoutToDelete] = useState({});
  //  lift edit modal
  const [isLiftModelOpen, setisLiftModelOpen] = useState(false);
  // new lift form display 
   const [formOpen, setFormOpen] = useState(false);
  //  reRender on added workout
  const [workoutAdded, setWorkoutAdded] = useState(false);
  const [workoutRemoved, setWorkoutRemoved] = useState(false)

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
    console.log(e);


    let removeIndex = workouts.map(workoutToRemove => {return workoutToRemove._id}).indexOf(e._id)

    workouts.splice(removeIndex, 1)
    setWorkoutRemoved(true)

  }

  if(userData.token === undefined){
    history.push('/login')
  }

  console.log("workout", workouts)

  if (!currentLift === {}){
    return (
      <div>Hmmm... There seems to be a problem getting your lift... Please try re-logging in!</div>
    )
} else {
  return (
    <div className="container">
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
            className="btn btn-primary" 
            onClick={() => onAddWorkoutClick()} 
            >Add workout
            </button>
          <button 
            onClick={() => setisLiftModelOpen(true)} 
            className="btn btn-secondary ml-2">
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
      <div className="jumbotron px-2 mx-0">
        <h6 className="display-4 mx-5">Workouts</h6>
        <hr></hr>
        <div>
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
        <div style={{display: "flex", flexDirection: "column"}}> 
          <GraphData
            currentPosts={currentPosts}
            update/>
        </div>
      </div>
    </div> 
  )     
  }  
}
