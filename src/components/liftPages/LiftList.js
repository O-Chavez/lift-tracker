import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../UserContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TrackedLifts from '../TrackedLifts';
import axios from 'axios';
import { url } from '../../api';

export default function LiftList() {
  const {userData} = useContext(UserContext);
  const [userLifts, setUserLifts] = useState([]);
   // Re-render uppon positive api response
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const config ={
      headers: {
        "x-auth-token": userData.token
      }
    }
    const getLifts = async () => {
      const retrievedLifts = await axios.get(`${url}/lifts`, config)
      if(retrievedLifts.status === 200){
        setIsRendered(true)
      }
      setUserLifts(retrievedLifts.data)
    }
    getLifts()

    if(userData.token === undefined){
      history.push('/login')
    }
  },[userData])

  if (!isRendered){
    return (
      <div className="h-100 w-100 justify-content-center align-items-center" style={{display:"flex"}}>
        <div style={{width: "25em", height: "25em", }} className="spinner-grow text-center" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
} else {
    return (
      <div className="">
        <div className="container">
          <h2>Lets get a good lift in!</h2>
            <Link to="/newLift" className="btn btn-primary btn-med">Add new Lift</Link>
            <hr></hr>
            <TrackedLifts 
              
              userLifts={userLifts}
                />
        </div>
      </div>
    )
  }
}
