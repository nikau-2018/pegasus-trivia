import React from 'react'
import Request from 'superagent'

import QuizCard from './QuizCard'

export default class Homepage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scores: [],
      general: [],
      science: [],
      film: [],
      gadgets: []
    }
  }

  componentDidMount () {
    Request.get('api/v1/scores')
      .then((res) => {
        this.setState({
          scores: res.body
        })
      })
      .then(this.setState({
        general: this.state.scores.map((score) => {
          return score.category === 'general'
        })
      }))
  }

  render () {
    return (
      <div>
        <h1>Pegasus Trivia</h1>
        <QuizCard
          category="General"
          categoryId="9" />
        <QuizCard
          category="Science & Nature"
          categoryId="17" />
        <QuizCard
          category="Film"
          categoryId="11" />
        <QuizCard
          category="Science & Gadgets"
          categoryId="30" />
      </div>
    )
  }
}
