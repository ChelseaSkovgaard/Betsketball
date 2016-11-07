
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import Game from '../lib/components/game'
import stats from './../stats'

const sinon = require('sinon')

describe('Unit Test | Game', () => {
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
    const wrapper = shallow(<Game game={game} />)
  })
  it('should have a button with 1 prop', function(){
    const wrapper = render(<Game game={game} />)
    assert.equal(wrapper.find('.away-team').length, 1)
  })
  it('should run the submitWager function on button click', function(){
    let submitWager = sinon.spy()
    let saveBet = ()=>{
    }
    const wrapper = mount(<Game saveBet={saveBet} game={game} submitWager={submitWager} />)
       wrapper.find('.submit-wager').simulate('click')
       expect(submitWager.calledOnce).to.equal(true)
  })
})
