import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField,Button,Divider,Typography} from '@material-ui/core';
import Matchsticks from '../interactives/Matchsticks'
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RearrangingQuestionnaire=forwardRef((props,ref)=>{

    const validateNumber=num=>{
        return num!=NaN && num>0
    }

    var matchstickRef=useRef()


    const [n,setN]=useState(props.questionnaire!=null?props.questionnaire.elements.length:0)


    const [data,setData]=useState(props.questionnaire)

    //.log(props.questionnaire)


    const handleN=event=>{
        var val=parseInt(event.target.value)
        if(validateNumber(val))
            setN(val)
        else
            setN(0)
    }

    useImperativeHandle(ref, () => ({
        getData(){
            return matchstickRef.current!=undefined?matchstickRef.current.getData():null
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
                                <Matchsticks containerId='questionnaire' key={Date.now()} ref={matchstickRef} setter={true} data={data}/>
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
            <MatchsticksFields load={load} n={n} data={data}/>
        </div>
    )
})

const MatchsticksFields=forwardRef((props,ref)=>{

    var itemRefs=[]

    Array(props.n).fill().map((_, i) => {
        itemRefs.push(createRef())
    })

    //console.log(props.data)

    //console.log(refs)

    const load=()=>{
        var elements=[]
        Array(props.n).fill().map((_, i) => {
            elements.push({
                type:'matchstick',
                x1:20+i,
                y1:20,
                x2:21+i,
                y2:21,
                isLocked:false
            })
        })

        var data={
            divCount:100,
            bgColor:'#f4f4f4',
            lineColor:'#00aa00',
            lineOpacity:0.5,
            elements:elements
        }
        props.load(data)
    }


    //console.log('hi')
    //console.log(props.data)

    return(
        <div>
            <Button
                onClick={load}
                variant='contained'
                color='primary'>
                Load
            </Button><br/>
        </div>
    )
})

export default RearrangingQuestionnaire
