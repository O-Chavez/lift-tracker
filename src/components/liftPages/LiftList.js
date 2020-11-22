import React, {useContext} from 'react';
import UserContext from '../../UserContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function LiftList() {

  
  const {userData} = useContext(UserContext);
  const history = useHistory();

  if(userData.token === undefined){
    history.push('/login')
  }
  
  console.log("liftList", userData)

  return (
    <div className="container">
      <h2>Lets get a good lift in!</h2>
      <Link to="/newLift" className="btn btn-primary btn-lg">Add new Lift</Link>
      <hr></hr>
      <div className="list-group">
        <Link className="list-group-item list-group-item-action">Item 1</Link>
        <Link className="list-group-item list-group-item-action">Item 1</Link>
      </div>
    </div>
    
  )
}
