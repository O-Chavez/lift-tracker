import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const Modal = ({ open, onClose, liftDetails, userData}) => {
  
  const history = useHistory();

  const MODAL_STYLE = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1234,
    position: "fixed"
  }
  const BG_STYLE = {
    position: "fixed", /* Stay in place */
    zIndex: 60, /* Sit on top */
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%", /* Full width */
    height: "100%",/* Full height */
    backgroundColor: "rgba(0, 0, 0, 0.6)" /* Black w/ opacity */
  }

  const deleteWorkout = () => {
     axios({
      url: `http://localhost:3001/lifts/delete/${liftDetails._id}`,
      headers: {"x-auth-token": userData.token},
      method: "delete"
    })
    history.push('/')
  }

  if(!open){
    return null
  } else {
    return ReactDOM.createPortal(
  <div style={BG_STYLE}>
    <div style={MODAL_STYLE} className="card" tabIndex="-1">
      <div className="card-header">
        Edit Lift
        <button onClick={onClose} className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="card-body">
        
        <h5 className="card-title">Do you want to Edit or Delete this Lift?</h5>
        <hr></hr>

        <div className="container">
          <button 
            onClick={deleteWorkout} 
            className="btn btn-danger"
            >Delete Lift
          </button>
          <Link 
            to={{ pathname:'/editlift', liftDetails: liftDetails}}
            type="button" 
            className="ml-3
            btn btn-secondary">
            Edit Lift Page
          </Link> 
        </div>


        <hr></hr>
        <button onClick={onClose} type="button" className="mr-2 btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
  , 
    document.querySelector('#modal')
  );
  }

  
};



export default Modal;
