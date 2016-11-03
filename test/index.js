
import React from 'react'
import { assert } from 'chai'

import createUUID from '../lib/createUUID'

describe('createUUID', () => {
  it('it is a function', () => {
    assert.isFunction(createUUID)
  })
  it('should return cats', () => {
    let cats = createUUID()
    assert.equal(cats,'cats')
  })

})
