import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from "react-router-dom";

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Map from './components/MyMap';
import AllObjects from './components/AllObjects';
import Statistics from './components/Statistics';

class App extends Component {
  render() {
    return (
     <Router>
       <div className="App">
         <Navbar/>
         <Route exact path="/" component={Landing} />
         <div>
           <Route exact path="/register" component={Register} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/profile" component={Profile} />
           <Route exact path="/allObject" component={AllObjects} />
           <Route exact path="/map" component={Map} />
           <Route exact path="/statistics" component={Statistics} />
         </div>
       </div>
     </Router>

    );
  }
}

export default App;
