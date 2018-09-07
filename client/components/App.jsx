import React from 'react'
import Quiz from './Quiz'
import Homepage from './Homepage'
import {HashRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='app'>
        
        <Router>
          <div>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/Quiz/:id' component={Quiz} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
