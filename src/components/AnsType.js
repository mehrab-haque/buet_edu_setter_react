import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import MCQ from './MCQ'
import Text from './Text'

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

  return(
    <div>
      {
        props.ansType==1?(
          <MCQ ref={solRef} data={props.data}/>
        ):(
          props.ansType==2?(
            <Text ref={solRef} data={props.data}/>
          ):(
            <div/>
          )
        )
      }
    </div>
  )
})

export default AnsType
