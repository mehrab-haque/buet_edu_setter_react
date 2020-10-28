import React,{useState} from 'react'
import {Typography,Button,Divider,TextField,Select} from '@material-ui/core';
import MDEditor,{commands} from '@uiw/react-md-editor';

const Problem=props=>{

  const close=()=>{
    props.close()
  }

  const [mdDescription,setMdDescription]=useState('description' in props.data?props.data.description:'')

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

        <TextField
          variant='outlined'
          fullWidth
          label='Problem Title'
          />
          <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>
            <TextField
              variant='outlined'
              style={{width:'25%'}}
              label='Logo'
              />
              <TextField
                variant='outlined'
                label='Grade'
                type='number'
                style={{marginLeft:'1%',width:'24%'}}
                variant='outlined'
                />
            <Select variant='outlined' native style = {{width: '24%',marginLeft:'1%'}}>
                <option value={0}>Difficulty</option>
                <option value={1}>Easy</option>
                <option value={2}>Medium</option>
                <option value={3}>Hard</option>
              </Select>
            <TextField
              variant='outlined'
              label='Categorization'
              style={{marginLeft:'1%',width:'24%'}}
              variant='outlined'
              />
          <Divider style={{marginTop:'10px'}}/>
          <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
            Problem Description:
          </Typography>
          <MDEditor
            value={mdDescription}
            onChange={setMdDescription}
            height='300'
            commands={[
              commands.title,
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.orderedListCommand,
              commands.unorderedListCommand,
              commands.code,
              commands.image,
              commands.link,
              commands.quote,
              commands.divider,
              commands.codeEdit,
              commands.codeLive,
              commands.codePreview
            ]}

            />

    </div>
  )
}

export default Problem
