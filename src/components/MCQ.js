import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {Button,TextField,Select} from '@material-ui/core';

const MCQ=forwardRef((props,ref)=>{

  useImperativeHandle(ref, () => ({
    isValid(){

    },
    getData(){

    }
 }));

 const [nOptions,setNOptions]=useState('options' in props.data?props.data.options.length:0)
 const [ans,setAns]=useState('answer' in props.data?props.data.answer:0)

 const handleAns=event=>{
   setAns(event.target.value)
 }

 const addOption=props=>{
   setNOptions(nOptions+1)
 }

 const removeOption=props=>{
   if(nOptions>0)
    setNOptions(nOptions-1)
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

                id="standard-basic"
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
