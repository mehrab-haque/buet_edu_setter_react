import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import VennQuestionnaire from './questionnaires/VennQuestionnaire'
import ExclusionQuestionnaire from './questionnaires/ExclusionQuestionnaire'

const Questionnaire=forwardRef((props,ref1)=>{

  var ref=useRef()

  useImperativeHandle(ref1, () => ({
    getData(){
      return ref.current.getData()
    },
    isValid(){

    }
 }));

  return(
    <div>
      {
        props.interactiveType==2?(
          <ExclusionQuestionnaire questionnaire={props.questionnaire} ref={ref}/>
        ):(
          <div/>
        )
      }
    </div>
  )
})

export default Questionnaire
