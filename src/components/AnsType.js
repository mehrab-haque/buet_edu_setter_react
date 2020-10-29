import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import MCQ from './MCQ'
import Text from './Text'

const AnsType=forwardRef((props,ref)=>{

  useImperativeHandle(ref, () => ({
    isValid(){

    },
    getData(){

    }
 }));

  return(
    <div>
      {
        props.ansType==1?(
          <MCQ data={props.data}/>
        ):(
          props.ansType==2?(
            <Text data={props.data}/>
          ):(
            <div/>
          )
        )
      }
    </div>
  )
})

export default AnsType
