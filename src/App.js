import React, { Component } from 'react'
import Counter from './components/Counter'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Counter />
    )
  }
}

export default App
