import React, { Component } from 'react';
import './App.css';
import Login from './login'
import Home from './home'
import Register from './register'
import Loadgame from './load_game';
import{
 BrowserRouter as Router, Link,Route,Redirect
} from "react-router-dom";


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }}
        render(){
         return(

         <Router>
           <div>  
  <Route exact path='/' component={Home}/>
  <Route exact path='/secret' component={Loadgame}/>
  <Route exact path='/login' component={Login}/>
  <Route exact path='/register' component={Register}/>  
           </div>
         </Router>
    );
  }
}
export default App;

