import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { useHistory } from 'react-router-dom';
import { url } from '../api';

const GoogleAuth = () => {
  const history = useHistory();
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
      await axios.post(`${url}/users/signin`, userInfo)
          .then(res => 
            setUserData({
            token: res.data.token,
            user: res.data.user,
          })
        )
          .catch(err => console.log(err))
          history.push('/')
    })
  }

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

  if(userData.token === undefined){
    return (
      <div>
        <div className="container h-100 mx-auto d-flex justify-content-center align-items-center">
          <div className="card text-center text-white bg-dark mx-auto">
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
