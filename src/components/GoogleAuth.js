import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { signIn, signOut } from '../actions';

const GoogleAuth = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {

   window.gapi.load('client:auth2', () => {
     window.gapi.client.init({
      clientId: '474412942180-b8iarpuu3oqkpd81g2cbpbufer32ook3.apps.googleusercontent.com',
    scope: 'profile email'
     }).then(() => {
        // boolian is signed in
        const auth = window.gapi.auth2.getAuthInstance();

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

    auth.signIn().then(() => {
        // setAuthenticated(auth.isSignedIn.get());
    
        setUserId( auth.currentUser.get().getId());
    
        setUserName( auth.currentUser.get().getBasicProfile().getGivenName());
    })
  }

    
  const onSignOut = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut().then(() => {
    // setAuthenticated(  auth.isSignedIn.get()  )

    setUserId( auth.currentUser.get().getId())

    setUserName( auth.currentUser.get().getBasicProfile().getGivenName())
    });
  }

    console.log("username", userName)
    console.log("UserId", userId)
    console.log("authenticated", authenticated)


  if(authenticated === false){
    return (
      <div>
      <button onClick={onSignIn} className="btn btn-primary">Sign-in with Google</button>
    </div>
    )
  } else {
    return (
      <div>
      <button onClick={onSignOut} className="btn btn-primary">{`Welcome, ${userName}`}</button>
    </div>
    )
  }

}

export default GoogleAuth;
