import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LiftList from './liftPages/LiftList';
import LiftInput from './LiftInput';
import Header from './Header';
import SignIn from './SignIn'
import {UserContext} from '../UserContext';







const App = () => {

  const [signedIn, setSignedIn] = useState(null)
  const [userInfo, setUserInfo] =useState({})


  return (
    <div className="ui container">

      <BrowserRouter>
          <Header />
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/addlift" component={LiftInput} />
        </Switch>

      </BrowserRouter>
          </div>
  );
}

export default App;
