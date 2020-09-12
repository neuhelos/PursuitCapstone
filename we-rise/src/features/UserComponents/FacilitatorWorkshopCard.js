import React, {useState} from 'react';
import FacilitatorModal from './FacilitatorModal'

import { useHistory} from 'react-router-dom'
import { DateTime } from 'luxon'

import { dateFormat } from '../../Utilities/dateFormat'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Paper from '@material-ui/core/Paper'
import Modal from '../BaseComponents/Modal'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        width: '60%'
    },
    media: {
        width: '40%',
        //paddingTop: '56.25%', // 16:9
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    text: {
        fontFamily:'audiowide'
    },
    paper: {
        width: '100%',
        backgroundColor: '#666666',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        '&:hover': {
            cursor: 'pointer',
            border: '2px solid  #FF0F7B'
        }
    }
    }));

const FacilitatorWorkshopCard = ( { workshop } ) => {
    
    let date = dateFormat(workshop.start_time).date
    let time = dateFormat(workshop.start_time).time

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }


    
    const classes = useStyles();
    return (
        
        <Paper  className={classes.paper}>
            <Card className={classes.root} onClick={toggleModal}>
                <CardHeader
                className={classes.header}
                title= {
                    <Typography className={classes.text}>{workshop.title}</Typography>
                }
                subheader = {
                    <>
                    <Typography className={classes.text}>{`${date}`}</Typography>
                    <Typography className={classes.text}>{`${time}`}</Typography>
                    </>
                }
                />
                <CardMedia
                className={classes.media}
                image={workshop.workshop_img}
                title={workshop.title}
                />
            </Card>

            <Modal open={open} toggleModal={toggleModal}>
                {/* <WorkshopRegistration handleCloseModal={toggleModal} {...workshop} /> */}
                <FacilitatorModal handleCloseModal={toggleModal} workshop={workshop}/>
            </Modal>

        </Paper>
    );
}

export default FacilitatorWorkshopCard;
