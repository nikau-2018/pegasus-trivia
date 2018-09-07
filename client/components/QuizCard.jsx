import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

const QuizCard = props => {
  return (
    <div className="quizCard">
      <h2>{props.category}</h2>
      <div className={`category${props.categoryId}`}></div>
        
      <Link to={`/quiz/${props.categoryId}`}><button>Start This Quiz</button></Link>
    </div>
  )
}

export default QuizCard
