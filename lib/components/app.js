import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase, { reference, signIn, signOut } from '../firebase';
import moment from 'moment';
import {pick, map, extend} from 'lodash';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Budget from './Budget';
import Header from './Header';
import HomePage from './Homepage';
import WalletPage from './WalletPage';
import GamePage from './Gamepage';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      userBudget: '',
      date: '',
      onWalletPage: false,
      onGamePage: false,
      onHomePage: false,
      wagers: []
    };
  }
  componentDidMount() {
    let date = moment().format('YYYY-MM-DD');
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      this.saveUser(user);
    });
    this.setState({date: date})
    firebase.database().ref('wagers').on('value', (snapshot) => {
      const wagers = snapshot.val() || {};
      console.log(snapshot.val())
      this.setState({
        wagers: map(wagers, (val, key) => extend(val, {key}))
      })
    })
  }
  saveBudget(){
    const { user, userBudget} = this.state;
    let ref = userBudget;
    firebase.database().ref(`budget/${user.uid}/`).set(ref);
  }
  saveUser(user){
    let ref = pick(user,'displayName', 'email','uid')
    firebase.database().ref(`users/${user.uid}/`).set(ref);
  }
  setBudget(event){
    let budget = event.target.value;
    this.setState({userBudget: budget});
  }
  selectWalletPage(){
    this.setState({ onWalletPage:true, onGamePage:false, onHomePage:false})
  }
  selectGamePage(){
    this.setState({ onGamePage:true, onWalletPage:false, onHomePage:false})
  }
  selectHomePage(){
    this.setState({ onHomePage:true, onWalletPage:false, onGamePage:false})
  }
  render(){
    if(this.state.onGamePage){
      return(
        <div>
          <Header
            selectWalletPage ={this.selectWalletPage.bind(this)}
            selectGamePage = {this.selectGamePage.bind(this)}
            selectHomePage = {this.selectHomePage.bind(this)}/>
          <SignOut
            signOut= {signOut} />
          <GamePage
            date={this.state.date}
            user={this.state.user}
            userBudget= {this.state.userBudget} />
        </div>
      )
    }
    if(this.state.onWalletPage){
      return(
        <div>
          <Header
            selectWalletPage ={this.selectWalletPage.bind(this)}
            selectGamePage = {this.selectGamePage.bind(this)}
            selectHomePage = {this.selectHomePage.bind(this)}/>
          <SignOut
            signOut= {signOut} />
          <WalletPage userBudget= {this.state.userBudget} />
        </div>
      )
    }
    if(this.state.user){
      return(
      <div>
        <Header
         selectWalletPage ={this.selectWalletPage.bind(this)}
         selectGamePage = {this.selectGamePage.bind(this)}
         selectHomePage = {this.selectHomePage.bind(this)}/>
        <SignOut signOut= {signOut} />
        <HomePage user= {this.state.user} />
        <Budget setBudget={this.setBudget.bind(this)}
          userBudget={this.state.userBudget}
          saveBudget={this.saveBudget.bind(this)}/>
      </div>
    )
  }
  return(
    <SignIn signIn={signIn} />
  )
  }
}

module.exports = App;
