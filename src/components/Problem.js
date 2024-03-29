import React, {useState, useRef, useEffect, forwardRef, useImperativeHandle, createRef} from 'react'
import {Typography,Button,Divider,TextField,Select} from '@material-ui/core';
import MDEditor,{commands} from '@uiw/react-md-editor';
import * as firebase from 'firebase'
import AnsType from './AnsType'
import Questionnaire from './Questionnaire'
import Latex from "react-latex";
import Grid from "@material-ui/core/Grid";
import {MathJax, MathJaxContext} from "better-react-mathjax";

const languages=[
  'English',
  'Bengali'
]

const Problem=props=>{

  const titleRef=useRef()
  const logoRef=useRef()
  const gradeRef=useRef()
  const catRef=useRef()
  const restrictionsRef=useRef()
  const tagsRef=useRef()

    const [latex,setLatex]=useState('latex' in props.data?props.data.latex:'')

    const handleLatexChange=e=>{
      setLatex(e.target.value)
    }

  const [loaded,setLoaded]=useState(false)

  const solRef=useRef()

  const questionnaireRef=useRef()

    const hintRef=useRef()

  const [ansType,setAnsType]=useState('ansType' in props.data?props.data.ansType:0)
  const [language,setLanguage]=useState('language' in props.data?props.data.language:0)
  const [interactiveType,setInteractiveType]=useState('interactiveType' in props.data?props.data.interactiveType:0)
  const [difficulty,setDifficulty]=useState('difficulty' in props.data?props.data.difficulty:0)

  useEffect(()=>{
     window.scrollTo(0,0)
     setLoaded(true)
  },[])

  const validateString=string=>{
    return !(string.trim().length==0)
  }

  const validateNumber=num=>{
    return num!=NaN && num>0
  }

  const validate=()=>{
    var title=titleRef.current.value
    var logo=logoRef.current.value
    var grade=parseInt(gradeRef.current.value)
    var cat=catRef.current.value
    var restrictions=restrictionsRef.current.value
    var tags=tagsRef.current.value

    if(!validateString(title)){
      window.alert('error : title')
      return false
    }
    if(!validateString(logo)){
      window.alert('error : logo')
      return false
    }
    if(!validateNumber(grade)){
      window.alert('error : grade')
      return false
    }
    // if(!validateNumber(difficulty)){
    //   window.alert('error : difficulty')
    //   return false
    // }
    if(!validateNumber(language)){
      window.alert('error : language')
      return false
    }
    if(!validateString(cat)){
      window.alert('error : category')
      return false
    }
    if(!validateString(mdStatement)){
      window.alert('error : problem statement')
      return false
    }
    if(!validateNumber(interactiveType)){
      window.alert('error : interactive type')
      return false
    }
    if(!validateString(mdExplanation)){
      window.alert('error : explanation')
      return false
    }
    if(!validateNumber(ansType)){
      window.alert('error : answer type')
      return false
    }
    if(!solRef.current.isValid()){
      window.alert('error : solution')
      return false
    }
    return true
  }

  const getData=()=>{
    var title=titleRef.current.value
    var logo=logoRef.current.value
    var grade=parseInt(gradeRef.current.value)
    var cat=catRef.current.value
    var restrictions=restrictionsRef.current.value
    var tags=tagsRef.current.value

    var data={}

    if(validateString(title))data['title']=title
    if(validateString(logo))data['logo']=logo
    if(validateNumber(grade))data['grade']=grade
    //if(validateNumber(difficulty))data['difficulty']=parseInt(difficulty)
    if(validateNumber(language))data['language']=parseInt(language)
    if(validateString(cat))data['cat']=cat
    if(validateString(mdDescription))data['description']=mdDescription
    if(validateString(mdStatement))data['statement']=mdStatement
    if(validateString(restrictions))data['restrictions']=parseDetails(restrictions)
    if(validateString(tags))data['tags']=parseDetails(tags)

      data['latex']=latex

      if(hintRef.current.getData().length>0)data['hint']=hintRef.current.getData()

    if(validateNumber(interactiveType)){
      data['interactiveType']=parseInt(interactiveType)
      if(validateString(mdExplanation))data['explanation']=mdExplanation
      if(validateNumber(ansType))data['ansType']=ansType
      //console.log(questionnaireRef.current.getData())
      if(interactiveType>1){
        if(questionnaireRef.current.getData()!=null)
          data['questionnaire']=JSON.stringify(questionnaireRef.current.getData())
      }
      if(solRef.current!=undefined){
        var solData=solRef.current.getData()
        if(ansType<3){
          Object.keys(solData).map(key=>{
            data[key]=solData[key]
          })
        }else{
          data['answer']=JSON.stringify(solData)
        }

      }
    }

    return data
  }

  const saveDraft=()=>{
    var data=getData()
    data['uid']=props.data.uid
    data['draft']=true
    data['timestamp']=Date.now()
    firebase.firestore().collection('problem').doc(props.data.id).set(data).then(res=>{
      props.notify("Draft Updated")
      //props.update()
    })
  }

  const submit=()=>{
    if(validate()){
      var data=getData()
      data['uid']=props.data.uid
      data['draft']=false
      data['timestamp']=Date.now()
        data['isPending']=true
      firebase.firestore().collection('problem').doc(props.data.id).update(data).then(res=>{
        props.notify("Problem Uploaded Successfully")
        //props.update()
        props.close()
      })
    }
  }

  const deleteProblem=()=>{
    firebase.firestore().collection('problem').doc(props.data.id).delete().then(res=>{
      props.notify('Draft Deleted')
      //props.update()
      props.close()
    })
  }

  const handleAnsType=event=>{
    var val=event.target.value
    if(val==3 && questionnaireRef.current.getData()==null)
      window.alert("Set the questionnaire properly")
    else
      setAnsType(event.target.value)
  }

  const handleInteractiveType=event=>{
    setInteractiveType(event.target.value)
    setAnsType(0)
  }

  const handleDifficulty=event=>{
    setDifficulty(event.target.value)
  }

  const handleLanguage=event=>{
    setLanguage(event.target.value)
  }

  const close=()=>{
    props.close()
  }

  const detailsString=data=>{
    var string=''
    data.map(entry=>{
      string+=entry+'|'
    })
    return string.substr(0,string.length-1)
  }

  const parseDetails=details=>{
    var output=[]
    var arr=details.split('|')
    arr.map(item=>{
      if(item.trim().length>0)
        output.push(item.trim())
    })
    return output
  }

  const [mdDescription,setMdDescription]=useState('description' in props.data?props.data.description:'')
  const [mdStatement,setMdStatement]=useState('statement' in props.data?props.data.statement:'')
  const [mdExplanation,setMdExplanation]=useState('explanation' in props.data?props.data.explanation:'')

    const [hintN,setHintN]=useState('hint' in props.data && Array.isArray(props.data.hint)?props.data.hint.length:0)


    const handleHintN=event=>{
        var val=parseInt(event.target.value)
        if(validateNumber(val))
            setHintN(val)
        else
            setHintN(0)
    }


    useEffect(()=>{
        var str=mdDescription
        str=str.replace("**","__")
        setMdDescription(str)
    },[mdDescription])

    useEffect(()=>{
        var str=mdStatement
        str=str.replace("**","__")
        setMdStatement(str)
    },[mdStatement])

    useEffect(()=>{
        var str=mdExplanation
        str=str.replace("**","__")
        setMdExplanation(str)
    },[mdExplanation])

  return(
    <div>
      <Button
        style={{width:'24%'}}
        variant='outlined'
        color='primary'
        onClick={saveDraft}
        disabled={!props.data.draft || props.data.uid!=firebase.auth().currentUser.uid}>
        Save Draft
      </Button>
      <Button
        style={{width:'24%',marginLeft:'1%'}}
        variant='outlined'
        onClick={submit}
        disabled={false/*props.data.uid!=firebase.auth().currentUser.uid*/}
        color='primary'>
        Submit
      </Button>
      <Button
        style={{width:'24%',marginLeft:'1%'}}
        variant='outlined'
        color='secondary'
        onClick={deleteProblem}
        disabled={!props.data.draft || props.data.uid!=firebase.auth().currentUser.uid}>
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
          defaultValue={props.data.title}
          inputRef={titleRef}
          label='Problem Title'
          />
          <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>
            <TextField
              variant='outlined'
              style={{width:'20%'}}
              label='Logo'
              inputRef={logoRef}
              defaultValue={props.data.logo}
              />
              <TextField
                variant='outlined'
                label='Grade'
                type='number'
                style={{marginLeft:'1%',width:'19%'}}
                variant='outlined'
                inputRef={gradeRef}
                defaultValue={props.data.grade}
                />
            <Select value={difficulty} onChange={handleDifficulty} variant='outlined' native style = {{width: '19%',marginLeft:'1%'}}>
                <option value={0}>Difficulty</option>
                <option value={1}>Easy</option>
                <option value={2}>Medium</option>
                <option value={3}>Hard</option>
              </Select>
            <Select value={language} onChange={handleLanguage} variant='outlined' native style = {{width: '19%',marginLeft:'1%'}}>
                <option value={0}>Language</option>
                {
                  languages.map((lang,ind)=>{
                    return(
                      <option value={(ind+1)}>{lang}</option>
                    )
                  })
                }
              </Select>
            <TextField
              variant='outlined'
              label='Categorization'
              style={{marginLeft:'1%',width:'19%'}}
              variant='outlined'
              inputRef={catRef}
              defaultValue={props.data.cat}
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
            LaTeX Description (Optional but recommended):
        </Typography>

        <Grid container spacing={1}>
            <Grid item xs={6}>
                <TextField
                    multiline
                    rows={16}
                    value={latex}
                    onChange={handleLatexChange}
                    fullWidth
                    variant={'outlined'}
                    />
            </Grid>
            <Grid item xs={6}>
                <MathJaxContext>
                    <MathJax>{latex}</MathJax>
                </MathJaxContext>
                {/*<Latex>{latex}</Latex>*/}
            </Grid>
        </Grid>





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
        <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
            Hint (Optional):
        </Typography>
        <TextField
            type='number'
            variant='outlined'
            value={hintN}
            label='n(hints)'
            style={{width:'10%',marginLeft:'1%'}}
            onChange={handleHintN}/>
      <Hint ref={hintRef} n={hintN} data={props.data}/>

              <Divider style={{marginTop:'10px'}}/>

              <TextField
                variant='outlined'
                label='Restrictions (optional,delimit using |)'
                fullWidth
                style={{marginTop:'10px'}}
                multiline
                rows={3}
                variant='outlined'
                inputRef={restrictionsRef}
                defaultValue={'restrictions' in props.data?detailsString(props.data.restrictions):''}
                />

                <Divider style={{marginTop:'10px'}}/>

                <TextField
                  variant='outlined'
                  label='Tags (optional,delimit using |)'
                  fullWidth
                  style={{marginTop:'10px'}}
                  variant='outlined'
                  inputRef={tagsRef}
                  defaultValue={'tags' in props.data?detailsString(props.data.tags):''}
                  />

                <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>

                <Select value={interactiveType} onChange={handleInteractiveType} variant='outlined' native style = {{width: '24%',marginLeft:'1%'}}>
                    <option value={0}>Specify Interactive Type</option>
                    <option value={1}>None</option>
                    <option value={2}>Exclusion Grid</option>
                    <option value={3}>Drag and drop</option>
                  <option value={4}>Grouping Containers</option>
                  <option value={5}>Rearranging</option>
                  <option value={6}>Matchsticks</option>
                  <option value={7}>Venn</option>
                    <option value={8}>Drag and drop grid</option>
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
                  interactiveType>1?(
                    <div>
                      <Divider style={{marginTop:'10px',marginBottom:'10px'}}/>
                      <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
                        Questionnaire Arena:
                      </Typography>
                      <Questionnaire questionnaire={'questionnaire' in props.data?JSON.parse(props.data.questionnaire):null} ref={questionnaireRef} interactiveType={interactiveType}/>
                    </div>
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
                      <AnsType loaded={loaded} ref={solRef} questionnaire={questionnaireRef.current!=undefined?JSON.parse(JSON.stringify(questionnaireRef.current.getData())):null} ansType={ansType} interactiveType={interactiveType} data={props.data}/>
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

const Hint=forwardRef((props,ref)=>{


    var hints=[]
    if('hint' in props.data && Array.isArray(props.data.hint))
        props.data.hint.map(hint=>{
            hints.push(hint)
        })

    const [data,setData]=useState(hints)

    var hintRefs=[]

    Array(props.n).fill().map((_, i) => {
        hintRefs.push(createRef())
    })

    const setHint=(hint,index)=>{
        var tmp=data
        tmp[index]=hint
        setData(tmp)
    }

    useImperativeHandle(ref, () => ({
        getData(){
            var out=[]
            data.map(hint=>{
                if(hint.length>0)
                    out.push(hint)
            })
            return out
        }
    }));

    return(
        <div>
            {
                Array(props.n).fill().map((_,i)=>{
                    return (
                        <div>
                            <Typography style={{marginTop:'10px',marginBottom:'10px'}} variant="body2">
                                Hint - {(i+1)} :
                            </Typography>
                            <MDEditor
                                value={i<data.length?data[i]:''}
                                onChange={hint=>{setHint(hint,i)}}
                                height='300'
                                style={{marginTop:'10px'}}
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
                })
            }
        </div>

    )
})

export default Problem
