import React from 'react';

export default function LiftDetails() {
  return (
    <div>
      Lift Details page

      <div className="input-group-prepend">
            <span className="input-group-text">Weight</span>
          </div>
          <input name="liftweight" type="number" className="form-control"></input>


          <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Sets</span>
          </div>
          <input name="lift" type="number"></input>

          <div className="input-group-prepend">
            <span className="input-group-text">Reps</span>
          </div>
          <input type="number"></input>
        </div>
    </div>

    


  )
}
