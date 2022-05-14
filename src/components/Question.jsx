import { useState } from 'react'
import he from 'he'

export default function Questions(props) {
  const [allChoices, setAllChoices] = useState(shuffle())

  function shuffle() {
    const array = [
      { choice: props.correct_answer, hold: false, answer: true },
      { choice: props.incorrect_answers[0], hold: false, answer: false },
      { choice: props.incorrect_answers[1], hold: false, answer: false },
      { choice: props.incorrect_answers[2], hold: false, answer: false },
    ]
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  function handleHold(event) {
    if (!props.showAnswer) {
      setAllChoices((prevState) => {
        return prevState.map((choice) => {
          if (choice.hold) {
            if (choice.hold && event.target.id === choice.choice) {
              props.hold({ choice: choice.choice, hold: choice.hold })
            }
            return { ...choice, hold: !choice.hold }
          }
          return event.target.id === choice.choice
            ? props.hold({ choice: choice.choice, hold: choice.hold }) || {
                ...choice,
                hold: !choice.hold,
              }
            : choice
        })
      })
    }
  }

  const multipleChoices = allChoices.map((choice, index) => {
    const showStyle = {
      backgroundColor:
        choice.hold && choice.answer ? '#88B910' : choice.hold ? '#DB5C7D' : '',
      color:
        choice.hold && choice.answer ? 'white' : choice.hold ? 'white' : '',
    }

    const hideStyle = {
      backgroundColor: choice.hold ? '#0032a8' : '',
      color: choice.hold ? 'white' : '',
    }
    if (props.showAnswer) {
      return (
        <p
          style={showStyle}
          onClick={handleHold}
          key={index}
          id={choice.choice}
        >
          {he.decode(choice.choice)}
        </p>
      )
    }

    return (
      <p style={hideStyle} onClick={handleHold} key={index} id={choice.choice}>
        {he.decode(choice.choice)}
      </p>
    )
  })
  return (
    <div className='questions'>
      <h2>{he.decode(props.question)}</h2>
      <div className='multiple-choice'>{multipleChoices}</div>
    </div>
  )
}
