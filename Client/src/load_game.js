// add this to win function after click this.color(this)








import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Link, Redirect
} from "react-router-dom";
import './assets/css/rgb.css';
export default class Loadgame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 6, //The number of squares
      count: 0, //try counter
      display: 2,
      rand: '',
      highscorearray:[],
      style: '',
      type: 'block',
      color: [],
      button: 'btn',
      button2: 'selected',
      button3: 'btn',
      selected: '',
      span: '',
      p: [{ color: '', text: 'Hello ' }],
      h1: '',
      length:[],
      username: this.props.location.state.username,
      highscore: 0,
      user: this.props.location.state.user,
      displayuser: '',
      colors: 'NEW COLORS',
      show: 'none',
      show2: 'block',
      score:0, users:[]
    }
  }
  componentDidMount() {
    this.state.displayuser = "Hello " + this.state.username
    this.setState({
      displayuser: this.state.displayuser,
      highscore: this.state.highscore
    })
    this.color(this)
  }
  selectcolor() {
    var random = Math.floor(Math.random() * this.state.color.length);
    var selectedcolor = this.state.color[random]
    this.setState({
      selected: selectedcolor,
      span: selectedcolor
    }, () => {
      console.log(this.state.selected)
    })
  }

  check(color, event) {
    this.state.count = this.state.count + 1
    this.setState({
      count: this.state.count,
    })
    if (this.state.selected === color && this.state.count < 3 || this.state.selected === color && this.state.count == 3) {
      this.state.p[0].text = "YOU WIN!";
      this.state.h1 = this.state.selected;
      this.state.p[0].color = "green";
      this.state.highscore = this.state.highscore+1;
      this.setState({
        p: this.state.p,
        h1: this.state.h1,
        highscore:this.state.highscore,
        score:this.state.highscore
      },()=>{
        fetch('https://rgbreactgame.herokuapp.com/updatescore',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:this.state.username,
            highscore:this.state.highscore
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            
          })
        })
        .catch((error) => {
          console.error(error);
        }); 
      })
      for (var i = 0; i < this.state.color.length; i++) {
        this.state.color[i] = this.state.selected;
      }
      this.setState({
        color: this.state.color
      })
    }
    else if (this.state.count >= 3) {
      this.state.p[0].text = "YOU LOST THIS TIME, TRY AGAIN!";
      this.state.p[0].color = "red";
      this.state.colors = "PLAY AGAIN?"
      this.state.h1 = this.state.selected;
      this.setState({
        p: this.state.p,
        h1: this.state.h1,
        colors: this.state.colors,
        highscore:0
      })

      for (var i = 0; i < this.state.color.length; i++) {
        this.state.color[i] = this.state.selected
      }
 
    }
    else {
      for (var i = 0; i < this.state.color.length; i++) {
        if (color === this.state.color[i]) {
          this.state.color[i] = "#232323"
        }
      }
      this.state.p[0].color = "red"
      if (this.state.display == 2) {
        this.state.p[0].text = "you have " + this.state.display + " more tries left";
      }
      else if (this.state.display == 1) {
        this.state.p[0].text = "you have " + this.state.display + " more try left";
      }
      this.state.display = this.state.display - 1
      this.setState({
        display: this.state.display
      })
    }
    
  }

  color() {
    var i;
    var arr = []
    this.setState({
      colors: 'NEW COLORS'
    })
    for (i = 0; i < this.state.num; i++) {
      var red = Math.floor(Math.random() * 256);
      var blue = Math.floor(Math.random() * 256);
      var green = Math.floor(Math.random() * 256);
      var rgb = "rgb(" + red + ", " + green + ", " + blue + ")";
      arr.push(rgb)
    }
    this.state.p[0].text = ""
    this.setState({
      color: arr,
      display: 2,
      count: 0,
      h1: 'steelblue',
      p: this.state.p

    }, () => {
      this.selectcolor(this)
    })
  }

  easy() {
    console.log("easy")
    this.setState({
      num: 3,
      type: 'none',
      button: 'selected',
      button2: 'btn',
      button3: 'btn'

    }, () => {
      this.color(this)
    })

  }
  difficult() {
    console.log("not easy")
    this.setState({
      num: 6,
      type: 'block',
      button2: 'selected',
      button: 'btn',
      button3: 'btn'
    }, () => {
      this.color(this)
    })
  }
  highscore() {
    this.setState({
      button3: 'selected',
      button: 'btn',
      button2: 'btn',
      show: 'block',
      show2: 'none'
    })
    fetch('https://rgbreactgame.herokuapp.com/login/highscore',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid:this.state.user._id
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        users:responseJson.users
      },()=>{
        
      var result =Object.values(this.state.users)
      var temp;
      console.log(result)
    //   for(var i=0;i<result.length;i++){
    //     for(var j= 0;j<result.length;j++){
    //     if(result[i].highscore>result[j].highscore){
    //       temp = result[j]
    //       result[j]=result[i]
    //       result[i]=temp
    //     }
    //   }
    // }
    for(var k = 0 ;k<3;k++){
  this.state.highscorearray.push(result[k])
}
for (var k= 1 ; k<=3;k++){
  this.state.length.push(k)
}
console.log(this.state.length)
this.setState({
  highscorearray:this.state.highscorearray
})
console.log(this.state.highscorearray)
    // this.setState({
    //   highscorearray:result
    // })
    // console.log(this.state.highscorearray)
    })
    })
    .catch((error) => {
      console.error(error);
    }); 
    console.log(this.state.users)
   
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.show2 }}>
          <h1 style={{ backgroundColor: this.state.h1 }}>
            COLOR GAME <br />
            <span id="rgb">{this.state.span}</span>
            <br />GUESS THE COLOR<br />
            <h6> You only have three tries for both the modes of the game </h6>
          </h1>
          <div class="nav">
            <span id='p'>{this.state.displayuser}</span>
            <span id='p'>SCORE: {this.state.highscore}</span>
          </div>
          <div class="nav">
            <button class="reset" onClick={this.color.bind(this)}>{this.state.colors}</button>
            <span id="p">{this.state.p[0].text}</span>
            <button onClick={this.easy.bind(this)} class={this.state.button}>EASY</button>
            <button onClick={this.difficult.bind(this)} class={this.state.button2}>DIFFICULT</button>
            <button onClick={this.highscore.bind(this)} class={this.state.button3}>HIGHSCORE</button>
          </div>
          <div class="container">
            <div class="square" style={{ background: this.state.color[0] }} onClick={this.check.bind(this, this.state.color[0])}></div>
            <div class="square" style={{ background: this.state.color[1] }} onClick={this.check.bind(this, this.state.color[1])}></div>
            <div class="square" style={{ background: this.state.color[2] }} onClick={this.check.bind(this, this.state.color[2])}></div>
            <div class="square" style={{ background: this.state.color[3], display: this.state.type }} onClick={this.check.bind(this, this.state.color[3])}></div>
            <div class="square" style={{ background: this.state.color[4], display: this.state.type }} onClick={this.check.bind(this, this.state.color[4])}></div>
            <div class="square" style={{ background: this.state.color[5], display: this.state.type }} onClick={this.check.bind(this, this.state.color[5])}></div>
          </div>

        </div>

        <div style={{ display: this.state.show }}>
          <div class='container'>
            <table class="table">
              <thead>
                <tr>
                  <th>SL.NO</th>
                  <th>USERS</th>
                  <th>SCORES</th>
                </tr>
              </thead>
              <tbody>
                <td>
                {this.state.length.map(option => ( <tr>{option}</tr>))}
                </td>
                <td>
                {this.state.highscorearray.map(option => ( <tr>{option.username}</tr>))}
                </td>
                <td>
                {this.state.highscorearray.map(option => ( <tr>{option.highscore}</tr>))}
                </td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

  }
}


