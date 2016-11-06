import React, { Component } from 'react';
import firebase, { reference } from '../firebase';
import stats from '../../stats';
import {pick, filter, map} from 'lodash';

class PendingGame extends Component {
  render(){
    return(
      <span className='game'>
        <h2 className='away-team'> {this.props.game.awayTeam.City} </h2> @
        <h2 className='home-team'> {this.props.game.homeTeam.City}</h2>
        <li>{this.props.game.location} @ {this.props.game.time}</li>
      </span>
    )
  }
}

module.exports = PendingGame
