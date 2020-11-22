import React, {useState, useContext} from 'react';

// import { useForm } from "react-hook-form";

import UserContext from '../../UserContext';


const NewLift = () => {
  // const {userData} = useContext(UserContext);

  // const { LiftInfo, handleSubmit } = useForm();

  const onSubmit = () => console.log(liftData);

  const [LiftName, setLiftName] = useState();
  const [LiftDate, setLiftDate] = useState();
  

  const liftData = {
    date: LiftDate,
    name: LiftName
  }

  // var todayLocal = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
  

  return (
    <div  className="container">
    <h3>Add new lift...</h3>
      <form>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Lift Name</span>
            </div>
            <input placeholder="Bench..." type="text" className="form-control" onChange={e => setLiftName(e.target.value)}></input>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Date</span>
          </div>
          <input type="date" onChange={e => setLiftDate(e.target.value)} />
        </div>

        <button className="btn btn-primary" onClick={onSubmit}>Create new Lift</button>
      </form> 
    </div>
  );
}

export default NewLift;
