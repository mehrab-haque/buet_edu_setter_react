import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField,Button,Divider,Typography} from '@material-ui/core';
import DragAndDropGrid from "../interactives/DragAndDropGrid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

const DragAndDropGridQuestionnaire=forwardRef((props,ref)=>{

    const validateNumber=num=>{
        return num!=NaN && num>0
    }

    var groupRef=useRef()



    const [n,setN]=useState(props.questionnaire!=null?props.questionnaire.items.length:0)
    const [r,setR]=useState(props.questionnaire!=null?props.questionnaire.nRows:0)
    const [c,setC]=useState(props.questionnaire!=null?props.questionnaire.nCols:0)


    const [data,setData]=useState(props.questionnaire)

    //.log(props.questionnaire)


    const handleN=event=>{
        var val=parseInt(event.target.value)
        if(validateNumber(val))
            setN(val)
        else
            setN(0)
    }
    const handleR=event=>{
        var val=parseInt(event.target.value)
        if(validateNumber(val))
            setR(val)
        else
            setR(0)
    }
    const handleC=event=>{
        var val=parseInt(event.target.value)
        if(validateNumber(val))
            setC(val)
        else
            setC(0)
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
                                <DragAndDropGrid key={Date.now()} ref={groupRef} data={data}/>
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
                value={r}
                label='nRows'
                style={{width:'10%',marginLeft:'1%'}}
                onChange={handleR}/>
            <TextField
                type='number'
                variant='outlined'
                value={c}
                label='nCols'
                style={{width:'10%',marginLeft:'1%'}}
                onChange={handleC}/>
            <br/><br/>
            <TextField
                type='number'
                variant='outlined'
                value={n}
                label='n(items)'
                style={{width:'10%',marginLeft:'1%'}}
                onChange={handleN}/>
            <br/><br/>
            <GroupingFields load={load} n={n} r={r} c={c} data={data}/>
        </div>
    )
})

const GroupingFields=forwardRef((props,ref)=>{

    var containerRefs=[]
    var itemRefs=[]
    var activeRefs=[]

    Array(props.r*props.c).fill().map((_, i) => {
        containerRefs.push(createRef())
        activeRefs.push(createRef())
    })

    Array(props.n).fill().map((_, i) => {
        itemRefs.push(createRef())
    })


    // console.log('gggggggggggggg')
    // console.log(props.data.active)
    // console.log('gggggggggggggg')

    //console.log(props.data)



    //console.log(refs)

    const load=()=>{
        var containers=[]
        var items=[]
        var active=[]
        containerRefs.map(ref=>{
            containers.push(ref.current.value.length>0?ref.current.value.substr(0,2):' ')
        })
        itemRefs.map(ref=>{
            items.push(ref.current.value.length>0?ref.current.value.substr(0,2):' ')
        })
        activeRefs.map(ref=>{
            active.push(ref.current.checked)
        })
        var data={
            containers:containers,
            items:items,
            nRows:props.r,
            nCols:props.c,
            active:active
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
                Array(props.r*props.c).fill().map((_,i)=>{
                    return (
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    defaultValue={props.data!=null && props.data!=undefined && i<props.data.containers.length?props.data.containers[i]:''}
                                    label={'Container - '+(i+1)}
                                    style={{marginTop:'10px'}}
                                    variant='outlined'
                                    fullWidth
                                    inputRef={containerRefs[i]}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value="top"
                                    control={<Switch defaultChecked={props.data!=null && props.data!=undefined && i<props.data.nRows*props.data.nCols?props.data.active[i]:true} inputRef={activeRefs[i]}  color="primary"/>}
                                    label="Active ?"
                                    labelPlacement="bottom"

                                />
                            </Grid>
                        </Grid>

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

export default DragAndDropGridQuestionnaire
