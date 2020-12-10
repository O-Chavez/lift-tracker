import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { useHistory } from 'react-router-dom';
import { url } from '../api';

const GoogleAuth = () => {
  const history = useHistory();
  const [signInClicked, setSignInClicked] = useState(false);
  const [signedin, setSignedIn] = useState(false);

  const {userData, setUserData} = useContext(UserContext);
  

  useEffect(() => {
   window.gapi.load('client:auth2', () => {
     window.gapi.client.init({
      clientId: '1077904608925-4tg6bgj0o85bntc1i68kt6crvpqgqa7v.apps.googleusercontent.com',
    scope: 'profile email'
     })
   });
  },[]);

  const onSignIn = async () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn()
    .then(async () => {      
      const userInfo = {
        username: await auth.currentUser.get().getBasicProfile().getEmail(),
        password: await auth.currentUser.get().getId()
      }
      setSignInClicked(true)
      
      const userLogin = await axios.post(`${url}/users/signin`, userInfo)
      setUserData({
        token:userLogin.data.token,
        user: userLogin.data.user})
        //   .then(res => 
        //     setUserData({
        //     token: res.data.token,
        //     user: res.data.user,
        //   })
        // )
          
          // .catch(err => console.log(err))
          if(userLogin.status === 200){

            setSignedIn(true);
          }
          history.push('/')
    })
  }

  console.log(signInClicked)

  const onSignOut = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut().then(() => {
      setUserData({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("auth-token", "");
    });
    history.push('/login');
  }



    if (signInClicked){
    return (
      <div className="h-100 text-center d-flex flex-column justify-content-center my-auto align-self-center">
      {!signedin ? 
        <h4 className="mb-4">Loading...</h4> 
        : <h4 className="mb-4">Welcome!</h4>}
        <div className="h-100 w-100 justify-content-center align-items-center" >
          <div style={{width: "20em", height: "20em", }} className="spinner-grow text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      
    )
} else if (userData.token === undefined) {

  
    return (
      <div>
        <div className="container h-100 mt-5 d-flex justify-content-center align-items-center">
          <div className="mt-5 card text-center text-white bg-dark mx-auto">
              <div 
              className="card-body h-100 d-flex justify-content-center align-items-center"
              style={{flexDirection: "column"}}>
                <h1 className="card-title">Welcome to LiftTracker!</h1>
                <h5>Create workouts and track your progress over time.</h5>
                <p 
                  className="card-text">Sign in to start tracking your lifts!</p>
                <button 
                  onClick={onSignIn} 
                  className="btn btn-primary"
                  style={{height:"4em"}}>Sign-in or create an account with Google</button>
              </div>
          </div>
      </div>
      </div>
      
    )
} else {
    return (
      <div>
        <button onClick={onSignOut} className="btn btn-primary">{`Welcome `}</button>
      </div>
    )
  }
}

export default GoogleAuth;
