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
        activeGame: false,
        message: ''
      };
  }

  selectTeamHome(event) {
      this.props.saveTeam(event);
      this.changeGameDisplay();
      if (this.state.activeHome === false){
        this.setState({
          activeHome: true});
      } else {
        this.setState({activeHome: false});
      }
  }

  selectTeamAway(event) {
      this.props.saveTeam(event);
      this.changeGameDisplay();
      if (this.state.activeAway === false){
        this.setState({
          activeAway: true});
      } else {
        this.setState({activeAway: false});
      }
  }

  submitWager(){
    let user = this.props.user;
    this.props.saveBet(user);
    this.submittedWagerMessage();
    this.changeGameDisplay();
  }

  submittedWagerMessage() {
    this.setState({message: 'Your bet has been successfully submitted!'});
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
      <section className={classesGame}>
        <article className='date-time'>
        {this.props.game.date} {this.props.game.time}
        </article>
        <article>
          <button
             onClick={this.selectTeamAway.bind(this)}
             className={classesAway}>
             {this.props.game.awayTeam.City} {this.props.game.awayTeam.Name} </button>
           @
           <button
              onClick={this.selectTeamHome.bind(this)}
              className={classesHome}>
              {this.props.game.homeTeam.City} {this.props.game.homeTeam.Name} </button>
          <span className='bet-input'>
            <input
               min='0'
               className= {createUUID(this.props.game)}
               placeholder="Enter your wager"
               onChange={(event) => this.props.setWager(event)}
               type="number"
               aria-label="wager-input-field"
            />
            <button
              className='submit-wager'
              disabled={!this.state.activeGame}
              aria-label="submit-wager-button"
              onClick={this.submitWager.bind(this)}> Bet!
            </button>
            <p className="bet-submit-message">{this.state.message}</p>
          </span>
         </article>
      </section>
    )
  }
}
module.exports = Game;
