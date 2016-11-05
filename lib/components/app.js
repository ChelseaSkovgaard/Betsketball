import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase, { reference, signIn, signOut } from '../firebase';
import moment from 'moment';
import {pick, map, extend, filter} from 'lodash';
import stats from '../../stats';
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
      wagers: [],
      budgets: [],
      todaysGames: []
    };
  }
  componentDidMount() {
    let date = moment().format('YYYY-MM-DD');
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      this.saveUser(user);
    });
    this.setState({date: date})
    firebase.database().ref('budget').on('value', (snapshot) => {
      const budgets = snapshot.val() || {};
      this.setState({
        budgets: budgets
      });
    })
    firebase.database().ref('wagers').on('value', (snapshot) => {
      const wagers = snapshot.val() || {};
      this.setState({
        wagers: map(wagers, (val, key) => extend(val, {key})),
      });
    })
  }
  getTodayGames(){
    let games = JSON.parse(stats)['fullgameschedule']['gameentry'];
    let filteredGames = filter(games, (game) => {
      return game.date === this.state.date
    });
    this.setState({todaysGames: filteredGames});
  }
  updateWagers() {
    let wagers = this.state.wagers;
    let wagersDates = wagers.map((wager) => wager.wager.key.slice(-10));
    let wagerKeys = wagers.map((wager) => wager.key);
    for (var i = 0; i < wagersDates.length; i++){
      if (moment(this.state.date).isAfter(wagersDates[i])){
        let ref = firebase.database().ref(`wagers/${wagerKeys[i]}/wager/`);
        ref.update({finished: true});
      }
    }
  }
  checkOutcome() {
    let finishedWagers = this.state.wagers.filter((wager) => wager.wager.finished === true);
    const games = JSON.parse(stats)['fullgameschedule']['gameentry'];
    for (var i = 0; i < finishedWagers.length; i++) {
      let id = finishedWagers[i].wager.key;
      let date = id.slice(-10);
      let location = id.slice(0,-11).replace('-',' ');
      let game = filter(games, (game) => {
        return location === game.location && date === game.date
      })
      let outcome = this.checkGameResult(game, finishedWagers[i]);
    }
  }
  checkGameResult(game, wager){
    if (parseInt(game[0].awayTeam.ID) > parseInt(game[0].homeTeam.ID)){
      return 'away-team'
    } else {
      return 'home-team'
    }
  }
  saveBudget(){
    const { user, userBudget} = this.state;
    let ref = userBudget;
    firebase.database().ref(`budget/${user.uid}/`).set(ref);
    // this.updateWagers();
    this.getTodayGames();
    this.checkOutcome();
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
