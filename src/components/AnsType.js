import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import MCQ from './solutions/MCQ'
import Text from './solutions/Text'
import Exclusion from './interactives/Exclusion'
import Grouping from './interactives/Grouping'
import Rearranging from './interactives/Rearranging'

const AnsType=forwardRef((props,ref)=>{

  const solRef=useRef()

  useImperativeHandle(ref, () => ({
    getData(){
      return solRef.current.getData()
    },
    isValid(){
      return solRef.current.isValid()
    }
 }));

//console.log(props.ansType+' '+props.questionnaire+' '+props.interactiveType)

  return(
    <div>
      {
        props.ansType==1?(
          <MCQ ref={solRef} data={props.data}/>
        ):(
          props.ansType==2?(
            <Text ref={solRef} data={props.data}/>
          ):(
            props.ansType==3 && props.questionnaire!=null && props.interactiveType==2?(
              <Exclusion ref={solRef} data={'answer' in props.data && props.data.ansType==3 && props.data.interactiveType==2?(JSON.stringify(props.questionnaire)==props.data.questionnaire?JSON.parse(props.data.answer):props.questionnaire):props.questionnaire}/>
            ):(
                props.ansType==3 && props.questionnaire!=null  && props.interactiveType==4?(
                    <Grouping ref={solRef} data={'answer' in props.data && props.data.ansType==3 && props.data.interactiveType==4?(JSON.stringify(props.questionnaire)==props.data.questionnaire?JSON.parse(props.data.answer):props.questionnaire):props.questionnaire}/>
                ):(
                    props.ansType==3 && props.questionnaire!=null  && props.interactiveType==5?(
                        <Rearranging ref={solRef} data={'answer' in props.data && props.data.ansType==3 && props.data.interactiveType==5?(JSON.stringify(props.questionnaire)==props.data.questionnaire?JSON.parse(props.data.answer):props.questionnaire):props.questionnaire}/>
                    ):(
                        <div/>
                    )
                )
            )
          )
        )
      }
    </div>
  )
})

export default AnsType
