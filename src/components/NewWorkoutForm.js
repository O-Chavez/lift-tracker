import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../api';


const NewWorkoutForm = ({ currentLift, userData, onOpen, onClose, confirmWorkoutAdded, optimisticWorkout}) => {

   // data for creating a new workout
   const [liftDate, setLiftDate] = useState("");
   const [liftSets, setLiftSets] = useState("");
   const [liftReps, setLiftReps] = useState("");
   const [liftWeight, setLiftWeight] = useState("");
   const [liftRPE, setLiftRPE] = useState("");

   const onSubmit = async (e) => {
    e.preventDefault(); 
    const optimisticData = {
      liftDate: liftDate,
      liftSets: liftSets,
      liftReps: liftReps,
      liftRPE: liftRPE,
      liftWeight: liftWeight
    }

     const data = {
      liftdate: liftDate,
      liftsets: liftSets,
      liftreps: liftReps,
      liftRPE: liftRPE,
      liftweight: liftWeight
     }
    
    const res = await axios({
      url: `/${currentLift._id}`,
      method: "post",
      headers: {"x-auth-token": userData.token},
      baseURL: `${url}/lifts/update/`,
      data: data
    })
    optimisticWorkout(optimisticData)
    onClose()
    console.log(res.data);
    confirmWorkoutAdded(res.status)
  }

  if(!onOpen){
    return null
  } else {
    return (
      <div className="card bg-light border-dark mt-2">
      <button onClick={onClose} className="close mt-3" aria-label="Close">
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
                    <span className="input-group-text">RPE</span>
                  </div>
                <input onChange={(e) => setLiftRPE(e.target.value)} className="form-control" type="number"></input>
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

export default NewWorkoutForm;