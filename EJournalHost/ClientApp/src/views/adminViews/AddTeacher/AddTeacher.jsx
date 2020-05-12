import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getListActionsRoles from './reducer';
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
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Growl } from 'primereact/growl';
import { MDBBtn } from "mdbreact";
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

class addTeacher extends Component {
    state = {
        success: false,
        failed: false,
        selectedRoles: [],
        errors: {},
        dateOfBirth: null,
        name: '',
        lastName: '',
        surname: '',
        adress: '',
        email: '',
        phoneNumber: '',
        passportString: '',
        //degree:'',
        identificationCode: ''
    };

    mapToSelect = (data) => {
        if (data != undefined) {
            //console.log(this.state.selectedRoles);
            return data.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                    <Checkbox checked={this.state.selectedRoles.indexOf(role.value) > -1} />
                    <ListItemText primary={role.label} />
                </MenuItem>
            ));
        }
    }
    componentDidMount = () => {
        this.props.getRoles();
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps !== this.props) {
            console.log("np: ", nextProps);
            this.setState({ success: nextProps.success, failed: nextProps.failed });
        }
    }
    handleSelectChange = (event) => {
        this.setState({ selectedRoles: event.target.value });
    };
    handleDateChange = (date) => {
        if (!!this.state.errors['dateOfBirth']) {
            let errors = Object.assign({}, this.state.errors);
            delete errors['dateOfBirth'];
            this.setState(
                {
                    dateOfBirth: date,
                    errors
                }
            )
        }
        else {
            this.setState({ dateOfBirth: date });
        }
    };
    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }
    LoadResponceErrors() {
        const { success, failed } = this.state;

        if (success == true && failed == false) {
            this.growl.show({ life: 6000, severity: 'success', summary: 'Successfully added', detail: 'Add student' });
            this.setState({ success: false, failed: false });

        }
        if (success == false && failed == true) {
            this.growl.show({ life: 6000, severity: 'error', summary: 'Error', detail: 'Registration student failed' });
            this.setState({ success: false, failed: false });
        }
    }
    LoadInputErrors(fieldName) {
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
        const { name, surname, lastName, adress, email, phoneNumber, passportString, identificationCode, dateOfBirth, selectedRoles } = this.state;
        //const degree
        function pad(s) { return (s < 10) ? '0' + s : s; };
        let today = new Date();
        const nowDate = [pad(today.getDate()), pad(today.getMonth() + 1), today.getFullYear()].join('.');
        const regex_phone = /\(\+38\)\d{3} \d{3} \d{2} \d{2}/;
        let birthDate;
        
        if (name === '') errors.name = "Field is important";
        if (surname === '') errors.surname = "Field is important";
        if (lastName === '') errors.lastName = "Field is important";
        if (adress === '') errors.adress = "Field is important";
        if (!dateOfBirth) errors.dateOfBirth = "Field is empty";
        else {
            birthDate = [pad(dateOfBirth.getDate()), pad(dateOfBirth.getMonth() + 1), dateOfBirth.getFullYear()].join('.');
            if (birthDate >= nowDate) errors.dateOfBirth = "Field not in correct format";
        }
        if (email === '') errors.email = "Field is important";
        if (phoneNumber === '') errors.phoneNumber = "Field is important";
        if (!regex_phone.test(phoneNumber)) errors.phoneNumber = "Please fill all number";
        if (passportString === '') errors.passportString = "Field is important";
        if (identificationCode === '') errors.identificationCode = "Field is important";

        const isValid = Object.keys(errors).length === 0
        if (isValid) {

            this.props.addTeacher({
                name,
                lastName,
                surname,
                adress,
                email,
                phoneNumber,
                passportString,
                identificationCode,
                dateOfBirth: birthDate,
                rolename: selectedRoles,
                groupId:0,
                //degree: degree
            });

        }
        else {
            this.setState({ errors });
        }
    }


    render() {
        // console.log("s ", this.state.success, " f ", this.state.failed);
        //console.log("rl", this.props.roles);
        const { roles } = this.props;
        return (
            <Paper elevation={7} className="p-3 mt-4">
                <div>
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <FormControl style={{ width: "250px" }} className="pr-2" >
                                <InputLabel id="checkbox-label">Оберіть ролі</InputLabel>
                                <Select
                                    labelId="checkbox-label"
                                    multiple
                                    value={this.state.selectedRoles}
                                    onChange={this.handleSelectChange}
                                    input={<Input />}
                                    renderValue={(selected) => (roles.filter(x => selected.some(s => s == x.value)).map(x => x.label)).join(', ')}
                                >
                                    {this.mapToSelect(roles)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Name"
                                name="name"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("name")}
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Lastname"
                                name="lastName"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("lastName")}
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Surname"
                                name="surname"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("surname")}
                        </Grid>
                    </Grid>
                    <Grid justify="space-between" container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Email"
                                name="email"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("email")}
                        </Grid>
                        <Grid item lg={3} md={6} xs={12}>
                            <InputMask
                                mask="(+38)999 999 99 99"
                                maskChar=" "
                                onChange={this.handleChange}
                            >
                                {() =>
                                    <TextField
                                        fullWidth
                                        label="Outlined"
                                        variant="outlined"
                                        label="Phone"
                                        name="phoneNumber"
                                    />
                                }
                            </InputMask>
                            {this.LoadInputErrors("phoneNumber")}
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Address"
                                name="adress"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("adress")}
                        </Grid>
                    </Grid>
                    <Grid justify="space-between" container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Identity code"
                                name="identificationCode"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("identificationCode")}
                        </Grid>
                        <Grid item lg={3} md={6} xs={12} container justify="center">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    label="Date of birthday"
                                    format="dd/MM/yyyy"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            {this.LoadInputErrors("dateOfBirth")}
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                            <TextField
                                fullWidth
                                label="Outlined"
                                variant="outlined"
                                label="Passport"
                                name="passportString"
                                onChange={this.handleChange}
                            />
                            {this.LoadInputErrors("passportString")}
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} direction="column" alignItems="flex-end">
                        <Grid item xs>
                            <Growl className="mt-5" ref={(el) => this.growl = el} />
                            <MDBBtn onClick={this.onSubmit} className="blue-gradient border-0 px-5 py-2" >
                                Додати
                            </MDBBtn>
                            {
                                this.LoadResponceErrors()
                            }
                        </Grid>
                    </Grid>
                </div>

            </Paper >
        );
    }
}

const mapStateToProps = state => {
    return {
        roles: get(state, 'addTeacher.list.roles'),
        loading: get(state, 'addTeacher.list.loading'),
        failed: get(state, 'addTeacher.list.failed'),
        success: get(state, 'addTeacher.list.success')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTeacher: model => {
            dispatch(getListActions.addTeacher(model));
        },
        getRoles: () => {
            dispatch(getListActionsRoles.getRoles());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addTeacher);