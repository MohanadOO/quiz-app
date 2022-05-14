import { useState, useRef } from 'react'

export default function Start({ startGame }) {
  const [range, setRange] = useState(4)
  const [category, setCategory] = useState(9)
  const select = useRef('General Knowledge')

  function handleCategory(e) {
    const value = e.target.value
    setCategory(value)
    select.current = e.target[value - 9].innerText
  }

  return (
    <main>
      <h1>Quizzical</h1>
      <p>Choose the category you want to test yourself with</p>
      <div className='user-options'>
        <select className='category' value={category} onChange={handleCategory}>
          <option value='9'>General Knowledge</option>
          <option value='10'>Entertainment: Books</option>
          <option value='11'>Entertainment: Film</option>
          <option value='12'>Entertainment: Music</option>
          <option value='13'>Entertainment: Musicals &amp; Theatres</option>
          <option value='14'>Entertainment: Television</option>
          <option value='15'>Entertainment: Video Games</option>
          <option value='16'>Entertainment: Board Games</option>
          <option value='17'>Science &amp; Nature</option>
          <option value='18'>Science: Computers</option>
          <option value='19'>Science: Mathematics</option>
          <option value='20'>Mythology</option>
          <option value='21'>Sports</option>
          <option value='22'>Geography</option>
          <option value='23'>History</option>
          <option value='24'>Politics</option>
          <option value='25'>Art</option>
          <option value='26'>Celebrities</option>
          <option value='27'>Animals</option>
          <option value='28'>Vehicles</option>
          <option value='29'>Entertainment: Comics</option>
          <option value='30'>Science: Gadgets</option>
          <option value='31'>Entertainment: Japanese Anime &amp; Manga</option>
          <option value='32'>
            Entertainment: Cartoon &amp; Animations
          </option>{' '}
        </select>

        <input
          className='slider'
          value={range}
          onInput={(e) => setRange(e.target.value)}
          type='range'
          min='3'
          max='20'
        />
      </div>
      <h2>
        Test me in <span>{select.current} </span> with
        <span> {range}</span> questions
      </h2>
      <button onClick={() => startGame(range, category)}>Start Quiz</button>
    </main>
  )
}
