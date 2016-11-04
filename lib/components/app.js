import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase, { reference, signIn, signOut } from '../firebase';
import SignIn from './signIn';
import SignOut from './signOut';
import Budget from './budget';
import Header from './header';
import HomePage from './homepage';
import WalletPage from './walletPage';
import {pick, map} from 'lodash';
import GamePage from './gamepage';
import moment from 'moment';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      userBudget: '',
      date: '',
      onWalletPage: false,
      onGamePage: false,
      onHomePage: false
    };
  }
  saveBudget(){
    const { user, userBudget} = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email','uid'),
      wallet :userBudget});
  }
  saveUser(user){
    let ref = pick(user,'displayName', 'email','uid')
    console.log(ref)
    firebase.database().ref(`users/${user.uid}/`).set(
      ref
    )
  }
  setBudget(event){
    let budget = event.target.value;
    this.setState({userBudget: budget});
  }
  componentDidMount() {
    let date = moment().format('YYYY-MM-DD');
    firebase.auth().onAuthStateChanged(user => {
     this.setState({ user });
     this.saveUser(user);
   });
   this.setState({date: date})
  }
  selectWalletPage(){
    this.setState({ onWalletPage:true, onGamePage:false, onHomePage:false})
  }
  selectGamePage(){
    this.setState({ onGamePage:true,onWalletPage:false, onHomePage:false})
  }
  selectHomePage(){
    this.setState({ onHomePage:true,onWalletPage:false, onGamePage:false})
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
          <GamePage date={this.state.date} user={this.state.user} userBudget= {this.state.userBudget}/>
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
