import Axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

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
    Axios.put(`http://localhost:3001/lifts/edit/${liftDetails._id}`, {liftname: liftName}, config);
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

          <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>Confirm Edit</button>
        </form> 
      </div>
        </div>
    </div>
  );
}

export default EditLift;
