import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { url } from '../api';
import dayjs from 'dayjs'

const WorkoutModal = ({ open, onClose, workoutDetails, userData, currentLift, optimisticWorkoutRemoved }) => {
  
  const MODAL_STYLE = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1234,
    position: "fixed"
  }
  const BG_STYLE = {
    position: "fixed", /* Stay in place */
    zIndex: 60, /* Sit on top */
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%", /* Full width */
    height: "100%",/* Full height */
    backgroundColor: "rgba(0, 0, 0, 0.6)" /* Black w/ opacity */
  }

  const deleteWorkout = async () => {
     await axios({
      url: `${url}/workouts/delete/${workoutDetails._id}`,
      headers: {"x-auth-token": userData.token},
      method: "delete",
      data: {
        liftId: currentLift
      }
    })
      onClose()
      optimisticWorkoutRemoved(workoutDetails)
  }

  const liftdate = dayjs(workoutDetails.liftDate).format('MMM D, YYYY');
  
  if(!open){
    return null
  } else {
    return ReactDOM.createPortal(
  <div style={BG_STYLE}>
    <div style={MODAL_STYLE} className="card" tabIndex="-1">
      <div className="card-header">
        Delete Workout
        <button onClick={onClose} className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="card-body">
        
        <h5 className="card-title">Are you sure you want to delete this Workout?</h5>
        <hr></hr>
        <div>
          <h6>Lift Date: {liftdate}</h6>
          <h6>Lift Weight: {workoutDetails.liftWeight}</h6>
        </div>
        <hr></hr>
        <button onClick={onClose} type="button" className="mr-2 btn btn-secondary">Cancel</button>
        <button onClick={deleteWorkout} className="btn btn-danger">Delete Workout</button>
      </div>
    </div>
  </div>
  , 
    document.querySelector('#modal')
  );
  }
};

export default WorkoutModal;
