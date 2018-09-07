import React from 'react'
import Request from 'superagent'

export default class Homepage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allScores: []
    }
  }

  componentDidMount () {
    Request.get('/scores')
      .then((scores) => {
        this.setState({
          allScores: scores
        })
      })
  }

  render () {
    return (
      <h1> test </h1>
    )
  }
}
