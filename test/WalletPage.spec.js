
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { assert, expect } from 'chai'
import WalletPage from '../lib/components/walletPage'

const sinon = require('sinon')

describe('WalletPage', () => {
  it.skip('can mount with no properties', () => {
    const wrapper = shallow(<WalletPage />)
  })
  it.skip('it should render as a div ', function(){
    const wrapper = render(<WalletPage />)
    assert.equal(wrapper.find('.wallet-page', 'div'))
  })
})
