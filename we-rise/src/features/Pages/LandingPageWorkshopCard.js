import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper'

import { dateFormat } from '../../Utilities/dateFormat'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        },
    paperWrapper : {
        width: '25%',
        backgroundColor: '#282828',
        padding: theme.spacing(1),
        '&:hover': {
            border: '3px solid  #FF0F7B',
            cursor: 'pointer'
        },
        margin: theme.spacing(2)
    },
    paper: { 
        width: '100%',
        backgroundColor: '#666666',
        padding: theme.spacing(1),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {

    },
}));

const LandingPageWorkshopCard = ({workshop}) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let date = dateFormat(workshop.start_time).date
    let time = dateFormat(workshop.start_time).time

    return (

        <Paper  className={classes.paperWrapper}>
            <Paper className={classes.paper}>
                <Card className={classes.root}>
                    <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={workshop.user_pic} alt={workshop.firstn.toUpperCase()}>
                        </Avatar>
                    }
                    title={workshop.title}
                    subheader={
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
                    <CardActions disableSpacing>
                    <Typography>
                        Read More >
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography gutterBottom={true}>
                                Category: {workshop.category}
                            </Typography>
                            <Typography paragraph>
                                Description: {workshop.descriptions}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Paper>
        </Paper>
    );
}

export default LandingPageWorkshopCard 