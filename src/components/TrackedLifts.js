import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';



export default function TrackedLifts({currentPosts, postsPerPage, paginate, userLifts}) {

  if(userLifts.length < 1){
        return (
          <div className="jumbotron mx-0 pb-0">
            <div className="display-4 ml-3">Let's get started!</div>
            <hr></hr>
            <div className="container pb-5">
              It doesn't look like you have any tracked lifts yet... Add one now and start tracking progress!
            </div>
  
          </div>
        )
      } else {
  return (
    <div className="jumbotron mx-0 pb-0">
              <div className="display-4 ml-3">Tracked lifts</div>
              <hr></hr>
              <div>
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
  )
   }
}
