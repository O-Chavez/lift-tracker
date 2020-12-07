import Axios from 'axios';
import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { url } from '../../api';

import UserContext from '../../UserContext';


const NewLift = () => {
  const {userData} = useContext(UserContext);
  const [liftname, setLiftName] = useState();
  const [liftdate, setLiftDate] = useState();

  const history = useHistory();

  const liftData = {
      liftdate: liftdate,
      liftname: liftname
    }


  const onSubmit = (e) => {
    e.preventDefault();
    const config ={
      headers: {
        "x-auth-token": userData.token
      }
    }
    Axios.post(`${url}/lifts/add`, liftData, config);
    history.push('/')
  }

  return (
    <div>
      <div  className="container h-100">
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
          <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>Create new Lift</button>
        </form> 
      </div>
    </div>
    
  );
}

export default NewLift;
