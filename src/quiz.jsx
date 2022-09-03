import React from "react";
import "./index.css"

export default function Quiz (props){

   const styles = {
    backgroundColor: props.ansIsClicked ? "#D6DBF5" : "white"
   }
    return (
        <div className="flex flex-col text-[#293264] space-y-3 border-b-2 w-full">
            <p className="md:tracking-widest  tracking-wider font-bold leading-tight">{props.question}</p>
            <div className="grid grid-cols-4 gap-3 w-full pb-4">
                <button data-id={props.dataId} style={styles} onClick={props.chooseAnswer} className="py-1 rounded-lg leading-tight text-left px-1 tracking-tighter text-[10px] md:text-md hover:bg-[#D6DBF5] ">{props.optionOne}</button>


                <button style={styles} onClick={props.chooseAnswer} className="py-1 rounded-lg leading-tight text-left px-1 tracking-tighter text-[10px] md:text-md  hover:bg-[#D6DBF5] ">{props.optionTwo}</button>


                <button style={styles} onClick={props.chooseAnswer} className="py-1 rounded-lg leading-tight text-left px-1 tracking-tighter text-[10px] md:text-md hover:bg-[#D6DBF5] ">{props.optionThree}</button>


                <button style={styles} onClick={props.chooseAnswer} className="py-1 rounded-lg leading-tight tracking-tighter text-left px-1 text-[10px] md:text-md hover:bg-[#D6DBF5] ">{props.optionFour}</button>
                
            </div>
        </div>
    )
    }