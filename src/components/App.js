import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LiftList from './liftPages/LiftList';
import NewLift from './liftPages/NewLift';
import LiftDetails from './liftPages/LiftDetails';

import Header from './Header';
import UserContext from '../UserContext';
import GoogleAuth from './GoogleAuth';
import Axios from 'axios';

const App = () => {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
        if(token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
      const tokenResponse = await Axios.post('http://localhost:3001/users/tokenIsValid', null, { headers: {"x-auth-token": token } }
      );
        if (tokenResponse.data){
          const userResponse = Axios.get("http:localhost:3001/users/", {
            headers: {"x-auth-token": token}, 
        });
          setUserData({
            token,
            user: userResponse.data
          });
        }
    }

    checkLoggedIn();
  }, []);


  return (
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Header />
          <br></br>
          <Switch>
            <Route path="/" exact component={LiftList} />
            <Route path="/login" component={GoogleAuth} />
            
            <Route path="/newlift" component={NewLift} />
            
            <Route path="/lifts" component={LiftDetails} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
