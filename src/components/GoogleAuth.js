import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { useHistory } from 'react-router-dom';


const GoogleAuth = () => {
  const history = useHistory();

  const {userData, setUserData} = useContext(UserContext);


  useEffect(() => {
   window.gapi.load('client:auth2', () => {
     window.gapi.client.init({
      clientId: '474412942180-b8iarpuu3oqkpd81g2cbpbufer32ook3.apps.googleusercontent.com',
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
      await axios.post('http://localhost:3001/users/signin', userInfo)
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
      <div className="container">
        <div className="card" style={{width: 30 +'em'}}>
            <div className="card-body">
              <h5 className="card-title">Welcome to LiftTracker!</h5>
              <p className="card-text">Sign in to start tracking your lifts!</p>
              <button onClick={onSignIn} className="btn btn-primary">Sign-in or create an account with Google</button>
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
