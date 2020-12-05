import React, {useState} from 'react';
import axios from 'axios';
import { url } from '../api';

const LiftInput = () => {
  const [liftName, setLiftname] = useState('');
  const [liftReps, setLiftReps ] = useState([]);
  const [liftSets, setliftSets] = useState([]);
  const [liftWeight, setliftWeight] = useState([]);

  const addToLog = () => {
    axios.post(`${url}/insert`,{
      liftName: liftName,
      liftReps: liftReps,
      liftSets: liftSets,
      liftWeight: liftWeight
    });
  }

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="liftName">Enter Lift Name</label>
          <input onChange={(e) => {setLiftname(e.target.value)}} type="text" id="liftName" className="form-control"/>
        <label htmlFor="liftReps">Lift Reps</label>
          <input onChange={(e) => {setLiftReps(e.target.value)}} type="number" id="liftReps" className="form-control" />
        <label htmlFor="liftSets">Lift Sets</label>
          <input onChange={(e) => {setliftSets(e.target.value)}} type="number" id="liftSets" className="form-control" />
        <label  htmlFor="repWeight">Rep Weight</label>
         <input onChange={(e) => {setliftWeight(e.target.value)}} type="number" id="repWeight" className="form-control" />
        <button onClick={addToLog} className="btn btn-primary">Add Lift</button>
      </div>
    </div>
  );
}

export default LiftInput;
