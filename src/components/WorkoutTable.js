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
              className="btn btn-outline-danger"
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
                <tr key={workout._id}>
                  <td>{liftdate}</td>
                  <td>{workout.liftWeight}</td>
                  <td>{workout.liftSets}</td>
                  <td>{workout.liftReps}</td>            
                  <td>
                    {workoutButton()}
                  </td>            
                </tr>
              );
    })
  }

    // if(workouts.length < 1){
    //   return (
    //    <div>No workouts found... yet... Add one and start tracking now!</div>
    //   ) 
    // } else {
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
    }
// }

export default WorkoutTable;
