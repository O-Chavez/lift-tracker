import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../UserContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import axios from 'axios';
import { url } from '../../api';

export default function LiftList() {
  const {userData} = useContext(UserContext);
  const [userLifts, setUserLifts] = useState([]);
   // is rendered
   const [isRendered, setIsRendered] = useState(false)

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

  const history = useHistory();

  // pagination
  const [currentPage, setCurrenetPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPosts - postsPerPage;
  const currentPosts = userLifts.slice(indexOfFirstPost, indexOfLastPosts);
        // change page
  const paginate = (pageNumber) => setCurrenetPage(pageNumber)

  // console.log("currentPosts",currentPosts)
  
  if (!isRendered){
    return (
      <div className="h-100 w-100 justify-content-center align-items-center" style={{display:"flex"}}>
        <div style={{width: "25em", height: "25em", }} className="spinner-grow text-center" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
}
    
   
    else {
    // add the lift's id to the 'to' link, 
    return (
      <div className="">
        <div className="container">
          <h2>Lets get a good lift in!</h2>
            <Link to="/newLift" className="btn btn-primary btn-med">Add new Lift</Link>
            <hr></hr>
            <div className="jumbotron mx-0 pb-0">
              <div className="display-4 ml-3">Tracked lifts</div>
              <hr></hr>
              <div className={`${!isRendered ? "collapsed" : ""}`}>
                <div className={`list-group container`}>
                  {currentPosts.map(lift =>
                    <Link 
                    to={{ pathname:'/lifts', liftId: lift._id }} 
                    key={lift._id} 
                    className="list-group-item bg-dark text-white list-group-item-action list-group-item-dark mt-2"
                    style={{borderRadius: "5px", boxShadow:"2px 3px #888888"}}
                    >
                    {lift.liftname}
                    </Link>)}
                  <Pagination
                  postsPerPage={postsPerPage} 
                  totalPosts={userLifts.length} 
                  paginate={paginate} />
                </div>
              </div>
            </div>
        </div>
        
      </div>
    )

  }

}
