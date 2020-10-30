import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import * as firebase from 'firebase'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  root1:{
    height:'100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
  stepperRoot: {
    width: '100%',
  },
  canvasPaper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2,1),
  },
  root1:{
    height:'100%'
  },
  eliminationGrid : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

  const ProblemsList=forwardRef((props,ref)=>{



    useImperativeHandle(ref, () => ({
      update(){
        fetchProblems()
      },
      updateWithUid(uid){
        fetchProblemsWithUid(uid)
      }
   }));

  const classes = useStyles();

  const [problems,setProblems]=useState(null)

  const fetchProblems=()=>{
    firebase.firestore().collection('problem').where('uid','==',props.uid=='self'?firebase.auth().currentUser.uid:props.uid).orderBy('timestamp','desc').get().then(res=>{
      var arr=[]
      res.docs.map(doc=>{
        var data=doc.data()
        data['id']=doc.id
        arr.push(data)
      })
      setProblems(arr)
    })
  }

  const fetchProblemsWithUid=uid=>{
    setProblems(null)
    firebase.firestore().collection('problem').where('uid','==',uid).orderBy('timestamp','desc').get().then(res=>{
      var arr=[]
      res.docs.map(doc=>{
        var data=doc.data()
        data['id']=doc.id
        arr.push(data)
      })
      setProblems(arr)
    })
  }

  useEffect(() => {
    fetchProblems()
  },[]);

  return(
    <div>
      {
        problems==null?(
          <LinearProgress/>
        ):(
          <div>
            {
              props.uid!='self'?(
                <div>
                  <ArrowBackIcon onClick={()=>{props.setMenu(1)}} style={{cursor:'pointer'}}/><br/><br/>
                </div>
              ):(
                <div/>
              )
            }
            <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>
              {
                problems.map((problem,ind)=>{
                  return(
                    <Grid style={{height:'100%'}} item xs={6} md={4}>
                      <Card className={classes.root1} onClick={()=>{props.load(problem)}}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={problem.logo}
                            title="Problem Logo"
                          />
                          <CardContent>
                              <Typography gutterBottom variant="h6" component="h6">
                                {problem.title}
                              </Typography>
                              <Typography gutterBottom variant="body2" component="body2">
                                ID : {problem.id}
                              </Typography><br/>
                              <Typography gutterBottom variant="body2" component="body2">
                                {
                                  problem.draft?(
                                    <font color='#999900'>
                                      Draft
                                    </font>
                                  ):(
                                    <font color='#00aa00'>
                                      Submitted
                                    </font>
                                  )
                                }
                              </Typography><br/><br/>
                              <Typography gutterBottom variant="body2" component="body2">
                                <font color='#888888'>
                                  {new Date(problem.timestamp).toLocaleString()}
                                </font>
                              </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
          </div>
        )
      }
    </div>
  )
})

export default ProblemsList
