import React,{useState,useEffect,useRef} from 'react'
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

import { Stage, Layer, Rect, Transformer ,Image} from 'react-konva'
import useImage from 'use-image';



import ProblemsList from './ProblemsList'
import Problem from './Problem'

const drawerWidth = 240;

class URLImage extends React.Component {
    state = {
        image: null
    };
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    render() {
        return (
            <Image
                draggable
                x={this.props.x}
                y={this.props.y}
                image={this.state.image}
                ref={node => {
                    this.imageNode = node;
                }}
            />
        );
    }
}

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <URLImage src="https://satellitedatanasa.s3.ap-south-1.amazonaws.com/countryFlag/america.png"
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

const initialRectangles = [
    {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'red',
        id: 'rect1',
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'green',
        id: 'rect2',
    },
];

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
  const [uid,setUid]=useState('self')
  const [users,setUsers]=useState(null)

  const [menu,setMenu]=useState(0)

  const problemsListRef=useRef()

  const notify=message=>{
    setMessage(message)
    setNotification(true)
  }

  useEffect(() => {
    fetchProfile()
 },[]);

 useEffect(()=>{
   if(menu==1)fetchUsers()
 },[menu])

 const fetchProfile=()=>{
   firebase.firestore().collection('profile').doc(firebase.auth().currentUser.uid).onSnapshot(function(doc) {
       setProfile(doc.data())
   });
 }

 const fetchUsers=()=>{
   firebase.firestore().collection('profile').get().then(res=>{
     var arr=[]
     res.docs.map(doc=>{
       if(doc.id!=firebase.auth().currentUser.uid){
        var data=doc.data()
        data['uid']=doc.id
        arr.push(data)
      }
     })
     setUsers(arr)
   })
 }

 const fetchProblems=()=>{
   problemsListRef.current.update()
 }

 const fetchProblemsWithUid=id=>{
   if(problemsListRef.current)problemsListRef.current.updateWithUid(id)
 }



 const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const homepage=()=>{
    if(problem!=null)
      setProblem(null)
    else{
      setUid('self')
      setMenu(0)
      fetchProblemsWithUid(firebase.auth().currentUser.uid)
    }
  }

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

            <ListItem selected={menu==0 && uid=='self'} onClick={homepage} button>
              <ListItemIcon><InboxIcon /> </ListItemIcon>
              <ListItemText primary={'My Works'} />
            </ListItem>

            <ListItem selected={menu==1 || (menu==0 && uid!='self')} onClick={()=>{if(problem==null)setMenu(1);else setProblem(null)}} button>
              <ListItemIcon><MailIcon /> </ListItemIcon>
              <ListItemText primary={'Other Setters'} />
            </ListItem>



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
      //fetchProblems()
    })
  }

  const closeProblem=()=>{
    setProblem(null)
  }

    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [selectedId, selectShape] = React.useState(null);

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };
/*
    return (
        <Stage
            width={500}
            height={500}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
        >
            <Layer>
                {rectangles.map((rect, i) => {
                    return (
                        <Rectangle
                            key={i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={(newAttrs) => {
                                const rects = rectangles.slice();
                                rects[i] = newAttrs;
                                setRectangles(rects);
                            }}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
*/
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
            {
              menu==0 && uid=='self'?(
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={newProblem}
                  fullWidth
                  style={{marginBottom:'10px'}}>
                  + Create New Problem
                </Button>
              ):(
                <div/>
              )
            }
              {
                menu==0?(
                  <ProblemsList setMenu={setMenu} uid={uid} load={setProblem} ref={problemsListRef}/>
                ):(
                  <div>
                    <ArrowBackIcon onClick={()=>{setMenu(0)}} style={{cursor:'pointer'}}/><br/><br/>
                    {
                      users==null?(
                        <LinearProgress/>
                      ):(
                        <div>
                          <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>
                            {
                              users.map((user,ind)=>{
                                return(
                                  <Grid style={{height:'100%'}} item xs={6} md={4}>
                                    <Card className={classes.root1} onClick={()=>{setUid(user.uid);setMenu(0);}}>
                                      <CardActionArea>

                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="h6">
                                              {user.name}
                                            </Typography><br/>
                                            <center>
                                              <Avatar className={classes.orange} src={user.image} style={{width:'70px',height:'70px'}}>
                                                {user.name.substr(0,1)}
                                              </Avatar>
                                            </center><br/><br/>
                                            <Typography gutterBottom variant="body2" component="body2">
                                              Joined On:
                                            </Typography><br/>

                                            <Typography gutterBottom variant="body2" component="body2">
                                              <font color='#888888'>
                                                {new Date(user.timestamp).toLocaleString()}
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
              }
            </div>
          ):(
            <Problem data={problem} uid={uid} close={closeProblem} update={fetchProblems} notify={notify}/>
          )
        }
      </main>
    </div>
  );
}

export default Home
