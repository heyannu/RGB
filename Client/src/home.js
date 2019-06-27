import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Link, Redirect
} from "react-router-dom";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
}
render(){
return(
<div>
<h1>home</h1>
 <Link to="/signup">Signup</Link><br/>
 <Link t="/Login">Login</Link>
</div>
)}
}
