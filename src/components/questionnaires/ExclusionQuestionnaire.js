import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField,Button,Divider,Typography} from '@material-ui/core';
import Exclusion from '../interactives/Exclusion'

const ExclusionQuestionnaire=forwardRef((props,ref)=>{

  const validateNumber=num=>{
    return num!=NaN && num>0
  }

  var exclusionRef=useRef()



  const [m,setM]=useState(props.questionnaire!=null?props.questionnaire.rows.length:0)
  const [n,setN]=useState(props.questionnaire!=null?props.questionnaire.cols.length:0)

  const [data,setData]=useState(props.questionnaire)

  const handleM=event=>{
    var val=parseInt(event.target.value)
    if(validateNumber(val))
      setM(val)
    else
      setM(0)
  }

  const handleN=event=>{
    var val=parseInt(event.target.value)
    if(validateNumber(val))
      setN(val)
    else
      setN(0)
  }

  useImperativeHandle(ref, () => ({
    getData(){
      return exclusionRef.current!=undefined?exclusionRef.current.getData():null
    },
    isValid(){

    }
 }));

 const load=data=>{
   setData(data)
 }

  return(
    <div>
      {
        data!=null?(
          <div style={{marginBottom:'20px'}}>
            <Divider style={{marginTop:'10px'}}/>
            <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
              Preview and initial state:
            </Typography>
            <Exclusion ref={exclusionRef} key={Date.now()} data={data}/>
          </div>
        ):(
          <div/>
        )
      }
      <TextField
        type='number'
        variant='outlined'
        value={m}
        label='n(Rows)'
        style={{width:'10%'}}
        onChange={handleM}/>
      <TextField
        type='number'
        variant='outlined'
        value={n}
        label='n(Cols)'
        style={{width:'10%',marginLeft:'1%'}}
        onChange={handleN}/>
      <br/><br/>
      <ExclusionFields load={load} m={m} n={n} data={data}/>
    </div>
  )
})

const ExclusionFields=forwardRef((props,ref)=>{

  var refs=[]
  var colRefs=[]
  var rowRefs=[]

  Array(props.m).fill().map((_, i) => {
    var row=[]
    Array(props.n).fill().map((_, i) => {
      row.push(createRef())
    })
    refs.push(row)
  })

  Array(props.m).fill().map((_, i) => {
    rowRefs.push(createRef())
  })

  Array(props.n).fill().map((_, i) => {
    colRefs.push(createRef())
  })

  //console.log(refs)

  const load=()=>{
    var data=[]
    var bool=[]
    var rows=[]
    var cols=[]
    refs.map((row,i)=>{
      var tmpRow=[]
      var tmpBool=[]
      row.map((item,j)=>{
        tmpRow.push(row[j].current.value)
        tmpBool.push(true)
      })
      data.push(tmpRow)
      bool.push(tmpBool)
    })
    rowRefs.map((row,i)=>{
      rows.push(row.current.value)
    })
    colRefs.map((col,i)=>{
      cols.push(col.current.value)
    })

    props.load({
      rows:rows,
      cols:cols,
      data:data,
      state:bool
    })
  }

  return(
    <div>
      <table>
        <tr>
          <td style={{width:`${100.0/(props.n+1)}%`}}>
            <center>
              <Button
                variant='contained'
                color='primary'
                onClick={load}>
                Load
              </Button>
            </center>
          </td>
          {
            Array(props.n).fill().map((_, i) => {
              return(
                <td style={{width:`${100.0/(props.n+1)}%`}}>
                  <TextField
                    defaultValue={props.data!=null?props.data.cols[i]:''}
                    label='Label'
                    variant='outlined'
                    fullWidth
                    inputRef={colRefs[i]}
                  />
                </td>
              )
            })
          }
        </tr>
        {
          Array(props.m).fill().map((_, i) => {
            return(
              <tr>
              {
                Array(props.n+1).fill().map((_, j) => {
                  return(
                    <td style={{width:`${100.0/(props.n+1)}%`}}>
                      <TextField
                        variant='outlined'
                        label={j==0?'Label':''}
                        defaultValue={j>0?(props.data!=null && i<props.data.rows.length?props.data.data[i][j-1]:''):(props.data!=null && i<props.data.rows.length?props.data.rows[i]:'')}
                        inputRef={j>0?refs[i][j-1]:rowRefs[i]}
                        fullWidth
                      />
                    </td>
                  )
                })
              }
              </tr>
            )
          })
        }
      </table>
    </div>
  )
})

export default ExclusionQuestionnaire
