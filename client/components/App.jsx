import React from 'react'
import Quiz from './Quiz'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='app'>
        <div>
          <Quiz />
        </div>
      </div>
    )
  }
}

export default App
