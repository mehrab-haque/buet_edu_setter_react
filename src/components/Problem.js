import React from 'react'
import {Typography,Button,Divider} from '@material-ui/core';


const Problem=props=>{

  const close=()=>{
    props.close()
  }

  return(
    <div>
      <Button
        style={{width:'24%'}}
        variant='outlined'
        color='primary'>
        Save Draft
      </Button>
      <Button
        style={{width:'24%',marginLeft:'1%'}}
        variant='outlined'
        color='primary'>
        Roll Out
      </Button>
      <Button
        style={{width:'24%',marginLeft:'1%'}}
        variant='outlined'
        color='secondary'>
        Delete
      </Button>
      <Button
        style={{width:'24%',marginLeft:'2%'}}
        variant='outlined'
        color='primary'
        onClick={close}>
        Close
      </Button>

      <center>
        <Typography style={{marginTop:'10px'}} variant="body2">
          Problem ID : {props.data.id}
        </Typography>
      </center>
        <Divider style={{marginTop:'10px'}}/>

    </div>
  )
}

export default Problem
