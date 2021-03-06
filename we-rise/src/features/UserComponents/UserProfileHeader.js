import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { fetchUserById } from "../../Utilities/FetchFunctions";

import Modal from '../BaseComponents/Modal'
import EditUserModal from "./EditUserModal";
import axios from "axios";
import {apiURL} from '../../Utilities/apiURL'
import Button from '@material-ui/core/Button';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import WeRiseTogether from '../../styling/Assets/Media/WeRiseTogetherProfileHeader.gif'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),

    '& *': {
        fontFamily: 'audiowide',
        outlineColor: '#36386D',
    },
  },
  paperWrapper: {
    width: '100%',
    padding: theme.spacing(1),
    background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
  },
  paper: {
    backgroundImage: `url(${WeRiseTogether})`,
    backgroundPosition: 'center',
    backgroundSize: '40%'
  },
  opacity: {
    backgroundColor: 'rgba(255,255,255,0.75)'
  },
  text: {
    color: "black",
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: theme.spacing(1),
    border: '4px solid  #F89B29',
  },
  icon : {
    color: '#FF0F7B',
    '&:hover': {
      color: '#F89B29',
      cursor: 'pointer'
    },
  },
}));
const FetchUser = () => {
  
  const currentUser = useSelector((state) => state.currentUserSession);
  
  const params = useParams();
  let user_id = params.id;
  
  const classes = useStyles();
  
  const [profile, setProfile] = useState(null)
  const [firstn, setFirstn] = useState("");
  const [lastn, setLastn] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");

  const [facebook, setFacebook] = useState("")
  const [instagram, seInstagram] = useState("")
  const [twitter, setTwitter] = useState("")
  const [linkedin, setLinkedin] = useState("")

  const [skills, setSkills] = useState([])

  

  const fetchUser = async () => {
    let res = await fetchUserById(user_id);
    setProfile(res)
    setFirstn(res.firstn);
    setLastn(res.lastn);
    setEmail(res.email);
    setBio(res.bio);
    setPic(res.user_pic);
  };

  const fetchUserSkills = async () => {
    let res = await axios.get(`${apiURL()}/usersSkills/${user_id}`)
    setSkills(res.data.payload)
  }

  useEffect(() => {
    fetchUser();
    fetchUserSkills()
  }, [user_id]);

  const [open, setOpen] = useState(false);
  const toggleModal = () => {
      setOpen(!open)
  }

  const usersSkills = skills.map(skill => skill.skills).join(' | ')

  return (

      <Paper className={classes.paperWrapper}>
          <Paper className={classes.paper}>
            <Paper className={classes.opacity}>
              <Grid className={classes.root}  container direction="row" justify="center" alignItems="center">
                <Grid container item direction="row" justify="flex-start" alignItems="center" xs={5}>
                  <Avatar aria-label="user" className={classes.avatar} src={pic} />
                  <Grid container display="flex" direction='column' justify="center" alignItems="flex-start" style={{width: 'auto'}}>
                    <Typography variant='h5' gutterBottom={true}>{firstn} {lastn}</Typography>
                    <Grid container display="flex" direction="row" justify="flex-start" alignItems="center" style={{width: 'auto'}}>
                      <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
                        <InstagramIcon className={classes.icon} fontSize='large'/>
			                </a>
                      <a href={`https://www.facebook.com/${facebook}`} target="_blank" rel="noopener noreferrer">
                        <FacebookIcon className={classes.icon} fontSize='large'/>
			                </a>
                      <a href={`https://www.twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon className={classes.icon} fontSize='large'/>
			                </a>
                      <a href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon className={classes.icon} fontSize='large'/>
			                </a>
                    </Grid>
                    {user_id === currentUser.uid ? 
                      <Button variant="contained" color="disabled" type="submit" onClick = {toggleModal}>Edit Your Profile</Button> 
                      : <Button variant="contained" color="primary" type="submit">Contact Me</Button>}
                  </Grid>
                </Grid>
                <Grid container item direction="column" justify="center" alignItems="flex-start" xs={7}>
                  <Typography variant='h6' className={classes.text} gutterBottom={true}>Bio</Typography>
                  <Typography variant='subtitle1' className={classes.text} gutterBottom={true}>{bio}</Typography>
                  <Typography variant='h6' className={classes.text} gutterBottom={true}>Skills</Typography>
                  <Typography variant='subtitle1' className={classes.text} gutterBottom={true}>{usersSkills}</Typography>
                </Grid>
              </Grid>
            </Paper>
        </Paper>

            <Modal open={open} toggleModal={toggleModal}>
                <EditUserModal handleCloseModal={toggleModal} currentUser={currentUser}/>
            </Modal>


      </Paper>
  );
};
export default FetchUser;
