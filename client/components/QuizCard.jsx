import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

const QuizCard = props => {
  return (
    <div className="quizCard">
      <h2>{props.category}</h2>
      <ul className="leaders-list">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Link to={`/quiz/${props.categoryId}`}><button>Start This Quiz</button></Link>
    </div>
  )
}

export default QuizCard
