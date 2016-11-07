import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import stats from '../../stats';
import {pick, filter, map} from 'lodash';
import moment from 'moment';

class GameFeedGame extends Component {
  render(){
    return(
      <span className='gamefeed-game'>
        <div> {moment(this.props.game.date).format('MMM Do')} </div>
        <span className='away-team'> {this.props.game.awayTeam.Abbreviation} {this.props.game.awayTeam.ID} @</span>
        <span className='home-team'>  {this.props.game.homeTeam.Abbreviation} {this.props.game.homeTeam.ID} </span>
      </span>
    )
  }
}

module.exports = GameFeedGame
