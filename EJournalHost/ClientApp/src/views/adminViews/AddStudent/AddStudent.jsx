import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getGroupsListActions from './reducer';
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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class addStudent extends Component {
  state = {
    success: false,
    failed: false,
    errors: {},
    dateOfBirth: null,
    name: '',
    lastName: '',
    surname: '',
    adress: '',
    email: '',
    phoneNumber: '',
    passportString: '',
    identificationCode: '',
    groupId: 0
  };
  componentDidMount = () => {
    this.props.getGroups();
    const paramSub = this.props.match.params.groupId;
    if (paramSub !== undefined) {
      let gr = paramSub.split('=').splice(1, 1).toString();
      console.log("Params", gr);
      if (gr !== "null") {
        this.setState({ groupId: gr });
      }
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps !== this.props) {
      console.log("np: ", nextProps);
      this.setState({ success: nextProps.success, failed: nextProps.failed });
    }
  }
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
  changeGroup = (event) => {
    const groupId = event.target.value;
    this.setState({ groupId: groupId });
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
    const { name, surname, lastName, adress, email, phoneNumber, passportString, identificationCode, dateOfBirth, groupId } = this.state;
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
      const rolename = ["Student"];

      this.props.addStudent({
        name,
        lastName,
        surname,
        adress,
        email,
        phoneNumber,
        passportString,
        identificationCode,
        dateOfBirth: birthDate,
        rolename,
        groupId,
        //degree: ''
      });

    }
    else {
      this.setState({ errors });
    }
  }


  render() {
    //console.log("s ", this.state.success, " f ", this.state.failed);
    const { groups } = this.props;
    return (
      <Paper elevation={7} className="p-3 mt-4">
        <div>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
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
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                fullWidth
                label="Outlined"
                variant="outlined"
                label="Прізвище"
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
                label="По батькові"
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
                label="Електронна пошта"
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
                    label="Телефон"
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
                label="Адрес"
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
                label="Індефікаційний код"
                name="identificationCode"
                onChange={this.handleChange}
              />
              {this.LoadInputErrors("identificationCode")}
            </Grid>
            <Grid item lg={3} md={6} xs={12} container justify="center">
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Дата народження"
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
                label="Паспорт"
                name="passportString"
                onChange={this.handleChange}
              />
              {this.LoadInputErrors("passportString")}
            </Grid>
          </Grid>
          <Grid container spacing={3} direction="column" alignItems="flex-start">
            <Grid item xs>
              {/* <Dropdown className="mt-2" value={this.state.groupId} options={groups} onChange={this.changeGroup} placeholder="Select a group" /> */}
              <FormControl>
                <InputLabel id="dlabel">Group</InputLabel>
                <Select
                  labelId="dlabel"
                  value={this.state.groupId}
                  onChange={this.changeGroup}
                >
                  {
                    groups.map(item => {
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
              <MDBBtn onClick={this.onSubmit} className="blue-gradient border-0 px-5 py-2" >
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
    groups: get(state, 'addStudent.list.groups'),
    loading: get(state, 'addStudent.list.loading'),
    failed: get(state, 'addStudent.list.failed'),
    success: get(state, 'addStudent.list.success')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: model => {
      dispatch(getListActions.addStudent(model));
    },
    getGroups: () => {
      dispatch(getGroupsListActions.getGroups());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addStudent);