import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { signIn, signOut } from '../actions';

const GoogleAuth = () => {

  const [authenticated, setAuthenticated] = useState(false);

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [user, setUser] = useState({})

  useEffect(() => {
   window.gapi.load('client:auth2', () => {
     window.gapi.client.init({
      clientId: '474412942180-b8iarpuu3oqkpd81g2cbpbufer32ook3.apps.googleusercontent.com',
    scope: 'profile email'
     }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        // boolian is signed in
        auth.isSignedIn.listen(changeSignInState)
        setAuthenticated(  auth.isSignedIn.get()  )
     })
   });

  },[]);

  const changeSignInState = (signInState) => {
    setAuthenticated(signInState)
  };

  const onSignIn = () => {
    const auth = window.gapi.auth2.getAuthInstance();

    auth.signIn()
    .then(async () => {  
      const username = await auth.currentUser.get().getBasicProfile().getEmail()

      const password = await auth.currentUser.get().getId()
      
      const userInfo = {
        username: username,
        password: password
      }
        axios.get('http://localhost:3001/users')
          .then(res => console.log(res.data))
            // catch if any data points on the server equal the current user info, if so authenticate
            

            //if not, create an account and sign them in


        //  axios.post('http://localhost:3001/users/add', userInfo)
        //   .then(res => console.log(res.data))
    })
    
    
  }


  const onSignOut = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut().then(() => {

    setUserId( auth.currentUser.get().getId())

    setUserName( auth.currentUser.get().getBasicProfile().getGivenName())
    });
  }

  if(authenticated === false){
    return (
      <div className="container">
        <div className="card" style={{width: 30 +'em'}}>
            <div className="card-body">
              <h5 className="card-title">Sign In</h5>
              <p className="card-text">Welcome to LiftTracker! Sign in to start tracking your lifts!</p>
              <button onClick={onSignIn} className="btn btn-primary">Sign-in with Google</button>
            </div>
        </div>
    </div>

    )
  } else {
    return (
      <div>
      <button onClick={onSignOut} className="btn btn-primary">{`Sign Out`}</button>
    </div>
    )
  }

}

export default GoogleAuth;
