import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField,Button,Divider,Typography} from '@material-ui/core';
import Rearranging from '../interactives/Rearranging'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const RearrangingQuestionnaire=forwardRef((props,ref)=>{

    const validateNumber=num=>{
        return num!=NaN && num>0
    }

    var groupRef=useRef()


    const [n,setN]=useState(props.questionnaire!=null?props.questionnaire.items.length:0)


    const [data,setData]=useState(props.questionnaire)

    //.log(props.questionnaire)


    const handleN=event=>{
        var val=parseInt(event.target.value)
        if(validateNumber(val))
            setN(val)
        else
            setN(0)
    }

    const horizontalRef=useRef()

    useImperativeHandle(ref, () => ({
        getData(){
            if(groupRef.current!=undefined){
                var d=groupRef.current.getData()
                d['horizontal']=horizontalRef.current.checked
                return d
            }else
                return null
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
                                <Rearranging key={Date.now()} ref={groupRef} data={data}/>
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

            <FormControlLabel
                style={{width:'15%',marginLeft:'1%'}}
                inputRef={horizontalRef}
                value="top"
                control={<Switch defaultChecked={data!=null && data!=undefined && 'horizontal' in data && data.horizontal===true}  color="primary"/>}
                label="horizontal ?"
                labelPlacement="bottom"

            />
            <br/><br/>
            <RearrangingFields load={load} n={n} data={data}/>
        </div>
    )
})

const RearrangingFields=forwardRef((props,ref)=>{

    var itemRefs=[]

    Array(props.n).fill().map((_, i) => {
        itemRefs.push(createRef())
    })

    //console.log(props.data)

    //console.log(refs)

    const load=()=>{
        var items=[]
        itemRefs.map(ref=>{
            items.push(ref.current.value)
        })
        var data={
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

export default RearrangingQuestionnaire
