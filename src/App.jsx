import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import Quiz from "./quiz"

function App() {
  const [quizData, setQuizData] = useState([])
  const [startGame, setStartGame] = useState(false)

  function handleClick(){
    setStartGame(prev => !prev)
  }

  function shuffleAnswers (arr){
    return [...arr].sort(() => 0.5 - Math.random())
  }
  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      setQuizData(data.results.map((item)=>{
        return {
          id: Math.floor(Math.random() * 999999999),
          q: item.question,
          correctAns: item.correct_answer,
          randomAnswers: shuffleAnswers([...item.incorrect_answers, item.correct_answer]),
          ansIsClicked: false,
          chosen_answer: ""
        }
      }))
    })
  }, [])

  function chooseAnswer (event){
    setQuizData(prev => prev.map(quest => {
      console.log(event.currentTarget.innerText)
        if(event.currentTarget.dataset.id === quest.id){
          return {...quest, 
                  chosen_answer: event.currentTarget.innerText, ansIsClicked: !ansIsClicked}
        }
        else{
          return quest
        }
      })
  )}

  const quizElements = quizData.map(item => {
    return < Quiz  
          key={item.id}
          dataId={item.id}
          question={item.q}
          ansIsClicked={item.ansIsClicked}
          chosenAnswer={item.chosen_answer}
          chooseAnswer={chooseAnswer}
          correctAnswer={item.correctAns}
          optionOne={item.randomAnswers[0]}
          optionTwo={item.randomAnswers[1]}
          optionThree={item.randomAnswers[2]}
          optionFour={item.randomAnswers[3]}
    />
  })

  return (
    <div className="App md:w-1/2 mx-auto border min-h-screen px-4 border-teal-400">
      {startGame && <main className="space-y-8 pt-8">
      {quizElements}
        <button className="w-[30%] mx-auto py-2 bg-[#293264] text-white rounded-lg hover:bg-sky-400 tracking-wider font-bold">Check Answers</button>
      </main>}
      
      {!startGame && <div className="p-2 text-[#293264] text-center space-y-3 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h1 className="md:text-4xl text-2xl font-bold">QUIZZICAL</h1>
          <p className="hover:underline">Some description if needed</p>
          <button onClick={handleClick} className="px-5 py-2 bg-[#293264] text-white rounded-lg hover:bg-sky-400 tracking-wider font-bold">Start quiz</button>
      </div>}

    </div>
  )
}

export default App
