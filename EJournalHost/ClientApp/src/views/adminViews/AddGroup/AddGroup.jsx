import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSpecialitiesListActions from './reducer';
import * as getCuratorsListActions from './reducer';
import {
    TextField,
    FormHelperText
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/uk";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Growl } from 'primereact/growl';
import { MDBBtn } from "mdbreact";
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class addGroup extends Component {
    state = {
        success: false,
        failed: false,
        errors: {},
        name: '',
        dateFrom: null,
        dateTo: null,
        specialityId: 0,
        curatorId: ''
    };
    componentDidMount = () => {
        this.props.getSpecialities();
        this.props.getCurators();
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps !== this.props) {
            console.log("np: ", nextProps);
            this.setState({ success: nextProps.success, failed: nextProps.failed });
        }
    }
    handleDateFromChange = (date) => {
        if (!!this.state.errors['dateFrom']) {
            let errors = Object.assign({}, this.state.errors);
            delete errors['dateFrom'];
            this.setState(
                {
                    dateFrom: date,
                    errors
                }
            )
        }
        else {
            this.setState({ dateFrom: date });
        }
    };
    handleDateToChange = (date) => {
        if (!!this.state.errors['dateTo']) {
            let errors = Object.assign({}, this.state.errors);
            delete errors['dateTo'];
            this.setState(
                {
                    dateTo: date,
                    errors
                }
            )
        }
        else {
            this.setState({ dateTo: date });
        }
    };
    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }
    changeCurator = (event) => {
        const curatorId = event.target.value;
        this.setState({ curatorId: curatorId });
    }
    LoadResponceErrors() {
        const { success, failed } = this.state;
        const { messageResult, errors } = this.props;

        if (success == true && failed == false && typeof messageResult != 'object') {
            this.growl.show({ life: 6000, severity: 'success', summary: 'Success', detail: messageResult });
            this.setState({ success: false, failed: false });

        }
        if (success == false && failed == true) {
            this.growl.show({ life: 6000, severity: 'error', summary: 'Error', detail: errors });
            this.setState({ success: false, failed: false });
        }
    }
    LoadInputErrors(fieldName) {
        //console.log(fieldName,this.state.errors[fieldName]);
        if (typeof (this.state.errors.hasOwnProperty(fieldName))) {
            return (
                <FormHelperText error>{this.state.errors[fieldName]}</FormHelperText>
            )
        }
    }
    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        const { name, dateFrom, dateTo, specialityId, curatorId } = this.state;
        function pad(s) { return (s < 10) ? '0' + s : s; };
        let today = new Date();
        const nowDate = [pad(today.getDate()), pad(today.getMonth() + 1), today.getFullYear()].join('.');

        let dateT, dateF;
        if (name === '') errors.name = "Field is important";
        if (specialityId === 0) errors.specialityId = "This is important";


        if (!dateFrom) errors.dateFrom = "Field is empty";
        else {
            dateF = [pad(dateFrom.getDate()), pad(dateFrom.getMonth() + 1), dateFrom.getFullYear()].join('.');
            if (dateF >= nowDate) errors.dateFrom = "Field not in correct format";
        }

        if (!dateTo) errors.dateTo = "Field is empty";
        else {
            dateT = [pad(dateTo.getDate()), pad(dateTo.getMonth() + 1), dateTo.getFullYear()].join('.');
            if (dateT >= nowDate) errors.dateTo = "Field not in correct format";
        }

        const isValid = Object.keys(errors).length === 0
        if (isValid) {

            this.props.addGroup({
                name,
                specialityId,
                dateFrom: dateF,
                dateTo: dateT,
                teacherId: curatorId
            });

        }
        else {
            this.setState({ errors });
            console.log(errors);
        }
    }


    render() {

        const { specialities, curators } = this.props;
        return (
            <Paper elevation={7} className="p-3 mt-4" >
                <div>
                    <Grid container spacing={3} justify="center">
                        <Grid item lg={5} md={8} xs={12} >
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Ім'я"
                                name="name"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("name")}
                        </Grid>
                    </Grid>

                    <Grid justify="space-around" container spacing={3}>
                        <Grid item lg={3} md={6} xs={12} container justify="center">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    label="Початок навчання"
                                    format="dd/MM/yyyy"
                                    value={this.state.dateFrom}
                                    onChange={this.handleDateFromChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                            </MuiPickersUtilsProvider>
                            {this.LoadInputErrors("dateFrom")}
                        </Grid>
                        <Grid item lg={3} md={6} xs={12} container justify="center">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    label="Кінець навчання"
                                    format="dd/MM/yyyy"
                                    value={this.state.dateTo}
                                    onChange={this.handleDateToChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            {this.LoadInputErrors("dateTo")}
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} direction="row" alignItems="center" justify="space-evenly">
                        <Grid item lg={3} md={6} xs={12}>
                            {/* <Dropdown className="mt-2" value={this.state.groupId} options={groups} onChange={this.changeGroup} placeholder="Select a group" /> */}
                            <FormControl fullWidth>
                                <InputLabel id="slabel">Speciality</InputLabel>
                                <Select
                                    labelId="slabel"
                                    value={this.state.specialityId}
                                    onChange={this.handleChange}
                                    name="specialityId"
                                >
                                    {
                                        specialities.map(item => {
                                            return (
                                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            {this.LoadInputErrors("specialityId")}
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            {/* <Dropdown className="mt-2" value={this.state.groupId} options={groups} onChange={this.changeGroup} placeholder="Select a group" /> */}
                            <FormControl fullWidth>
                                <InputLabel id="clabel">Curatoor</InputLabel>
                                <Select
                                    labelId="clabel"
                                    value={this.state.curatorId}
                                    onChange={this.changeCurator}
                                >
                                    {
                                        curators.map(item => {
                                            return (
                                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} direction="column" alignItems="flex-end">
                        <Grid item xs>
                            <Growl className="mt-5" ref={(el) => this.growl = el} />
                            <MDBBtn onClick={this.onSubmit} className="mt-5 purple-gradient border-0 px-5 py-2" >
                                Додати
                            </MDBBtn>
                            {
                                this.LoadResponceErrors()
                            }
                        </Grid>
                    </Grid>
                </div>

            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        specialities: get(state, 'addGroup.list.specialities'),
        curators: get(state, 'addGroup.list.curators'),
        messageResult: get(state, 'addGroup.list.messageResult'),
        errors: get(state, 'addGroup.list.errors'),
        loading: get(state, 'addGroup.list.loading'),
        failed: get(state, 'addGroup.list.failed'),
        success: get(state, 'addGroup.list.success')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addGroup: model => {
            dispatch(getListActions.addGroup(model));
        },
        getSpecialities: () => {
            dispatch(getSpecialitiesListActions.getSpecialities());
        },
        getCurators: () => {
            dispatch(getCuratorsListActions.getCurators());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addGroup);