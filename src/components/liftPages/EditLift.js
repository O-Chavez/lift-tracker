import Axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {url} from '../../api';

import UserContext from '../../UserContext';

const EditLift = (props) => {
  const [liftDetails, setLiftDetails] = useState({});
  const [liftName, setLiftName] = useState("");
  const {userData} = useContext(UserContext);

  const history = useHistory();


  useEffect(() => {
    setLiftDetails(props.location.liftDetails) 
  }, [props])

  const onSubmit = (e) => {
    e.preventDefault();
    const config ={
      headers: {
        "x-auth-token": userData.token
      }
    }
    Axios.put(`${url}/lifts/edit/${liftDetails._id}`, {liftname: liftName}, config);
    history.push('/')
  }

  return (
    <div  className="container">
      <div className="card container">
      <div className="card-body">
        <h3>Edit Lift</h3>
        <form>
          <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Edit Lift Name</span>
              </div>
              <input placeholder={liftDetails.liftname}type="text" className="form-control" onChange={e => setLiftName(e.target.value)}></input>
          </div>
          <button 
          onClick={() => history.push('/')} 
          className="btn btn-secondary mr-2 ">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.5 8.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"/>
          </svg> Go Back
          </button>
          <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>Confirm Edit</button>
        </form> 
      </div>
        </div>
    </div>
  );
}

export default EditLift;
