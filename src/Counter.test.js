import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Counter from './components/Counter'
import { formatWithOptions } from 'util'

Enzyme.configure({ adapter: new EnzymeAdapter() })

// Factory function to create a ShallowWrapper for the App appComponent
// @function setup
// @param {object} props - Component props specific to this setup.
// @param {object} state - Initial state for setup.
// @returns {ShallowWrapper}

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Counter {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
}

// Return {ShallowWrapper} containing node(s) with the given data-test IDBCursorWithValue.
// @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search formatWithOptions.
// @param {string} val - Value of data-test attribute for search.
// @returns {ShallowWrapper}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`)
}

test('renders without error', () => {
  const wrapper = setup()
  const counterComponent = findByTestAttr(wrapper, 'component-counter')
  expect(counterComponent.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup()
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

describe('Increment', () => {
  test('renders increment button', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'increment-button')
    expect(button.length).toBe(1)
  })

  test('clicking the increment button increments the counter display', () => {
    const counter = 7
    const wrapper = setup(null, { counter })
    const button = findByTestAttr(wrapper, 'increment-button')
    button.simulate('click')
    wrapper.update()
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(counter + 1)
  })
})

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'decrement-button')
    expect(button.length).toBe(1)
  })

  test('clicking the decrement button decrememnts the counter display', () => {
    const counter = 6
    const wrapper = setup(null, { counter })
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')
    wrapper.update()
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(counter - 1)
  })
})

describe('counter is 0 and decrement is clicked', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')
    wrapper.update()
  })
  test('clicking the decrement button when the counter is 0 does not decrement', () => {
    const counter = findByTestAttr(wrapper, 'counter-display')
    expect(counter.text()).toContain('0')
  })
  test('clicking the decrement button when the counter is 0 displays an error', () => {
    const decrementError = findByTestAttr(wrapper, 'decrement-error')
    const decrementErrorClass = decrementError.hasClass('')
    expect(decrementErrorClass).toBe(true)
  })
  test('clicking increment removes the error', () => {
    const incrementButton = findByTestAttr(wrapper, 'increment-button')
    incrementButton.simulate('click')
    wrapper.update()
    const decrementError = findByTestAttr(wrapper, 'decrement-error')
    const decrementErrorClass = decrementError.hasClass('hidden')
    expect(decrementErrorClass).toBe(true)
  })
})
