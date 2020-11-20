import React from 'react';

const SignIn = () => {




  return (
    <div className="container">
      <h2>Sign in</h2>
      <form>
        <div className="form-group">
          <label htmlFor="userNameInput">User Name</label>
          <input id="userNameInput" type="email" className="form-control"></input>
        </div>
        <div className="form-group">
          <label htmlFor="passworkInput">Password</label>
          <input type="password" className="form-control" id="passworkInput"></input>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
      <button className="btn btn-secondary float-right">Sign up!</button>

    
    </div>
  );
}

export default SignIn;
