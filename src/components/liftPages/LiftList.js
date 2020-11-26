import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../UserContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LiftList() {
  const {userData} = useContext(UserContext);

  const [userLifts, setUserLifts] = useState([]);

  useEffect(() => {
    const config ={
      headers: {
        "x-auth-token": userData.token
      }
    }

    const getLifts = async () => {
      const retrievedLifts = await axios.get('http://localhost:3001/lifts', config)

      setUserLifts(retrievedLifts.data)
    }

    getLifts()
    
  },[])

  // console.log(userLifts)




  const history = useHistory();

  if(userData.token === undefined){
    history.push('/login')
  }
  
  // console.log("liftList", userData)
  if(userData.token === undefined){
    history.push('/login')
  }
  
  // console.log("liftList", userData)

  if(!userLifts){
    return (
      <div>
        <h2>Lets get a good lift in!</h2>
        <Link to="/newLift" className="btn btn-primary btn-lg">Add new Lift</Link>
        <hr></hr>
        <div>no user lifts...</div>
      </div>
    )
  } else {
    // add the lift's id to the 'to' link, 
    return (
      <div className="container">
      <h2>Lets get a good lift in!</h2>
        <Link to="/newLift" className="btn btn-primary btn-lg">Add new Lift</Link>
        <hr></hr>
        <h5>Tracked lifts</h5>
        <div className="list-group container">
          {userLifts.map(lift => <Link to={{ pathname:'/lifts', liftId: lift._id }} className="list-group-item list-group-item-action list-group-item-dark">{lift.liftname}</Link>)}
        </div>
      </div>
    )
  }
}
