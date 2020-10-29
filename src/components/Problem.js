import React,{useState} from 'react'
import {Typography,Button,Divider,TextField,Select} from '@material-ui/core';
import MDEditor,{commands} from '@uiw/react-md-editor';
import AnsType from './AnsType'

const Problem=props=>{

  const [ansType,setAnsType]=useState('ansType' in props.data?props.data.ansType:0)
  const [interactiveType,setInteractiveType]=useState('interactiveType' in props.data?props.data.interactiveType:0)

  const handleAnsType=event=>{
    setAnsType(event.target.value)
  }

  const handleInteractiveType=event=>{
    setInteractiveType(event.target.value)
    setAnsType(0)
  }

  const close=()=>{
    props.close()
  }

  const [mdDescription,setMdDescription]=useState('description' in props.data?props.data.description:'')
  const [mdStatement,setMdStatement]=useState('statement' in props.data?props.data.statement:'')
  const [mdExplanation,setMdExplanation]=useState('explanation' in props.data?props.data.explanation:'')

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
        Submit
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
            Problem Description (Optional but recommended):
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

            <Divider style={{marginTop:'10px'}}/>
            <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
              Problem Statement (Be specific):
            </Typography>
            <MDEditor
              value={mdStatement}
              onChange={setMdStatement}
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

              <Divider style={{marginTop:'10px'}}/>

              <TextField
                variant='outlined'
                label='Restrictions (optional,delimit using |)'
                fullWidth
                style={{marginTop:'10px'}}
                multiline
                rows={3}
                variant='outlined'
                />

                <Divider style={{marginTop:'10px'}}/>

                <TextField
                  variant='outlined'
                  label='Tags (optional,delimit using |)'
                  fullWidth
                  style={{marginTop:'10px'}}
                  variant='outlined'
                  />

                <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                <Select value={interactiveType} onChange={handleInteractiveType} variant='outlined' native style = {{width: '24%',marginLeft:'1%'}}>
                    <option value={0}>Specify Interactive Type</option>
                    <option value={1}>None</option>
                  </Select>
                {
                  interactiveType>0?(
                    interactiveType==1?(
                      <Select value={ansType} onChange={handleAnsType} variant='outlined' native style = {{width: '24%',marginLeft:'1%'}}>
                          <option value={0}>Specify Answer Type</option>
                          <option value={1}>MCQ</option>
                          <option value={2}>Text</option>
                        </Select>
                    ):(
                      <Select value={ansType} onChange={handleAnsType} variant='outlined' native style = {{width: '24%',marginLeft:'1%'}}>
                          <option value={0}>Specify Answer Type</option>
                          <option value={1}>MCQ</option>
                          <option value={2}>Text</option>
                          <option value={3}>Interactive</option>
                        </Select>
                    )
                  ):(
                    <div/>
                  )
                }
                {
                  ansType>0?(
                    <div>
                      <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>
                      <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
                        Solution Arena:
                      </Typography>
                      <AnsType ansType={ansType} data={props.data}/>
                      <Divider style={{marginTop:'10px'}}/>
                      <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
                        Explanation :
                      </Typography>
                      <MDEditor
                        value={mdExplanation}
                        onChange={setMdExplanation}
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
                  ):(
                    <div/>
                  )
                }


    </div>
  )
}

export default Problem
