import { React, Fragment } from 'react'
import { Avatar, Button, Grid, TextField, Box } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Form, Formik, Field, ErrorMessage } from 'formik';

import axios from 'axios';
import { useState } from 'react';
import Snack from './Snackbar';

import { useHistory } from 'react-router-dom';
import UploadImage from "./Uploadimages";
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


const Add_Event = (props) => {
   
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '' }
   
    const formStyle = { textAlign: 'center' }
    const marginTop = { marginTop: '10px', marginBottom: '10px' }
    const initialValues = {
        name: '',
        event_type: '',
        description: '',
        venue: '',
        start_time: '',
        end_time: ''
    }

    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
    const [imgdialog, setImgdialog] = useState({ isOp: false });
    const { add, setAdd } = props;
  

    let history = useHistory();

    const handleClose = () => {
        setAdd({
            open: false
        });

    };
    const onSubmit = (values, props) => {
       
        const Event = {
            name: values.eventName,
            event_type: values.eventType,
            description: values.eventDescription,
            venue: values.eventVenue,
            start_time: values.startTime,
            end_time: values.endTime
        }

        console.log(Event)
        axios.post("http://localhost:8081/account/admin/addEvents", Event)
            .then((response) => {
                var resp = response.status;
                console.log(response.data);
               
                localStorage.setItem('feventid', JSON.stringify(response.data.event_id));
                console.log(response.status)
                if (resp === 200) {
                    setSuccess(true);
                    setMesg(response.data.message);
                    setOpen(true);
                    setNotify({
                        isOpen: true,
                        mesg: "Event Added Successfully!"
                    })

                    setImgdialog({
                        isOp: true

                    })


                }
            })

            .catch((error) => {
                if (error.status.response === 400) {
                    console.log(error.response.data.message);
                    
                    setOpen(true);
                    setMesg(error.response.data.message);
                    setNotify({
                        isOpen: true,
                        mesg: "Event Already Exist!"
                    })
                    props.resetForm()
                }
                else {
                   
                    setOpen(true);
                    setMesg("Something went wrong");
                    setNotify({
                        isOpen: true,
                        mesg: "Something went wrong!"
                    })
                    console.log(error)
                }
            });


    }



    const eventSchema = Yup.object().shape({
        eventName: Yup.string()
            .matches(/[a-zA-Z][a-zA-Z\s]+/, "Event Name must be alphabetical..")
            .required,
        eventType: Yup.string().required,
        eventDescription: Yup.string().required,
        eventVenue: Yup.string().required
    });



    return (
        // <Grid>
        <Fragment>
            <Dialog
                fullWidth={true}

                open={add.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >    <center>
                    <DialogTitle id="past-event-dialog-title">Add Events</DialogTitle>
                   
                    <DialogContent >
                        <Box mr={10}>
                           

                            <Formik initialValues={initialValues} eventSchema={eventSchema} onSubmit={onSubmit}>

                                {(props) => (
                                    <Form style={formStyle}>

                                        <div class="container">
                                            <Grid container spacing={3}>

                                                <Grid item xs={6} sm={6}>

                                                    <Field as={TextField} variant='outlined' fullWidth label='Name' name='eventName' value={props.values.eventName}
                                                        required error={props.errors.eventName && props.touched.eventName}
                                                        onInput={props.handleChange}
                                                        pattern="[Aa-Zz]"
                                                        helperText={<ErrorMessage name='eventName' />}
                                                        onChange={props.handleChange} placeholder="Enter the name of event" required />
                                                </Grid>

                                                <Grid item xs={6}>

                                                    <Field as={TextField} variant='outlined' fullWidth label='Type' name='eventType' value={props.values.eventType}
                                                        onChange={props.handleChange} placeholder="Enter the type of Event" required />


                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field as={TextField} variant='outlined' id="standard-textarea" fullWidth label='Description' name='eventDescription' value={props.values.eventDescription}
                                                        onChange={props.handleChange} placeholder="Enter the Description of Event" multiline required />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field as={TextField} variant='outlined' fullWidth label='Venue' name='eventVenue' value={props.values.eventVenue}
                                                        onChange={props.handleChange} placeholder="Enter the Venue of Event" required />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field as={TextField} variant='outlined' fullWidth label='Start Date and Time' name='startTime' value={props.values.startTime}
                                                        id="datetime-local" type="datetime-local" defaultValue="Default Value"
                                                        defaultValue="2021-08-24T10:30" min="2021-08-24"

                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}

                                                        onChange={props.handleChange} placeholder="Enter the start time" required />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field as={TextField} variant='outlined' fullWidth label='End Date and Time' name='endTime' value={props.values.endTime}
                                                        id="datetime-local" type="datetime-local" defaultValue="Default Value"
                                                        defaultValue="2021-08-24T10:30" min="today"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}

                                                        onChange={props.handleChange} placeholder="Enter the end time" required />

                                                </Grid>


                                            </Grid>

                                        </div>
                                        <Grid container justify="flex-end">
                                           
                                            <Button type='submit' color='primary'  disabled={props.isSubmitting}
                                                style={marginTop} >{props.isSubmitting ? "Loading" : "Create"}</Button>&nbsp;&nbsp;&nbsp;
                                            <Button onClick={handleClose} color="primary" >
                                               Close
                                            </Button>
                                        </Grid>

                                    </Form>
                                )}
                            </Formik>
                           </Box>
                    </DialogContent>
                </center>
               
                <Snack
                    notify={notify}
                    setNotify={setNotify}
                />
                <UploadImage imgdialog={imgdialog}
                    setImgdialog={setImgdialog} />

               
            </Dialog>
        </Fragment>
    )
}


export default Add_Event;
