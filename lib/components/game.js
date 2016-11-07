import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import stats from '../../stats';
import {pick, filter, map} from 'lodash';
import createUUID from '../createUUID';
import classnames from 'classnames';


class Game extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activeHome: false,
        activeAway: false,
        activeGame: false
      };
  }

  selectTeamHome(event) {
      this.props.saveTeam(event)
      if (this.state.activeHome === false){
        this.setState({
          activeHome: true});
      } else {
        this.setState({activeHome: false});
      }
  }

  selectTeamAway(event) {
      this.props.saveTeam(event)
      if (this.state.activeAway === false){
        this.setState({
          activeAway: true});
      } else {
        this.setState({activeAway: false});
      }
  }

  changeGameDisplay() {
    if (this.state.activeGame === false) {
    this.setState({
      activeGame: true
    });
  } else {
    this.setState({activeGame: false});
  }
  }

  render(){
    let user = this.props.user;
    let classesGame = classnames('game', {activeGame: this.state.activeGame});
    let classesAway = classnames('away-team', {active: this.state.activeAway});
    let classesHome = classnames('home-team', {active: this.state.activeHome});
    return(
      <div className={classesGame}>
      <li className='date-time'>{this.props.game.date} {this.props.game.time}
        <button  onClick={this.changeGameDisplay.bind(this)}>
        Select Game
        </button>
      </li>
      <li>
        <button
           onClick={this.selectTeamAway.bind(this)}
           className={classesAway}>
           {this.props.game.awayTeam.City} </button>
         @
         <button
            onClick={this.selectTeamHome.bind(this)}
            className={classesHome}>
            {this.props.game.homeTeam.City} </button>
        <span className='bet-input'>
          <input
             className= {createUUID(this.props.game)}
             placeholder="Enter your wager!"
             onChange={(event) => this.props.setWager(event)}
             type="number"
          />
          <button
            onClick={()=>this.props.saveBet(user)}> Bet!
          </button>

          <span>{this.props.message}</span>
          
        </span>
       </li>
      <li>{this.props.game.location}</li>
      </div>
    )
  }
}
module.exports = Game;
