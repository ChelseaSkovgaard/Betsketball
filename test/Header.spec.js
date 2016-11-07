
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import Header from '../lib/components/Header'
const sinon = require('sinon')

describe('Header', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Header />)
  })
  it('should select the wallet page when wallet button is clicked', ()=>{
    let selectWalletPage = sinon.spy();
    const wrapper = mount(<Header selectWalletPage={selectWalletPage} />);
    wrapper.find('.wallet').simulate('click');
    expect(selectWalletPage).to.have.property('callCount',1)
  })
  it('should select the games page when games button is clicked', ()=>{
    let selectGamePage = sinon.spy();
    const wrapper = mount(<Header selectGamePage={selectGamePage} />);
    wrapper.find('.games').simulate('click');
    expect(selectGamePage).to.have.property('callCount',1)
  })
  it('should select the home page when home button is clicked', ()=>{
    let selectHomePage = sinon.spy();
    const wrapper = mount(<Header selectHomePage={selectHomePage} />);
    wrapper.find('.home').simulate('click');
    expect(selectHomePage).to.have.property('callCount',1)
  })
})
