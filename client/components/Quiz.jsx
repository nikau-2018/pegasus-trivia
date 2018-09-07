import React from 'react'
import request from 'superagent'

export default class Quiz extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      categoryId: 9,
      difficulty: 'medium',
      questions: [],
      selections: [],
      currentQuestion: 0,
      score: 0
    }
  }

  // call the api using the parameters set in state and then place in to questions array. Set ready flag to true so we can start rendering questions. This gets everything we need to run the quiz.
  getQuestions () {
    request
      .get(`https://opentdb.com/api.php?amount=10&category=${this.state.categoryId}&difficulty=${this.state.difficulty}`)
      .then(res => {
        this.setState({
          questions: res.body.results,
          ready: true
        })
      })
  }

  // when the component has loaded, call getQuestions to conenct to the API and place questions in to state
  componentDidMount () {
    this.getQuestions()
  }

  // From https://css-tricks.com/snippets/javascript/shuffle-array/
  shuffle (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) { return o }
  }

  handleClick (selection) {
    const next = this.state.currentQuestion + 1
    this.setState({currentQuestion: next})
    const answers = this.state.selections
    answers.push(selection)
    this.setState({selections: answers})
    console.log(answers)
  }

  decodeh (str) {
    const charsToEncode = /[&"'<>]/g
    const encodeTo = {
      '&amp;': '&',
      '&quot;': 'HHH',
      '&#39;': "'",
      '&lt;': '<',
      '&gt;': '>'
    }
    return str.replace(charsToEncode, char => encodeTo[char])
  }

  renderQuestion () {
    const current = this.state.questions[this.state.currentQuestion] // get the current question and answers
    const answers = current.incorrect_answers.map(x => {
      return {
        answer: x,
        correct: false
      }
    })
    answers.push({
      answer: current.correct_answer,
      correct: true
    }) // add correct answer to array
    const randomAnswers = this.shuffle(answers)

    return (
      <div className='question'>
        <h2>{current.question}</h2>
        {
          randomAnswers.map((x, i) => {
            return <div className ='answer' key={i}><button onClick={() => this.handleClick(x)}>{this.decodeh(x.answer)}</button></div>
            // to use a radio button we have to wrap it in a label or it will errors
          })
        }
      </div>
    )
  }

  render () {
    return (
      <div className='app'>
        <h1>Quiz Component</h1>
        {this.state.ready && this.renderQuestion() }
      </div>
    )
  }
}
