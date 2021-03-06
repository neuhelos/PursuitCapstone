import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'

import { DateRange } from 'react-date-range';
import Grid from '@material-ui/core/Grid'
import Modal from '../BaseComponents/Modal'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography'

import { categories } from '../BaseComponents/WorkshopCategories'



const useStyles = makeStyles((theme) => ({
    root: {
        '& *': {
            fontFamily: 'audiowide'
        },
        outline: 'none',
        width: '100%',
    },
    button: {
        fontFamily: 'audiowide',
        width: '50%',
        height: '3rem',
        marginRight: theme.spacing(1),
        background: '#36386D'
    },
    select: {
        height: '3rem',
        margin: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: '4px',
        width: '50%',
    },
    dateRange: {
        margin: theme.spacing(1),
        width: '100%',
        '& .rdrMonth': {
            width: '100%',
        },
        '& *': {
            fontFamily: 'audiowide'
        },
    },
    text: {
        '& *': {
                fontFamily: 'audiowide'
            },
        // display: 'block',
        // width: '25rem',
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap',
    }
}))

const WorkshopFilterBar = ({dateRange, handleDateChange, selectCategories, handleSelectChange, buttonLabelChange, selectAllCategories, clearSelectCategories }) => {

    const classes = useStyles()

    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenu(true)
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = (event) => {
        setOpenMenu(false)
        event.stopPropagation()
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 350,
            }
        },
        open: openMenu,
        onClose: handleCloseMenu,
        anchorEl: anchorEl,
        anchorOrigin: { vertical: 'top', horizontal: 'left'},
        getContentAnchorEl: null
    }

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }

    const dateConverter = (date) => {
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        return `${month+1}-${day}-${year}`
    }

    const buttonDateRangeLabel = !buttonLabelChange ? 
        "SELECT DATES" :
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" wrap='nowrap'>
            <Typography variant="body1">{dateConverter(dateRange[0].startDate)} thru </Typography>
            <Typography variant="body1">{dateConverter(dateRange[0].endDate)}</Typography>
        </Grid>

    return (
        <>

        <Grid className={classes.root} container display="flex" direction="row" justify="center" alignItems="center" wrap='nowrap'>
            <Button className={classes.button} variant="contained" color="primary" onClick={toggleModal} size='small'>{buttonDateRangeLabel}</Button>
            <Select
                className={classes.select}
                id="multiple-select-categories"
                displayEmpty
                multiple
                value={selectCategories}
                onChange={handleSelectChange}
                onClick={handleOpenMenu}
                input={<Input style={{fontSize: '0.8125rem', textAlign: 'center'}}/>}
                renderValue={(selected) => 
                        {  
                            
                            return selected.length > 1 ? "Multiple" : selected.length === 1 ? `${selected[0].slice(0,15)}...` : "CATEGORIES" 
                        }
                        }
                MenuProps={MenuProps}
                >
                    <MenuItem value="CATEGORIES">
                        <Grid className={classes.dateRange} container display="flex" direction="row" justify="space-around" alignItems="center" wrap='nowrap'>
                            <Button variant="contained" color="primary" onClick={selectAllCategories} size='small'>All</Button>
                            <Button variant="contained" color="primary" onClick={clearSelectCategories} size='small'>Clear</Button>
                            <Button variant="contained" color="primary" onClick={handleCloseMenu} size='small'>Select</Button>
                        </Grid>
                    </MenuItem>
                    <MenuItem value="" disabled className={classes.text}>Categories</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            <Checkbox checked={ selectCategories.indexOf(category) > -1  }/>
                            <ListItemText primary={category} className={classes.text}/>
                        </MenuItem>
                    ))}
            </Select>
        </Grid>
        
        <Modal open={open}>
            <Grid className={classes.root} container display="flex" direction="column" justify="space-evenly" alignItems="center" wrap='nowrap'>
                <DateRange
                    className={classes.dateRange}
                    style={{classes: {rdrMonth: {width: '100%'}}}}
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    handleCloseModal={toggleModal}
                    minDate={new Date()}
                    shownDate={new Date()}
                    scroll={{ enabled: true }}
                    startDatePlaceholder="Start Date"
                    endDatePlaceholder="End Date"
                    color="#FF0F7B"
                />
                <Button className={classes.button} variant="contained" color="primary" onClick={toggleModal} size='small'>SELECT</Button>
            </Grid>
        </Modal>
        </>
    )
}

export default WorkshopFilterBar;