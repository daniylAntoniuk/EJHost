import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSpecialitiesListActions from './reducer';
import * as getCuratorsListActions from './reducer';
import * as getDeleteListActions from './reducer';
import * as getEditListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Growl } from 'primereact/growl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import './GetGroupsStyle.css';

class GetGroups extends Component {

    state = {
        specialityId: 0,
        openDialog: false,
        openRadioDialog: false,
        dialogChangeCompleted: false,
        changeTeacherId: '',
        changeGroupName: '',
        success: false,
        failed: false
    };
    componentWillReceiveProps = (nextProps) => {
        if (nextProps !== this.props) {
            console.log("np: ", nextProps);
            this.setState({ success: nextProps.success, failed: nextProps.failed });
        }
    }
    LoadServerErrors() {
        const { success, failed } = this.state;
        const { messageResult, errors } = this.props;

        if (success === true && failed === false && typeof messageResult != 'object') {
            this.growl.show({ life: 6000, severity: 'success', summary: 'Success', detail: messageResult });
            this.setState({ success: false, failed: false });

        }
        if (success === false && failed === true) {
            this.growl.show({ life: 6000, severity: 'error', summary: 'Error', detail: errors });
            this.setState({ success: false, failed: false });

        }

    }
    dialogClickOpen = () => {
        this.setState({ openDialog: true });
    }
    dialogCloseClick = () => {
        this.setState({ openDialog: false });
    }
    dialogSaveClick = (event) => {
        this.setState({ openDialog: false });
        const { changeGroupName, dialogChangeCompleted, changeTeacherId,specialityId } = this.state;
        console.log(changeGroupName, changeTeacherId);
        if (changeGroupName !== "" || (dialogChangeCompleted === true && changeTeacherId !== "")) {
            this.props.editGroup({
                groupId: event.currentTarget.value,
                groupName: changeGroupName,
                teacherId: changeTeacherId,
                specialityId:specialityId
            });
            //this.setState({ changeGroupName: '', dialogChangeCompleted: false, changeTeacherId: '' })
        }
    }
    radioDialogClickOpen = () => {
        this.setState({ openRadioDialog: true });
    }
    radioDialogSaveClick = () => {
        this.setState({ openRadioDialog: false, dialogChangeCompleted: true });
    }
    radioDialogExitClick = () => {
        this.setState({ openRadioDialog: false, dialogChangeCompleted: false });
    }
    teacherChanged = (event) => {
        this.setState({ changeTeacherId: event.target.value });
    }
    groupNameChanged = (event) => {
        this.setState({ changeGroupName: event.target.value });
    }
    deleteButtonClicked = (event) => {
        console.log(event.currentTarget.value);
        this.props.deleteGroup({ groupId: event.currentTarget.value });
    }

    mapCards(data, teachers) {
        if (data !== undefined && teachers !== undefined&&this.state.specialityId!==0) {
            return (
                data.map(item => {
                    return (
                        <Grid key={item.id} item lg={3} md={6} xs={12}>
                            <Growl className="mt-5" ref={(el) => this.growl = el} />
                            {this.LoadServerErrors()}
                            <Card>
                                <a className="aRedirect" href={"/#/admin/students/groupId=" + item.id}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography className="default-name" component="h2" variant="h2" >
                                                {item.name}
                                            </Typography>
                                            <Typography className="default-curator" component="h6" variant="h6">
                                                {item.nameOfCurator}
                                            </Typography>
                                            <Typography className="default-count" component="p" variant="subtitle2" >
                                                {item.countOfStudents} студентів
                                        </Typography>
                                            <Tooltip TransitionComponent={Zoom} title="Average marks" arrow>
                                                <Avatar className="badge">{item.averageMark}</Avatar>
                                            </Tooltip>
                                        </CardContent>
                                    </CardActionArea>
                                </a>
                                <CardActions>
                                    <Tooltip TransitionComponent={Zoom} title="Add student" arrow>
                                        <IconButton component={Link} to={"/admin/addstudent/groupId=" + item.id} aria-label="add student">
                                            <PlusOneIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip TransitionComponent={Zoom} title="Delete group" arrow>
                                        <IconButton value={item.id} onClick={this.deleteButtonClicked} aria-label="delete">
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip TransitionComponent={Zoom} title="Edit info" arrow>
                                        <IconButton value={item.id} onClick={this.dialogClickOpen} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Dialog
                                        open={this.state.openDialog}
                                        onClose={this.dialogCloseClick}
                                        aria-labelledby="responsive-dialog-title">
                                        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                                        <DialogContent>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <TextField className="textF" onChange={this.groupNameChanged} label="Змінити назву" variant="filled" />
                                                <TextField className="textF mt-3 mb-3" onClick={this.radioDialogClickOpen} defaultValue="Змінити вчителя" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Dialog
                                                disableBackdropClick
                                                disableEscapeKeyDown
                                                open={this.state.openRadioDialog}
                                                aria-labelledby="responsive-dialog-title">
                                                <DialogTitle id="responsive-dialog-title">{"Choose teacher"}</DialogTitle>
                                                <DialogContent>
                                                    <FormControl component="fieldset">
                                                        <RadioGroup value={this.state.changeTeacherId} onChange={this.teacherChanged}>
                                                            {
                                                                teachers.map(item => {
                                                                    return (
                                                                        <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                                                                    );
                                                                })
                                                            }
                                                        </RadioGroup>
                                                    </FormControl>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button autoFocus onClick={this.radioDialogExitClick} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={this.radioDialogSaveClick} color="primary" autoFocus>
                                                        Change
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={this.dialogCloseClick} color="primary">
                                                Exit
                                            </Button>
                                            <Button value={item.id} onClick={this.dialogSaveClick} color="primary" autoFocus>
                                                Save
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })
            );
        }
    }

    componentWillMount = () => {
        this.props.getSpecialities();
        console.log(this.props.specialities);
    }
    changeSpec = (event) => {
        const specialityId = event.target.value;
        this.setState({ specialityId: specialityId });
        this.props.getGroups({ specialityId: specialityId });
        this.props.getCurators();
    }
    render() {
        const { data, specialities, curators } = this.props;
        console.log("RENDER", data, specialities, curators);

        return (
            <React.Fragment>
                {/* <Dropdown className="mt-2" value={this.state.specialityId} options={specialities} onChange={this.changeSpec} placeholder="Select a speciality" /> */}
                <FormControl className="mt-2 selectW" >
                    <InputLabel id="slabel">Select a speciality</InputLabel>
                    <Select
                        labelId="slabel"
                        value={this.state.specialityId}
                        onChange={this.changeSpec}
                    >
                        {
                            specialities.map(item => {
                                return (
                                    <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Grid className="mt-3" container spacing={3}>
                    {this.mapCards(data, curators)}
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: get(state, 'getGroups.list.data'),
        specialities: get(state, 'getGroups.list.specialities'),
        curators: get(state, 'getGroups.list.curators'),
        loading: get(state, 'getGroups.list.loading'),
        failed: get(state, 'getGroups.list.failed'),
        success: get(state, 'getGroups.list.success'),
        messageResult: get(state, 'getGroups.list.messageResult'),
        errors: get(state, 'getGroups.list.errors'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: filter => {
            dispatch(getListActions.getGroups(filter));
        },
        getSpecialities: () => {
            dispatch(getSpecialitiesListActions.getSpecialities());
        },
        getCurators: () => {
            dispatch(getCuratorsListActions.getCurators());
        },
        deleteGroup: filter => {
            dispatch(getDeleteListActions.deleteGroup(filter));
        },
        editGroup: filter => {
            dispatch(getEditListActions.editGroup(filter));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetGroups);
