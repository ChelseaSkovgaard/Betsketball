
import React from 'react'
import { assert } from 'chai'

import createUUID from '../lib/createUUID'

describe('createUUID', () => {
  it('it is a function', () => {
    assert.isFunction(createUUID)
  })
  it('should return a key', ()=>{
    let game ={date: "2016-11-03", time: "7:00PM", awayTeam: Object, homeTeam: Object, location: "Time Warner Cable Arena"}
    let key = "Time-Warner-Cable-Arena-2016-11-03"
    assert.equal(createUUID(game),key)
  })
})
