import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField} from '@material-ui/core';

const VennQuestionnaire=forwardRef((props,ref)=>{

  const validateNumber=num=>{
    return num!=NaN && num>0
  }

  const [n,setN]=useState(0)

  const handleN=event=>{
    var val=parseInt(event.target.value)
    if(validateNumber(val))
      setN(val)
    else
      setN(0)
  }

  useImperativeHandle(ref, () => ({
    getData(){

    },
    isValid(){

    }
 }));

  return(
    <div>
      <TextField
        type='number'
        variant='outlined'
        value={n}
        onChange={handleN}/>
      <VennFields n={n}/>
    </div>
  )
})

const VennFields=forwardRef((props,ref)=>{
  var fieldsRef=[]
  Array(props.n).fill().map((_, i) => {
    fieldsRef.push(createRef())
  })
  return(
    <div>
      {
        Array(props.n).fill().map((_, i) => {
          return(
            <div>
              <TextField
                variant='outlined'
                id="standard-basic"
                value={'id:'+i}
                style={{width: '8%',marginTop:'10px'}} />
              <TextField
                variant='outlined'
                id="standard-basic"
                label='Set/Intersection'
                style={{width: '15%',marginLeft:'1%',marginTop:'10px'}}/>
              <TextField
                variant='outlined'
                id="standard-basic"
                label='Label'
                style={{width: '17%',marginLeft:'1%',marginTop:'10px'}}/>
                <TextField
                  variant='outlined'
                  id="standard-basic"
                  label='Relative Area'
                  type='number'
                  style={{width: '18%',marginLeft:'1%',marginTop:'10px'}}/>
                  <TextField
                    variant='outlined'
                    id="standard-basic"
                    label='Deductions (delimit using |)'
                    style={{width: '18%',marginLeft:'1%',marginTop:'10px'}}/>

                    <TextField
                      variant='outlined'
                      id="standard-basic"
                      type='color'
                      style={{width: '18%',marginLeft:'1%',marginTop:'10px'}}/>
            </div>
          )
        })
      }
    </div>
  )
})

export default VennQuestionnaire
