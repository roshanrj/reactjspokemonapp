import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
//Pages
import Pokemon from './pokemon';

class App extends Component{


  render(){
      return (
            <Router>
                <Switch>
                    <Route path="/" component = { Pokemon }/>
                </Switch>
            </Router>
      );
  }
}
export default App;