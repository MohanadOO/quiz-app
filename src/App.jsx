import { useState, useRef } from 'react'
import Start from './components/Start'
import Question from './components/Question'
import { Ripple } from 'react-awesome-spinners'

export default function App() {
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState([{}])

  const [showAnswer, setShowAnswer] = useState(false)
  const userAnswers = useRef([])

  function checkAnswers() {
    setShowAnswer(true)
  }

  function handleAnswers(hold, correct, index) {
    if (hold.choice === correct && !hold.hold) {
      userAnswers.current[index] = 'Correct'
    } else {
      userAnswers.current[index] = 'Wrong'
    }
  }

  const handleQuestions = async (amount, category) => {
    setStart('Loading')
    try {
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
      const res = await fetch(url)
      const data = await res.json()
      setQuestions(data.results)
      setStart(true)
    } catch (err) {
      console.error(err)
    }
  }

  const questionsElement = questions.map((q, index) => {
    const question = { ...q, userAnswers }
    return (
      <Question
        key={index}
        question={question.question}
        correct_answer={question.correct_answer}
        incorrect_answers={question.incorrect_answers}
        hold={(hold) => handleAnswers(hold, question.correct_answer, index)}
        showAnswer={showAnswer}
      />
    )
  })

  return (
    <div className='app'>
      {!start ? (
        <Start
          startGame={(range, category) => handleQuestions(range, category)}
        />
      ) : start === 'Loading' ? (
        <Ripple color={'#f57400'} />
      ) : (
        <div className='question-page'>
          {questionsElement}
          <div className='check-answers-container'>
            {!showAnswer ? (
              <button onClick={checkAnswers} className='check-answer'>
                Check Answers
              </button>
            ) : (
              <button
                onClick={() => setStart(false) || setShowAnswer(false)}
                className='check-answer'
              >
                Play Again
              </button>
            )}

            {showAnswer ? (
              <h2>
                {
                  userAnswers.current.filter((correct) => correct === 'Correct')
                    .length
                }{' '}
                / {questions.length}
              </h2>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
