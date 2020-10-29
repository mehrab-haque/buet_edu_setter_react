import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {Button,TextField,Select} from '@material-ui/core';

var answersObject={}

function updateObject(n){
  answersObject[n+'']=''
}

const Text=forwardRef((props,ref)=>{

    if('ansType' in props.data && props.data.ansType==2 && 'answer' in props.data)
      props.data.answer.map((answer,index)=>{
        answersObject[index+'']=answer
      })

    useImperativeHandle(ref, () => ({
      getData(){
        var data={}
        if(nAnswers>0){
          var answers=[]
          for(var i=0;i<nAnswers;i++)
            if(answersObject[i+''].trim().length>0)
              answers.push(answersObject[i+''])
          data['answer']=answers
        }
        return data
      },
      isValid(){
        if(nAnswers>0){
          var answers=[]
          for(var i=0;i<nAnswers;i++)
            if(answersObject[i+''].trim().length>0)
              answers.push(answersObject[i+''])
          return answers.length>0
        }else {
          return false
        }
      }
   }));


 const [nAnswers,setNAnswers]=useState('answer' in props.data && props.data.ansType==2?props.data.answer.length:0)

 const addAnswer=props=>{
   updateObject(nAnswers)
   setNAnswers(nAnswers+1)
 }

 const removeAnswer=props=>{
   if(nAnswers>0)
    setNAnswers(nAnswers-1)
 }

 const updateAnswers=event=>{
   answersObject[event.target.id+'']=event.target.value
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
                onChange={updateAnswers}
                defaultValue={answersObject[i+'']}
                id={i}
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
