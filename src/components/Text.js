import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {Button,TextField,Select} from '@material-ui/core';

const Text=forwardRef((props,ref)=>{

  useImperativeHandle(ref, () => ({
    isValid(){

    },
    getData(){

    }
 }));

 const [nAnswers,setNAnswers]=useState('answer' in props.data?props.data.answer.length:0)

 const addAnswer=props=>{
   setNAnswers(nAnswers+1)
 }

 const removeAnswer=props=>{
   if(nAnswers>0)
    setNAnswers(nAnswers-1)
 }

  return(
    <div style={{width:'50%'}}>
      <Button
        variant='outlined'
        color='primary'
        style={{width:'50%'}}
        onClick={addAnswer}
        >
        + Answer
      </Button>
      <Button
        variant='outlined'
        color='secondary'
        style={{width:'49%',marginLeft:'1%'}}
        onClick={removeAnswer}
        >
        - Answer
      </Button>
      {
        Array(nAnswers).fill().map((_, i) => {
          return(
            <div>
              <TextField
                variant='outlined'

                id="standard-basic"
                label={'Answer '+(i+1)}
                fullWidth
                style = {{marginTop:'10px'}} />
            </div>
          )
        })
      }
    </div>
  )
})

export default Text
