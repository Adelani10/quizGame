import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import {nanoid} from 'nanoid'
import Quiz from "./quiz"
// import "./index.css"

let correctAnswersCount = 0

function App() {
  const [quizData, setQuizData] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [gameDone, setGameDone] = useState(false)
  const [score, setScore] = useState(0)
  const [restart, setRestart] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

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
          id: nanoid(),
          q: item.question,
          correctAns: item.correct_answer,
          randomAnswers: shuffleAnswers([...item.incorrect_answers, item.correct_answer]),
          chosen_answer: ""
        }
      }))
    })
  }, [restart])

  function chooseAnswer (event){
    console.log(event)
    setQuizData(prev => prev.map(quest => {
        if(event.target.id == quest.id){
          return {...quest, chosen_answer: event.target.value}
        }
        else{
          return quest
        }
      })
      
  )
}

function checkAnswers (){
  setGameDone(prev => !prev)
  for (const item of quizData){
      if(item.correctAns == item.chosen_answer){
         setScore(prev => prev + 1)
      }
    }
  }

function restartGame (){
  setScore(0)
  setGameDone(prev => !prev)
  for (const item of quizData){
      if(item.correctAns == item.chosen_answer){
         setScore(prev => prev + 1)
      }
    }
    setRestart(prev => !prev)
  }




  const quizElements = quizData.map(item => {
    return < Quiz  
                key={item.id}
                isSelected={isSelected}
                dataId={item.id}
                question={item.q}
                chosenAnswer={item.chosen_answer}
                chooseAnswer={chooseAnswer}
                correctAnswer={item.correctAns}
                options={item.randomAnswers}
                
          />
  })

  return (
    <div className="App md:w-1/2 mx-auto border min-h-screen px-4 border-teal-400">
      {startGame && <main className="space-y-8 pt-8">
      {quizElements}
      <div className="flex justify-center items-center space-x-3">
        {gameDone && <h1 className="font-bold text-lg text-[#293264]">You scored {score}/5 correct answers</h1>}
        {!gameDone && <button onClick={checkAnswers} className="w-[30%] mx-auto py-2 bg-[#293264] text-white rounded-lg hover:bg-sky-400 tracking-wider font-bold">Check Answers</button>}


        {gameDone && <button onClick={restartGame} className="w-[30%] mx-auto py-2 bg-[#293264] text-white rounded-lg hover:bg-sky-400 tracking-wider font-bold">Play Again</button>}
      </div>
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
