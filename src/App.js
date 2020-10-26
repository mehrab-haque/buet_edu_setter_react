import Reac, {useEffect,useState} from 'react'
import './firebase_config'
import * as firebase from 'firebase'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Home from './components/Home'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import {Dialog,DialogContent,Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

const App=props=>{

  const classes = useStyles();

  const [loading,setLoading]=useState(true)
  const [auth,setAuth]=useState(false)
  const [notification,setNotification]=useState(false)
  const [message,setMessage]=useState('')
  const [dialogState,setDialogState]=useState(1)

  const notify=message=>{
    setMessage(message)
    setNotification(true)
  }

  const checkAuth=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setAuth(true)
      } else {
        setAuth(false)
      }
      setLoading(false)
    });
  }

  const googleAuth=()=>{
    setLoading(true)
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      setLoading(false)
    }).catch(function(error) {
      setLoading(false)
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(error)
    });
  }

  useEffect(()=>{
    checkAuth()
  },[])

  if(!loading){
    if(auth)
      return (
        <Home/>
      )
    else {
      return(
        <div>
        <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogContent className={classes.root}>
              <Button color='primary' variant='outlined' onClick={googleAuth}>
                Login Using Google
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
  }else{
    return(
      <div  style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
        <Loader
           type="Bars"
           color="#0090ff"
           height={120}
           width={120}/>
      </div>
    )
  }
}

export default App;
