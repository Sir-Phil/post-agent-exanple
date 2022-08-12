import { Button, TextField, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/postMessage';
import useForm from './useForm';
import ButterToast, { Cinnamon } from 'butter-toast';
import { AssignmentTurnedIn } from '@material-ui/icons';

const initialFieldValues = {
    title: '',
    message: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),

        },
    },

    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    postBtn: {
        width: "50%"
    }
})



const PostMessageForm = ({ classes, ...seer }) => {

    useEffect(() => {
        if (seer.currentId !== 0){
            setValues({
                ...seer.postMessageList.find(x => x._id === seer.currentId)
            })
            setErrors({})
        }

    }, [seer.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? "" : "This Field is Required."
        temp.message = values.message ? "" : "This Field is Required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }


    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, seer.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Submitted Successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (seer.currentId === 0)
                seer.createPostMessage(values, onSuccess)
            else
                seer.updatePostMessage(seer.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit} >
            <TextField
                name="title"
                variant="outlined"
                label="Tilte"
                fullWidth
                value={values.title}
                onChange={handleInputChange}
                {...(errors.title && { error: true, helperText: errors.title })}
            />
            <TextField
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={values.message}
                onChange={handleInputChange}
                {...(errors.message && { error: true, helperText: errors.message })}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Submit</Button>
        </form>
    );
}

const mapStateToSeer = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToSeer = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update
}
export default connect(mapStateToSeer, mapActionToSeer)(withStyles(styles)(PostMessageForm));