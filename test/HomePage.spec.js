
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import HomePage from '../lib/components/HomePage'
const sinon = require('sinon')

describe('HomePage', () => {
  it.skip('can mount with no properties', () => {
    const wrapper = shallow(<HomePage user={user} />)
  })
  it.skip('renders as a <h2>', () => {
    const wrapper = shallow(<HomePage  />)
    assert.equal(wrapper.type(), 'h2')
  })
})
