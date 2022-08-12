import { Button, Divider, Grid, List, ListItem, ListItemText, Paper, Typography, withStyles } from '@material-ui/core';
import React, {useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux'; 
import * as actions from '../actions/postMessage';
import PostMessageForm from './PostMessageForm';
import ButterToast, { Cinnamon } from 'butter-toast';
import { DeleteSweep } from '@material-ui/icons';



const styles = theme  => ({
    paper : {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    alignDiv: {
        textAlign: "center",
    }
})

//seer.classes.paper
const PostMessages = ({classes, ...seer}) => {
    //const {classess, ...seer} = seer
    //const [x, setX] = useState(0)
    //setX(5)
    const [currentId, setCurrentId ] = useState(0)

    useEffect(() => {
        seer.fetchAllPostMessages()
    }, [])// didmount in class base

 const onDelete = id => {
     const onSuccess = () => {
         ButterToast.raise({
             content: <Cinnamon.Crisp title="Post Box"
                 content="Deleted Successfully"
                 scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                 icon={<DeleteSweep />}
             />
         })
     }

    if(window.confirm('Are you sure to delete this record?'))
    seer.deletePostMessage(id, onSuccess)
 }    


    return(
        <Grid container>
            <Grid item xs="5">
                <Paper className={classes.paper}>
                <PostMessageForm {...{currentId, setCurrentId}} />
                </Paper>
            </Grid>
            <Grid item xs="7">
                <Paper className={classes.paper}>
                    <List>
                        {
                            seer.postMessageList.map((record, index) => {
                                return(
                                    <Fragment key={index}>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="h5">
                                                {record.title}
                                            </Typography>
                                            <div>
                                                {record.message}
                                            </div>
                                            <div className={classes.alignDiv}>
                                                <Button variant="contained" color="primary" size="small" className={classes.smMargin} 
                                                onClick={()=>setCurrentId(record._id)}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained" color="secondary" size="small" className={classes.smMargin}
                                                onClick={()=> onDelete(record._id)}>
                                                    Delete 
                                                </Button>
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                    <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

const mapStateToSeer = state => ({
    postMessageList : state.postMessage.list
})

const mapActionToSeer = {
    fetchAllPostMessages : actions.fetchAll,
    deletePostMessage: actions.Delete
}

export default connect(mapStateToSeer, mapActionToSeer) (withStyles(styles) (PostMessages));