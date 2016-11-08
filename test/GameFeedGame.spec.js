
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import GameFeedGame from '../lib/components/gameFeedGame'

const sinon = require('sinon')

describe('GameFeedGame', () => {
  let game = {
  date: "2016-10-27",
  time: "8:00PM",
  awayTeam: {
  ID: "88",
  City: "Detroit",
  Name: "Pistons",
  Abbreviation: "DET"
  },
  homeTeam: {
  ID: "91",
  City: "Atlanta",
  Name: "Hawks",
  Abbreviation: "ATL"
  },
  location: "Philips Arena"
  }
  it('can mount with no properties', () => {
    const wrapper = shallow(<GameFeedGame game={game} />)
  })
})
