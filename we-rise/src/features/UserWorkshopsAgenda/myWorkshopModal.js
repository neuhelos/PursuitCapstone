import React, { useState } from 'react'
import  { useDispatch } from 'react-redux'
import axios from 'axios'
import { dateFormat } from '../../Utilities/dateFormat'
import { useHistory} from 'react-router-dom'
import { apiURL } from '../../Utilities/apiURL'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

import { deleteRegistration } from './RegisterWorkshopSlice'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            textAlign: 'center',
            outlineColor: '#36386D',
            border: 'none',
            margin: theme.spacing(1)
        },
    },
    image : {
        width:'50%',
        height: '50%'
    }
}))


const MyWorkshopModal = ({ handleCloseModal, workshop }) => {

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    let date = dateFormat(workshop.start_time).date
    let time = dateFormat(workshop.start_time).time

  const workshopImage = workshop.workshop_img

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            <Typography variant='h4'>{workshop.title}</Typography>
            <Typography variant='h6'>Facilitator: {`${workshop.firstn} ${workshop.lastn}`}</Typography>
            <Typography variant='body1'>Description: {workshop.descriptions}</Typography>
            <img className={classes.image} src={workshopImage} alt="workshop.title"/>
            <Grid className={classes.root} container display="flex" direction="row" justify="space-evenly" alignItems="center">
                { new Date() >= new Date(workshop.start_time) - 6.048e+8 ? <Button variant="contained" color="primary" type="submit" onClick = {() => history.push(`/videoConference/${workshop.user_id}${workshop.workshop_id}`)}>Join VideoChat</Button> : null}
                <Button variant="contained" color="primary" onClick={handleCloseModal}>Close</Button>
                <Button variant="contained" color="primary" type="submit" onClick = {() => dispatch(deleteRegistration(workshop.id))}>Unregister</Button> 
            </Grid>
        </Grid>
    )
}

export default MyWorkshopModal;

