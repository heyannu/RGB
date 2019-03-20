import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Link, Redirect
} from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import './assets/css/login.css';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: '',
      user:'',
      redirect:'',
      disp: 'block',
      disp1: 'none',
      showPassword: false
    }
  }
  componentDidMount() {
    this.setState({
      username:''
    })
  }

  submit(){
    fetch('http://localhost:8080/login',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
          redirect:responseJson.redirect,
          highscore:responseJson.highscore,
          user:responseJson.user
      })
    })
    .catch((error) => {
      console.error(error);
    }); 
    console.log(this.state.user)
  }

  showpassword(event) {
    this.setState({
      showPassword: !this.state.showPassword,
      disp: 'block',
      disp1: 'none'
    });
    console.log(this.state.showPassword)
  }
  hidepassword(event) {
    this.setState({
      showPassword: !this.state.showPassword,
      disp1: 'block',
      disp: 'none'
    });
    console.log(this.state.showPassword)
  }
  username(event) {
    this.setState({
      username: event.target.value
    })
    console.log(this.state.username)
  }
  password(event) {
    this.setState({
      password: event.target.value
    })
    console.log(this.state.password)
  }
  render() {
    if(this.state.redirect==true)
    {
     return <Redirect to ={{
        pathname:'/secret',
        state:{ 
          username:this.state.username,
          highscore:this.state.highscore,
          user:this.state.user

        }
      }} />
    }
    return (
      <div style={{ backgroundColor: 'white' }}>
        {/* <FormControl> */}
          <TextField
            value={this.state.username}
            onChange={this.username.bind(this)}
            placeholder="Username"
          >
          </TextField>
          <Input
            placeholder="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.password.bind(this)}
            endAdornment={
              <InputAdornment position="end">
                <i class="fa fa-eye" onClick={this.showpassword.bind(this)} style={{ display: this.state.disp1 }}></i>
                <i class="fa fa-eye-slash" onClick={this.hidepassword.bind(this)} style={{ display: this.state.disp }}></i>
              </InputAdornment>
            }
          >
          </Input>
        {/* </FormControl> */}
        <button onClick={this.submit.bind(this)}>submit</button>
      </div>
    )
  }
}