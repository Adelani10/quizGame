import React from "react";
import he from 'he'
import "./index.css"

export default function Quiz (props){

const quizOptions = props.options.map((option, index)=> {
    const styles = {
        backgroundColor: (props.correction) && 
        (props.correctAnswer === props.chosenAnswer) && 
        (props.isAnswerSelected[index]) ? 
        "#94D7A2" : 
        (props.correction) && 
        (props.correctAnswer !== props.chosenAnswer) &&
        (props.isAnswerSelected[index])
         ?
        "#F8BCBC" : ""
    }

        return <button 
                    key={props.answersIds[index]}
                    id={props.dataId}
                    value={he.decode(option)} 
                    onClick={props.chooseAnswer}
                    isselected={props.isAnswerSelected[index].toString()}
                    style={styles}
                    className="answer py-1 border-2 rounded-lg leading-tight text-left pl-1 tracking-tighter text-[10px] md:text-sm">{he.decode(option)}
                </button>
    })

    return (
        <div className="flex flex-col text-[#293264] mt-8 space-y-3 border-b-2 w-full">
            <p className="md:tracking-widest md:text-lg tracking-wider font-bold leading-tight">
                {he.decode(props.question)}
                </p>
            <div className="grid grid-cols-4 gap-3 w-full pb-4">
                {quizOptions}
            </div>
        </div>
    )
    }