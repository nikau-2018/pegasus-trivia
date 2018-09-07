import React from 'react'
import request from 'superagent'

export default class Quiz extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      stage: 0,
      categoryId: this.props.match.params.id,
      difficulty: 'hard',
      questions: [],
      category: '',
      selections: [],
      currentQuestion: 0,
      score: 0
    }
  }

  // call the api using the parameters set in state and then place in to questions array. Set stage flag to 1 so we can start rendering questions. This gets everything we need to run the quiz.
  getQuestions () {
    request
      .get(`https://opentdb.com/api.php?amount=10&category=${this.state.categoryId}&difficulty=${this.state.difficulty}`)
      .then(res => {
        this.setState({
          questions: res.body.results,
          category: res.body.results[0].category,
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
    for (var j, x, i = o.length; i; j = parseInt(Math.randnewm() * i), x = o[--i], o[i] = o[j], o[j] = x) { return o }
  }

  handleClick (selection) {
    const next = this.state.currentQuestion + 1
    // detect if quiz over if not increment current question number
    if (next === 10) {
      this.setState({stage: 2})
    } else {
      this.setState({currentQuestion: next})
    }
    // add selection to array
    const answers = this.state.selections
    answers.push(selection)
    let currentScore = this.state.score
    if (selection.correct) {
      currentScore += 1
    }
    this.setState({
      selections: answers,
      score: currentScore
    })
  }

  renderSummary () {
    return (
      <div id='summary'>
        <p>This is a {this.state.category} trivia quiz with 10 questions. Enjoy! 🦄</p>
        <button onClick={() => this.handleStart()}>Start</button>
      </div>
    )
  }

  handleStart () {
    this.setState({stage: 1})
  }

  renderQuestion () {
    const current = this.state.questions[this.state.currentQuestion] // get the current question and answers
    let answers = []
    answers = current.incorrect_answers.map(x => {
      let newAns = {
        answer: x,
        correct: false
      }
      return newAns
    })
    answers.push({
      answer: current.correct_answer,
      correct: true
    }) // add correct answer to array

    let randomAnswers = this.shuffle(answers)
    return (
      <div className='question'>
        <h2>{current.question}</h2>
        {
          randomAnswers.map((x, i) => {
            return <div className ='answer' key={i}><button onClick={() => this.handleClick(x)}>{x.answer}</button></div>
            // to use a radio button we have to wrap it in a label or it will errors
          })
        }
      </div>
    )
  }

  renderScore () {
    const score = this.state.score
    let message = 'Nice 👌'
    if (score === 10) message = '💯'
    else if (score < 5) message = "It's ok... try again maybe 🙊"

    return (
      <div>
        <div id='score'>
          <p>You got {score} out of 10</p>
          <p>{message}</p>
        </div>
        <div>
          <p>{this.state.questions.map((x, i) => {
            const message = this.state.selections[i].correct ? <span id='tick'>✔</span> : <span>❌ Correct answer was {x.correct_answer}</span>
            return (
              <div id='answerSummary' key={i}><h3>{x.question}</h3>

                <p>You selected: {this.state.selections[i].answer}</p>
                {message}
              </div>

            )
          })}</p>
          )
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='app'>
        <h1>Quiz Component</h1>
        {(this.state.stage === 0 && this.state.ready) && this.renderSummary()}
        {this.state.stage === 1 && this.renderQuestion() }
        {this.state.stage === 2 && this.renderScore()}
      </div>
    )
  }
}
