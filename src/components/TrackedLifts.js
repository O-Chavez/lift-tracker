import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

export default function TrackedLifts({userLifts}) {
  const [filteredLifts, setFilteredLifts] = useState(userLifts);
   // pagination
   const [currentPage, setCurrenetPage] = useState(1);
   const [postsPerPage] = useState(5);
       // change page
       
   const paginate = (pageNumber) => setCurrenetPage(pageNumber);
   const indexOfLastPosts = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPosts - postsPerPage;
   const currentPosts = filteredLifts.slice(indexOfFirstPost, indexOfLastPosts);

  useEffect(() => {
    // setRenderedLifts(currentPosts)
    setFilteredLifts(userLifts)
  }, [userLifts])

  const searchLifts = (e) => {
    const results = userLifts.filter((lift) => {
          return lift.liftname.toLowerCase().indexOf(e.toLowerCase()) !== -1;
        })
        if(results === []){
        } else {
          setFilteredLifts(results);
        }
  }

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
              <div className="display-4 container">
              Tracked lifts
                <div style={{minWidth: "3em", maxWidth: "5em"}} className="input-group mt-4 float-right">
                  <span className="input-group-text" id="SearchLifts">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    </svg>
                  </span>
                  <input type="text" className="form-control" placeholder="Search Lifts" aria-label="Search Lifts" aria-describedby="Search Lifts" onChange={e => searchLifts(e.target.value)} />
                </div>
              </div>
              
              <hr />
              
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
                    totalPosts={filteredLifts.length} 
                    paginate={paginate} 
                    />
                </div>
              </div>
            </div>
  )
   }
}
