
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import HomePage from '../lib/components/HomePage'
const sinon = require('sinon')

describe('HomePage', () => {
  let user ={
    displayName: 'mike',
    uid:3
  }
  it('can mount with no properties', () => {
    let user = sinon.spy()
    const wrapper = shallow(<HomePage user={user} />)
  })
  it('renders as a <div>', () => {
    let displayName = {displayName: 'testUser' }
    const wrapper = shallow(<HomePage user={user} />)
    assert.equal(wrapper.type(), 'div')
  })
})
