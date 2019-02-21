import React, { Component } from 'react'

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0,
      error: false
    }
  }

  decrementCounter = () => {
    if (this.state.counter === 0) return this.setState({ error: true })
    this.setState({ counter: this.state.counter - 1 })
  }

  incrementCounter = () => {
    this.setState({
      error: false,
      counter: this.state.counter + 1
    })
  }

  render () {
    const errorClass = this.state.error ? '' : 'hidden'
    return (
      <div className='App' data-test='component-counter'>
        <h1 data-test='counter-display'> The counter is currently: {this.state.counter}</h1>
        <h2 data-test='decrement-error' className={errorClass}>Can't decrement from 0!</h2>
        <button data-test='increment-button' onClick={this.incrementCounter}>Increment counter</button>
        <button data-test='decrement-button' onClick={this.decrementCounter}>Decrement counter</button>
      </div>
    )
  }
}

export default Counter
