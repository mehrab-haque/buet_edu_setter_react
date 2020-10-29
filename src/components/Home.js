import React,{useState,useEffect} from 'react'
import * as firebase from 'firebase'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
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
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import Problem from './Problem'

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

const Home=props=>{

  const [notification,setNotification]=useState(false)
  const [message,setMessage]=useState('')
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profile,setProfile]=useState(null)
  const [problem,setProblem]=useState(null)
  const [problems,setProblems]=useState(null)

  const notify=message=>{
    setMessage(message)
    setNotification(true)
  }

  useEffect(() => {
    fetchProfile()
    fetchProblems()
 },[]);

 const fetchProfile=()=>{
   firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).onSnapshot(function(doc) {
       setProfile(doc.data())
   });
 }

 const fetchProblems=()=>{
   firebase.firestore().collection('problem').where('uid','==',firebase.auth().currentUser.uid).get().then(res=>{
     var arr=[]
     res.docs.map(doc=>{
       var data=doc.data()
       data['id']=doc.id
       arr.push(data)
     })
     setProblems(arr)
   })
 }

 const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>


      {profile==null?(
        <LinearProgress />
      ):(<div>
        <div className={classes.toolbar} />
          <center>
            <Avatar className={classes.orange} src={profile.image} style={{marginBottom:'20px',marginTop:'-20px',height:'80px',width:'80px'}} >{'name' in profile ? profile.name.substr(0,1):'N'}</Avatar>
            <Typography variant="h6" noWrap>
              {profile.name}
            </Typography>

            <Divider style={{marginTop:'20px'}}/>



            <Divider style={{marginTop:'20px'}}/>
            <Button onClick={()=>{firebase.auth().signOut()}} style={{marginTop:'20px'}} variant="contained" color="primary" >
              Logout
            </Button>


          </center>


        </div>
      )}


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const newProblem=()=>{
    var problemData={
      uid:firebase.auth().currentUser.uid,
      draft:true,
      timestamp:Date.now()
    }
    firebase.firestore().collection('problem').add(problemData).then(res=>{
      problemData['id']=res.id
      setProblem(problemData)
      notify('New Problem Created as Draft')
      fetchProblems()
    })
  }

  const closeProblem=()=>{
    setProblem(null)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={notification}
        onClose={()=>{setNotification(false)}}
        autoHideDuration={4000}
        message={message}
      />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{backgroundColor:'#0090ff'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Problem Setter Console
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {
          problem==null?(
            <div>
              <Button
                variant='outlined'
                color='primary'
                onClick={newProblem}
                fullWidth
                style={{marginBottom:'10px'}}>
                + Create New Problem
              </Button>
              {
                problems==null?(
                  <LinearProgress/>
                ):(
                  <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>
                    {
                      problems.map((problem,ind)=>{
                        return(
                          <Grid style={{height:'100%'}} item xs={6} md={4}>
                            <Card className={classes.root1} onClick={()=>{setProblem(problem)}}>
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
                                    </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        )
                      })
                    }
                  </Grid>
                )
              }
            </div>
          ):(
            <Problem data={problem} close={closeProblem} update={fetchProblems} notify={notify}/>
          )
        }
      </main>
    </div>
  );
}

export default Home
