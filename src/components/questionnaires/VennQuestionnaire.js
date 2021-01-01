import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField, Button, Divider, Typography} from '@material-ui/core';
import Rearranging from "../interactives/Rearranging";
import Venn from "../interactives/Venn";

const VennQuestionnaire=forwardRef((props,ref)=>{

  const validateNumber=num=>{
    return num!=NaN && num>0
  }

  var vennRef=useRef()

  const [n,setN]=useState(props.questionnaire!=null?props.questionnaire.sets.length:0)
  const [data,setData]=useState(props.questionnaire)


  const handleN=event=>{
    var val=parseInt(event.target.value)
    if(validateNumber(val))
      setN(val)
    else
      setN(0)
  }

  useImperativeHandle(ref, () => ({
    getData(){
      return vennRef.current!=undefined?vennRef.current.getData():null
    },
    isValid(){
      return data!=null && data!=undefined
    }
 }));

  const load=data=>{
    //console.log(data)
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
                <center >
                  <div style={{width:'50%'}}>
                    <Venn containerId='question' key={Date.now()} ref={vennRef} data={data}/>
                  </div>
                </center>
              </div>
          ):(
              <div/>
          )
        }
        <TextField
            type='number'
            variant='outlined'
            value={n}
            label='n(items)'
            style={{width:'10%',marginLeft:'1%'}}
            onChange={handleN}/>
        <br/><br/>
        <VennFields load={load} n={n} data={data}/>
      </div>
  )
})

const VennFields=forwardRef((props,ref)=>{
  var refs=[]

  Array(props.n).fill().map((_, i) => {
    var row=[]
    Array(5).fill().map((_, i) => {
      row.push(createRef())
    })
    refs.push(row)
  })

  const load=()=>{
    var sets=[]
    refs.map((row,ind)=>{
      var s=[]
      row[0].current.value.split('|').map(currSet=>{
        if(currSet.trim().length>0)
          s.push(currSet.trim())
      })
      if(parseInt(row[2].current.value)>0){
        var exclude=[]
        row[3].current.value.split('|').map(currSet=>{
          if(parseInt(currSet)>=0)
            exclude.push(parseInt(currSet))
        })
        var data={
          sets:s,
          size:parseInt(row[2].current.value),
          label:row[1].current.value,
          id:ind,
          color:row[4].current.value,
          selected:false,
          exclude:exclude
        }
        sets.push(data)
      }else {
        window.alert('enter areas')
        return
      }
    })
    props.load({
      sets:sets
    })
  }

  const arrayToString=arr=>{
    var string=''
    arr.map((item,ind)=>{
      string+=item
      if(ind<arr.length-1)
        string+='|'
    })
    return string
  }


  return(
    <div>
      <Button
          onClick={load}
          variant='contained'
          color='primary'>
        Load
      </Button><br/>

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
                label='Set/Intersection (delimit using |)'
                inputRef={refs[i][0]}
                defaultValue={props.data!=null && props.data!=undefined && i<props.data.sets.length?arrayToString(props.data.sets[i].sets):''}
                style={{width: '15%',marginLeft:'1%',marginTop:'10px'}}/>
              <TextField
                variant='outlined'
                id="standard-basic"
                label='Label'
                defaultValue={props.data!=null && props.data!=undefined && i<props.data.sets.length?props.data.sets[i].label:''}
                inputRef={refs[i][1]}
                style={{width: '17%',marginLeft:'1%',marginTop:'10px'}}/>
                <TextField
                  variant='outlined'
                  id="standard-basic"
                  label='Relative Area'
                  type='number'
                  defaultValue={props.data!=null && props.data!=undefined && i<props.data.sets.length?props.data.sets[i].size:''}
                  inputRef={refs[i][2]}
                  style={{width: '18%',marginLeft:'1%',marginTop:'10px'}}/>
                  <TextField
                    variant='outlined'
                    id="standard-basic"
                    inputRef={refs[i][3]}
                    defaultValue={props.data!=null && props.data!=undefined && i<props.data.sets.length?arrayToString(props.data.sets[i].exclude):''}
                    label='Deductions (delimit using |)'
                    style={{width: '18%',marginLeft:'1%',marginTop:'10px'}}/>

                    <TextField
                      variant='outlined'
                      id="standard-basic"
                      type='color'
                      defaultValue={props.data!=null && props.data!=undefined && i<props.data.sets.length?props.data.sets[i].color:'00aaff'}
                      inputRef={refs[i][4]}
                      style={{width: '18%',marginLeft:'1%',marginTop:'10px'}}/>
            </div>
          )
        })
      }
    </div>
  )
})

export default VennQuestionnaire

