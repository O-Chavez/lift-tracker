import React from 'react';
import dayjs from 'dayjs';

const WorkoutTable = ({ currentPosts, openDeleteWorkoutModel, deleteableWorkout, deleteClicked }) => {

  const onWorkoutDelete = (workout) => {
    openDeleteWorkoutModel();
    deleteClicked()
    deleteableWorkout(workout);
  }

  const renderedWorkouts = (currentPosts) => {
    return currentPosts.map((workout, index) => {
      const workoutButton = () => {
        if(workout._id){
          return (
            <button 
              onClick={() => onWorkoutDelete(workout)} 
              className="btn btn-sm btn-outline-danger"
              >delete
            </button>
          )
        } else {
          return (
            <div class="spinner-border mx-3" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )
        }
      }
      const liftdate = dayjs(workout.liftDate).format('MMM D, YYYY');
      return(
                <tr key={workout._id} style={{borderTop: "1px solid #888888"}}>
                  <td className="text-center align-middle" style={{borderRight: "2px solid #888888"}}>{liftdate}</td>
                  <td className="text-center align-middle" style={{borderRight: "2px solid #888888"}}>{workout.liftWeight}</td>
                  <td className="text-center align-middle" style={{borderRight: "2px solid #888888"}}>{workout.liftSets}</td>
                  <td className="text-center align-middle" style={{borderRight: "2px solid #888888"}}>{workout.liftReps}</td>            
                  <td className="text-center align-middle" style={{borderRight: "2px solid #888888"}}>{workout.liftRPE}</td>            
                  <td className="text-center align-middle mx-0" style={{borderRight: "2px solid #888888"}}>{workout.liftVolume}</td>            
                  <td className="text-center align-middle">
                    {workoutButton()}
                  </td>            
                </tr>
              );
    })
  }
    if(currentPosts.length < 1){
      return null
    } else {
      return(
      <table className="table text-center table-sm table-borderless table-dark mb-2" style={{boxShadow:"2px 3px #666666", borderRadius: "5px"}}>
        <thead>
          <tr>
            <th style={{borderRight: "2px solid #888888"}} scope="col">Date</th>
            <th style={{borderRight: "2px solid #888888"}} scope="col">Weight</th>
            <th style={{borderRight: "2px solid #888888"}} scope="col">Sets</th>
            <th style={{borderRight: "2px solid #888888"}} scope="col">Reps</th>
            <th style={{borderRight: "2px solid #888888"}} scope="col">RPE</th>
            <th style={{borderRight: "2px solid #888888"}} scope="col">Total Volume</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
        {renderedWorkouts(currentPosts)}
        </tbody>
      </table>
      )
    }
}

export default WorkoutTable;
