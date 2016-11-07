import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import stats from '../../stats';
import {pick, filter, map} from 'lodash';

class PendingGame extends Component {
  render(){
    return(
      <span className='pending-game'>
        <span className='away-team'> {this.props.game.awayTeam.City} </span> @
        <span className='home-team'> {this.props.game.homeTeam.City}</span>
        <li> {this.props.game.time} {this.props.game.location} </li>
      </span>
    )
  }
}

module.exports = PendingGame
