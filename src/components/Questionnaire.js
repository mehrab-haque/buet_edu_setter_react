import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import VennQuestionnaire from './questionnaires/VennQuestionnaire'

const Questionnaire=forwardRef((props,ref)=>{

  useImperativeHandle(ref, () => ({
    getData(){

    },
    isValid(){

    }
 }));

  return(
    <div>
      {
        props.interactiveType==2?(
          <VennQuestionnaire/>
        ):(
          <div/>
        )
      }
    </div>
  )
})

export default Questionnaire
