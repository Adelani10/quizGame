import React from "react";
import "./index.css"

export default function Quiz (props){

    return (
        <div className="flex flex-col text-[#293264] space-y-3 border-b-2 w-full">
            <p className="md:tracking-widest  tracking-wider font-bold leading-tight">{props.question}</p>
            <div className="grid grid-cols-4 gap-3 w-full pb-4">
                <button 
                    id={props.dataId}
                    value={props.options[0]} 
                    onClick={props.chooseAnswer}
                    selected = {props.isSelected}
                    className="here py-1 bg-white rounded-lg leading-tight text-left px-1 tracking-tighter text-[10px] md:text-md hover:bg-[#D6DBF5] ">{props.options[0]}
                </button>


                <button 
                    id={props.dataId}
                    value={props.options[1]} 
                    onClick={props.chooseAnswer}
                    selected = {props.isSelected} 
                    className="btn py-1 bg-white rounded-lg leading-tight text-left px-1 tracking-tighter text-[10px] md:text-md  hover:bg-[#D6DBF5] ">{props.options[1]}
                </button>


                <button 
                    id={props.dataId}
                    value={props.options[2]} 
                    onClick={props.chooseAnswer}
                    selected = {props.isSelected}
                    className="btn py-1 bg-white rounded-lg leading-tight text-left px-1 tracking-tighter text-[10px] md:text-md hover:bg-[#D6DBF5] ">{props.options[2]}
                </button>


                <button 
                    id={props.dataId} 
                    value={props.options[3]}
                    onClick={props.chooseAnswer} 
                    selected = {props.isSelected}
                    className="btn py-1 bg-white rounded-lg leading-tight tracking-tighter text-left px-1 text-[10px] md:text-md hover:bg-[#D6DBF5] ">{props.options[3]}
                </button>
                
            </div>
        </div>
    )
    }