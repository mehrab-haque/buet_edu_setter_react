import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField,Button,Divider,Typography} from '@material-ui/core';
import Grouping from '../interactives/Grouping'
import FormControlLabel from "@material-ui/core/FormControlLabel";

const GroupingQuestionnaire=forwardRef((props,ref)=>{

    const validateNumber=num=>{
        return num!=NaN && num>0
    }

    var groupRef=useRef()


    const [m,setM]=useState(props.questionnaire!=null?props.questionnaire.containers.length:0)
    const [n,setN]=useState(props.questionnaire!=null?props.questionnaire.items.length:0)


    const [data,setData]=useState(props.questionnaire)

    //.log(props.questionnaire)


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
            return groupRef.current!=undefined?groupRef.current.getData():null
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
                                <Grouping key={Date.now()} ref={groupRef} data={data}/>
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
                value={m}
                label='n(containers)'
                style={{width:'10%',marginLeft:'1%'}}
                onChange={handleM}/>
            <br/><br/>
            <TextField
                type='number'
                variant='outlined'
                value={n}
                label='n(items)'
                style={{width:'10%',marginLeft:'1%'}}
                onChange={handleN}/>
            <br/><br/>
            <GroupingFields load={load} n={n} m={m} data={data}/>
        </div>
    )
})

const GroupingFields=forwardRef((props,ref)=>{

    var containerRefs=[]
    var itemRefs=[]

    Array(props.m).fill().map((_, i) => {
        containerRefs.push(createRef())
    })

    Array(props.n).fill().map((_, i) => {
        itemRefs.push(createRef())
    })

    //console.log(props.data)



    //console.log(refs)

    const load=()=>{
        var containers=[]
        var items=[]
        containerRefs.map(ref=>{
            containers.push(ref.current.value)
        })
        itemRefs.map(ref=>{
            items.push(ref.current.value)
        })
        var data={
            containers:containers,
            items:items
        }
        console.log(data)
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
            {
                Array(props.m).fill().map((_,i)=>{
                    return (
                        <TextField
                            defaultValue={props.data!=null && props.data!=undefined && i<props.data.containers.length?props.data.containers[i]:''}
                            label={'Container - '+(i+1)}
                            style={{marginTop:'10px'}}
                            variant='outlined'
                            fullWidth
                            inputRef={containerRefs[i]}
                        />
                    )
                })
            }
            {
                Array(props.n).fill().map((_,i)=>{
                    return (
                        <TextField
                            defaultValue={props.data!=null && props.data!=undefined && i<props.data.items.length?props.data.items[i]:''}
                            label={'Item - '+(i+1)}
                            style={{marginTop:'10px'}}
                            variant='outlined'
                            fullWidth
                            inputRef={itemRefs[i]}
                        />
                    )
                })
            }
        </div>
    )
})

export default GroupingQuestionnaire
