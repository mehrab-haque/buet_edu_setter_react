import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import ExclusionQuestionnaire from './questionnaires/ExclusionQuestionnaire'
import DragAndDropQuestionnaire from './questionnaires/DragAndDropQuestionnaire'
import GroupingQuestionnaire from './questionnaires/GroupingQuestionnaire'
import RearrangingQuestionnaire from './questionnaires/RearrangingQuestionnaire'
import MatchStickQuestionnaire from './questionnaires/MatchsticksQuestionnaire'
import VennQuestionnaire from './questionnaires/VennQuestionnaire'
import DragAndDropGridQuestionnaire from './questionnaires/DragAndDropGridQuestionnaire'

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
            props.interactiveType==3?(
                <DragAndDropQuestionnaire questionnaire={props.questionnaire} ref={ref}/>
            ):(
                props.interactiveType==4?(
                    <GroupingQuestionnaire questionnaire={props.questionnaire} ref={ref}/>
                ):(
                    props.interactiveType==5?(
                        <RearrangingQuestionnaire questionnaire={props.questionnaire} ref={ref}/>
                    ):(
                        props.interactiveType==6?(
                            <MatchStickQuestionnaire questionnaire={props.questionnaire} ref={ref}/>
                        ):(
                            props.interactiveType==7?(
                                <VennQuestionnaire questionnaire={props.questionnaire} ref={ref}/>
                            ):(
                                props.interactiveType==8?(
                                    <DragAndDropGridQuestionnaire questionnaire={props.questionnaire} ref={ref}/>
                                ):(
                                    <div/>
                                )
                            )
                        )
                    )
                )
            )
        )
      }
    </div>
  )
})

export default Questionnaire
