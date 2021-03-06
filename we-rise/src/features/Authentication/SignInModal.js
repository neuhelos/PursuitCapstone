import React from 'react'
import { useHistory} from 'react-router-dom'
import { signIn } from '../../Utilities/firebaseFunctions'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../BaseComponents/loadingSlice'
import { finishLoading } from '../BaseComponents/loadingSlice'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import WeRiseLogo from '../../styling/Assets/Media/WeRiseLogo.png'

import { useInput } from '../../Utilities/CustomHookery'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        '& *': {
            fontFamily: 'audiowide',
            textAlign: 'center',
            outlineColor: '#36386D',
            border: 'none',
        },
    },
    input: {
        width: '100%',
        fontFamily: 'audiowide',
        marginBottom: theme.spacing(1)
    },
    container: {
        margin: theme.spacing(1)
    }
  }));

const SignInModal = ({toggleModal, toggleSignUpModal}) => {
    
    const classes = useStyles();

    const email = useInput("");
    const password = useInput("");
    
    const history = useHistory();
    const dispatch = useDispatch();

    const handleNewUser = () => {
        toggleModal()
        toggleSignUpModal()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(toggleLoading());
            await signIn(email.value, password.value)
            history.push("/CommunityDashboard")
            dispatch(finishLoading());

        }
        catch (err){
            console.log(err)
            alert(err.message)
        }
    }


    return (
        <form className={classes.root} onSubmit = {handleSubmit}>
            <Grid container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
                <img src={WeRiseLogo} alt={"WeRise Logo"}></img>
                <TextField className={classes.input} id="email" label="Email" placeholder="Enter Your Email" variant="filled" {...email} required/>
                <TextField className={classes.input} id="password" type="password" label="Password" placeholder="Enter Your Password" variant="filled" {...password} required/>
                <Grid className={classes.container} container display="flex" direction="row" justify="space-evenly" alignItems="center">
                    <Button variant="contained" color="primary" onClick={() => toggleModal()}> CANCEL </Button>
                    <Button variant="contained" color="primary" onClick={handleNewUser}> NEW USER? </Button>
                    <Button variant="contained" color="primary" type="submit"> SIGN IN </Button>

                </Grid>
            </Grid>
        </form>
    )
}

export default SignInModal;
