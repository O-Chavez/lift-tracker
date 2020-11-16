import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
<div className="navbar navbar-dark bg-dark">

  <Link to="/" className="navbar-brand">
    Lift Tracker
  </Link>

  <GoogleAuth />
  
</div>

  ) 
};

export default Header;