import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {Button,TextField,Select} from '@material-ui/core';

var optionsObject={}

function updateObject(n){
  optionsObject[n+'']=''
  console.log(optionsObject)
}


const MCQ=forwardRef((props,ref)=>{

  if('options' in props.data)
    props.data.options.map((option,index)=>{
      optionsObject[index+'']=option
    })

  useImperativeHandle(ref, () => ({
    getData(){
      var data={}
      if(nOptions>0){
        var options=[]
        for(var i=0;i<nOptions;i++)
          options.push(optionsObject[i+''])
        data['options']=options
      }
      if(ans>0)data['answer']=parseInt(ans)
      return data
    },
    isValid(){
      return ans>0
    }
 }));

 const [nOptions,setNOptions]=useState('options' in props.data?props.data.options.length:0)
 const [ans,setAns]=useState('answer' in props.data && props.data.ansType==1?props.data.answer:0)

 const handleAns=event=>{
   setAns(event.target.value)
 }

 const addOption=props=>{
   updateObject(nOptions)
   setNOptions(nOptions+1)

 }

 const removeOption=props=>{
   if(nOptions>0){
    setNOptions(nOptions-1)
  }
 }

 const updateOptions=event=>{
   optionsObject[event.target.id+'']=event.target.value
 }

  return(
    <div style={{width:'50%'}}>
      <Button
        variant='outlined'
        color='primary'
        style={{width:'32%'}}
        onClick={addOption}
        >
        + Option
      </Button>
      <Button
        variant='outlined'
        color='secondary'
        style={{width:'32%',marginLeft:'1%'}}
        onClick={removeOption}
        >
        - Option
      </Button>
      <Select value={ans} onChange={handleAns} variant='outlined' native style = {{width: '32%',marginLeft:'1%'}}>
          <option value={0}>Select Answer</option>
          {
            Array(nOptions).fill().map((_, i) => {
              return(
                <option value={i+1}>Option {i+1}</option>
              )
            })
          }
        </Select>
      {
        Array(nOptions).fill().map((_, i) => {
          return(
            <div>
              <TextField
                variant='outlined'
                onChange={updateOptions}
                defaultValue={optionsObject[i+'']}
                id={i}
                label={'Option '+(i+1)}
                fullWidth
                style = {{marginTop:'10px'}} />
            </div>
          )
        })
      }
    </div>
  )
})

export default MCQ
