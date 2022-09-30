import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import {nanoid} from 'nanoid'
import Quiz from "./quiz"

function App() {

  const initialData = () => {
        let loading = []
        for (let n = 0; n < 5; n ++) {
            loading.push({
                id: Math.ceil(Math.random() * 999999999),
                q: "Loading...",
                correctAns: "...",
                randomAnswers: [". . .",". . .",". . .", ". . ."],
                chosen_answer: "none",
                isAnswerSelected: new Array(4).fill(false),
                answersIds: new Array(4).fill(null).map(item => nanoid())
            })
        }
        return loading
    }
  const [quizData, setQuizData] = useState(initialData)
  const [startGame, setStartGame] = useState(false)
  const [gameDone, setGameDone] = useState(false)
  const [score, setScore] = useState(0)
  const [restart, setRestart] = useState(false)
  const [correction, setCorrection] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)

  function handleClick(){
    setStartGame(prev => !prev)
  }

  function shuffleAnswers (arr){
    return [...arr].sort(() => 0.5 - Math.random())
  }
  useEffect(()=>{
    setDisabledBtn(true)
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      
      setQuizData(data.results.map((item)=>{
        return {
          id: nanoid(),
          q: item.question,
          correctAns: item.correct_answer,
          randomAnswers: shuffleAnswers([...item.incorrect_answers, item.correct_answer]),
          chosen_answer: "",
          isAnswerSelected: new Array(item.incorrect_answers.length + 1).fill(false),
          answersIds: new Array(item.incorrect_answers.length+1).fill(null).map(item => nanoid())
        }
      }))
      setDisabledBtn(false)
    })
  }, [restart])

  function chooseAnswer (event){
    setQuizData(prev => JSON.parse(JSON.stringify(prev)).map(quest => {
              if(event.target.id == quest.id ){
              quest.chosen_answer = event.target.value
                  quest.randomAnswers.forEach((answer, index) => {
                    answer === event.target.value ? quest.isAnswerSelected[index] = true 
                    : quest.isAnswerSelected[index] = false
                  })
                  
              }
              return quest
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
    setCorrection(prev => !prev)
  }

function restartGame (){
  setScore(0)
  setCorrection(prev => !prev)
  setRestart(prev => !prev)
  setGameDone(prev => !prev)


  if(score === 0) {for (const item of quizData){
      if(item.correctAns == item.chosen_answer){
         setScore(prev => prev + 1)
      }
    }}
    
  }




  const quizElements = quizData.map(item => {
    return < Quiz  
                key={item.id}
                isSelected={item.selectedStatus}
                answersIds={item.answersIds}
                dataId={item.id}
                isAnswerSelected={item.isAnswerSelected}
                question={item.q}
                chosenAnswer={item.chosen_answer}
                chooseAnswer={chooseAnswer}
                correctAnswer={item.correctAns}
                options={item.randomAnswers}
                correction={correction}
          />
  })

  return (

    <div className='App w-full h-full mx-auto border relative overflow-x-hidden overflow-y-hidden'>

      <div className="top-design absolute bg-[#FFFAD1] w-[200px] h-[200px] rounded-full -top-20 -right-20 "></div>
      <div className="bottom-design absolute bg-[#89CFF0] w-[200px] h-[200px] rounded-full -bottom-20 -left-20"></div>


      <div className="App md:w-1/2 mx-auto min-h-screen px-4 z-20 pb-8 relative">
          {startGame && <main className="py-2">
          {quizElements}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {gameDone && <h1 className="font-bold md:text-lg text-sm text-[#293264]">
              You got {score}/5 correct answers!{score === 3 ? "👍🏻" : score > 3 ? "🥳" : "😬"}</h1>}
            {!gameDone && <button 
                onClick={checkAnswers} 
                disabled={disabledBtn}
                className="md:w-[30%] px-2 py-2 bg-[#293264] text-white rounded-lg hover:bg-sky-400 tracking-wider font-bold">Check Answers</button>}


            {gameDone && <button 
                onClick={restartGame} 
                className="md:w-[30%] px-2 py-2 bg-[#293264] text-white rounded-lg hover:bg-sky-400 tracking-wider font-bold">Play Again</button>}
          </div>
          </main>}
          
          {!startGame && <div className="p-2 text-[#293264] text-center space-y-6 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
              <h1 className="md:text-4xl text-2xl font-bold">QUIZZICAL</h1>
              <p className="tracking-tighter md:tracking-widest"> ❔❓ What've you got ❔❓</p>
              <button onClick={handleClick} className="px-6 py-2 bg-[#293264] text-white rounded-lg hover:bg-sky-400 tracking-wider font-bold">Start quiz</button>
          </div>}

      </div>
    </div>
  )
}

export default App
