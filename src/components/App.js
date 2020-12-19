import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalStyle from '../theme/GlobalStyles';

import { url } from '../api';

import LiftList from './liftPages/LiftList';
import NewLift from './liftPages/NewLift';
import LiftDetails from './liftPages/LiftDetails';
import EditLift from './liftPages/EditLift';

import Header from './headerAndFooter/Header';
import Footer from './headerAndFooter/Footer';
import UserContext from '../UserContext';
import GoogleAuth from './GoogleAuth';
import Axios from 'axios';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const App = () => {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
        if(token !== null) {
          const tokenResponse = await Axios.post(`${url}/users/tokenIsValid`, null, { headers: {"x-auth-token": token } }
      );
        if (tokenResponse.data){
          const userResponse = Axios.get(`${url}/users/`, {
            headers: {"x-auth-token": token}, 
        });
          setUserData({
            token,
            user: userResponse.data
          });
        }
    } else { 
          localStorage.setItem("auth-token", "");
        token = "";} 
  }
  checkLoggedIn();

}, []);


  


  return (
    <div className="App">
    
              <BrowserRouter>
                <UserContext.Provider value={{userData, setUserData}}>
                  <Header />
                  <Route render={({location}) => (
                    <TransitionGroup className="MainContent">
                      <CSSTransition
                          key={location.key}
                          timeout={300}
                          classNames="fade"
                        >
                        <Switch location={location}>
                          <Route path="/" exact component={LiftList} />
                          <Route path="/login" component={GoogleAuth} />
                          <Route path="/newlift" component={NewLift} />
                          <Route path="/lifts" component={LiftDetails} />
                          <Route path="/editlift" component={EditLift} />
                        </Switch>
                      </CSSTransition>
                      
                      </TransitionGroup>
                  )} />

                  
                  <GlobalStyle />
                  
                  
                </UserContext.Provider>
              </BrowserRouter>
            <Footer />
    </div>
     
  );
}

export default App;
