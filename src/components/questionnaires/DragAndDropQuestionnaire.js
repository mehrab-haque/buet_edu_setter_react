import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import {TextField,Button,Divider,Typography} from '@material-ui/core';
import DragAndDrop from '../interactives/DragAndDrop'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const ExclusionQuestionnaire=forwardRef((props,ref)=>{

    const validateNumber=num=>{
        return num!=NaN && num>0
    }

    var dragAndDropRef=useRef()



    const [n,setN]=useState(props.questionnaire!=null?props.questionnaire.length:0)

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
            return dragAndDropRef.current!=undefined?dragAndDropRef.current.getData():null
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
                                <DragAndDrop ref={dragAndDropRef} key={Date.now()} data={data}/>
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
                label='n(Images)'
                style={{width:'10%',marginLeft:'1%'}}
                onChange={handleN}/>
            <br/><br/>
            <DragAndDropFields load={load} n={n} data={data}/>
        </div>
    )
})

const DragAndDropFields=forwardRef((props,ref)=>{

    var refs=[]

    Array(props.n).fill().map((_, i) => {
        var row=[]
        Array(5).fill().map((_, i) => {
            row.push(createRef())
        })
        refs.push(row)
    })

    //console.log(props.data)



    //console.log(refs)

    const load=()=>{
        var data=[]
        refs.map((row,i)=>{
            var tmpRow=[]
            var tmpBool=[]
            row.map((item,j)=>{
                if(j==0)tmpRow.push(item.current.value)
                else if(j<4) tmpRow.push(parseInt(item.current.value))
                else tmpRow.push(item.current.checked)
            })
            tmpRow.push(40)
            tmpRow.push(40)
            //console.log(tmpRow)
            data.push(tmpRow)
        })
        //console.log(data)
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
                Array(props.n).fill().map((_, i) => {
                    return(
                        <div style={{marginTop:'10px'}}>

                            <TextField
                                defaultValue={props.data!=null && props.data!=undefined && i<props.data.length?props.data[i][0]:''}
                                label='Image URL'
                                style={{width:'19%',marginLeft:'1%'}}
                                variant='outlined'
                                fullWidth
                                inputRef={refs[i][0]}
                            />
                            <TextField
                                defaultValue={props.data!=null && props.data!=undefined && i<props.data.length?props.data[i][1]:''}

                                type='number'
                                label='width(%)'
                                variant='outlined'
                                fullWidth
                                style={{width:'19%',marginLeft:'1%'}}
                                inputRef={refs[i][1]}
                            />
                            <TextField
                                defaultValue={props.data!=null && props.data!=undefined && i<props.data.length?props.data[i][2]:''}

                                type='number'
                                label='height(%)'
                                variant='outlined'
                                fullWidth                                style={{width:'15%',marginLeft:'1%'}}
                                style={{width:'19%',marginLeft:'1%'}}

                                inputRef={refs[i][2]}
                            />
                            <TextField
                                defaultValue={props.data!=null && props.data!=undefined && i<props.data.length?props.data[i][3]:''}

                                type='number'
                                label='rot(degrees)'
                                variant='outlined'
                                fullWidth
                                style={{width:'19%',marginLeft:'1%'}}

                                inputRef={refs[i][3]}
                            />

                            <FormControlLabel
                                style={{width:'15%',marginLeft:'1%'}}

                                value="top"
                                control={<Switch defaultChecked={props.data!=null && props.data!=undefined && i<props.data.length?props.data[i][4]:false} inputRef={refs[i][4]}  color="primary"/>}
                                label="locked"
                                labelPlacement="bottom"

                            />
                        </div>

                    )
                })
            }
        </div>
    )
})

export default ExclusionQuestionnaire
