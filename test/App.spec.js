
import React from 'react'

import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import App from '../lib/components/app'
const sinon = require('sinon')


describe('Application', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<App />)
  })
  it('renders as a <div>', () => {
    const wrapper = shallow(<App />)
    assert.equal(wrapper.type(), 'div')
  })
  it('can call componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount')
    const wrapper = mount(<App />)
    assert.equal(App.prototype.componentDidMount.calledOnce, true)
  })
  it('should have onHomePage state of false',()=>{
    const wrapper = shallow(<App />)
    assert.equal(wrapper.state('onHomePage'),(false))
  })
  it('should have onWalletPage state of false',()=>{
    const wrapper = shallow(<App />)
    assert.equal(wrapper.state('onWalletPage'),(false))
  })
  it('should have onGamePage state of false',()=>{
    const wrapper = shallow(<App />)
    assert.equal(wrapper.state('onGamePage'),(false))
  })
})
