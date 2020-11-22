import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

const Header = () => {
  const history = useHistory();

  const {userData, setUserData} = useContext(UserContext);

  const login = () => history.push('/login');
  
  const logOut = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut()
     setUserData({
      token: undefined,
      user: undefined,
    }); 
    
    
    localStorage.setItem("auth-token", "");
    history.push('/login')
  };


  return (
<div className="navbar navbar-dark bg-dark">
    <div className="container">
      <Link to="/" className="navbar-brand">
      Lift Tracker
      </Link>
      
      {
        userData.user ? 
        <button onClick={logOut} className="btn btn-primary">Sign Out</button> : <button onClick={login} className="btn btn-primary">Sign in</button>
      }
    </div>
  
  
</div>

  ) 
};

export default Header;