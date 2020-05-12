import React from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import { Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import deLocale from "date-fns/locale/uk";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../components/Loader";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Growl } from "primereact/growl";
import Select from "@material-ui/core/Select";
class ChangeTimetable extends React.Component {
  state = {
    teacher: "",
    group: "",
    auditory: "",
    isGroup: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    number: [],
    subject: "",
    daysOfWeek: [],
  };
  componentDidMount() {
    this.props.getTeachers();
  }
  render() {
    const {
      loading,
      teachers,
      groups,
      subjects,
      failed,
      auditories,
      succes,
    } = this.props;
    let days = [
      ["ПН", '1'],
      ["ВТ", '2'],
      ["СР", '3'],
      ["ЧТ", '4'],
      ["ПТ", '5'],
      ["СБ", '6'],
    ];
    let numbers = [
      '1',
      '2',
      '3',
      '4',
    ];
    const { dateFrom, daysOfWeek, number, dateTo, group } = this.state;
    //console.log(auditories);
    const handleChangeMultiple = (event) => {
      this.setState({ daysOfWeek: event.target.value });
      const { dateFrom, daysOfWeek, number, dateTo, group } = this.state;

      if (
        dateFrom != null &&
        event.target.value.length != 0 &&
        number.length != 0 &&
        dateTo != null
      )
        this.props.getAuditoriums({
          dateFrom: dateFrom,
          dateTo: dateTo,
          group: group,
          daysOfWeek: event.target.value,
          numbers: number,
        });
    };
    const handleChangeMultipleNumber = (event) => {
      this.setState({ number: event.target.value });
      const { dateFrom, daysOfWeek, number, dateTo, group } = this.state;
      if (
        dateFrom != null &&
        daysOfWeek.length != 0 &&
        event.target.value.length != 0 &&
        dateTo != null
      )
        this.props.getAuditoriums({
          dateFrom: dateFrom,
          dateTo: dateTo,
          group: group,
          daysOfWeek: daysOfWeek,
          numbers: event.target.value,
        });
    };
    const handleChangeRadio = (event) => {
      this.setState({ isGroup: event.target.value });
    };
    const handleChangeTeacher = (event) => {
      this.setState({ teacher: event.target.value });
      this.props.getGroups({ teacher: event.target.value });
    };
    const handleChangeGroup = (event) => {
      this.setState({ group: event.target.value });
      this.props.getSubjects({
        teacher: this.state.teacher,
        group: event.target.value,
      });
      const { dateFrom, daysOfWeek, number, dateTo } = this.state;
      if (
        dateFrom != null &&
        daysOfWeek.length != 0 &&
        number.length != 0 &&
        dateTo != null
      )
        this.props.getAuditoriums({
          dateFrom: dateFrom,
          dateTo: dateTo,
          group: event.target.value,
          daysOfWeek: daysOfWeek,
          numbers: number,
        });
    };
    const handleChangeSubject = (event) => {
      this.setState({ subject: event.target.value });
      //this.props.getSubjects({teacher: this.state.teacher,group:event.target.value})
    };
    const handleChangeS = (event) => {
      let arr = this.state.daysOfWeek;
      if (event.target.checked === true) {
          arr.push(event.target.value);
          this.setState({ daysOfWeek: arr });
        }
        else{
            arr= arr.filter(function(ele){ return ele != event.target.value; })
            this.setState({ daysOfWeek: arr });
      }
    };
    const handleChangeNumb = (event) => {
      let arr = this.state.number;
      if (event.target.checked === true) {
          arr.push(event.target.value);
          this.setState({ number: arr });
        }
        else{
            arr= arr.filter(function(ele){ return ele != event.target.value; })
            this.setState({ number: arr });
      }
    };
    const handleChangeAud = (event) => {
      this.setState({ auditory: event.target.value });
    };
    const handleDateFromChange = (date) => {
      this.setState({ dateFrom: date });
      const { dateFrom, daysOfWeek, number, dateTo, group } = this.state;
      if (
        date != null &&
        daysOfWeek.length != 0 &&
        number.length != 0 &&
        dateTo != null
      )
        this.props.getAuditoriums({
          dateFrom: date,
          dateTo: dateTo,
          group: group,
          daysOfWeek: daysOfWeek,
          numbers: number,
        });
    };
    const handleDateToChange = (date) => {
      this.setState({ dateTo: date });
      const { dateFrom, daysOfWeek, number, dateTo, group } = this.state;
      if (
        dateFrom != null &&
        daysOfWeek.length != 0 &&
        number.length != 0 &&
        date != null
      )
        this.props.getAuditoriums({
          dateFrom: dateFrom,
          dateTo: date,
          group: group,
          daysOfWeek: daysOfWeek,
          numbers: number,
        });
    };
    const save = () => {
      const {
        dateFrom,
        daysOfWeek,
        number,
        dateTo,
        group,
        auditory,
        subject,
        teacher,
      } = this.state;
      if (
        dateFrom != null &&
        daysOfWeek.length != 0 &&
        number.length != 0 &&
        dateTo != null &&
        group != "" &&
        auditory != "" &&
        subject != "" &&
        teacher != ""
      ) {
        this.props.save({
          dateFrom: dateFrom,
          dateTo: dateTo,
          group: group,
          daysOfWeek: daysOfWeek,
          numbers: number,
          auditory: auditory,
          subject: subject,
          teacher: teacher,
        });
      } else {
        this.growl.show({
          severity: "error",
          summary: "Помилка",
          detail: "Введіть всі данні !",
        });
      }
    };
    // if(failed==true){
    //     this.growl.show({
    //         severity: "error",
    //         summary: "Помилка",
    //         detail: "На цей час вже є уроки",
    //       });
    // }
    if (succes == true) {
      this.growl.show({
        severity: "succes",
        summary: "Успіх",
        detail: "Данні збережено",
      });
    }
    if (loading != true) {
      return (
        <React.Fragment>
          <Growl className="mt-5" ref={(el) => (this.growl = el)} />
          <Grid container spacing={4} className="mt-2">
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <FormControl
                required
                variant="outlined"
                style={{ width: "100%" }}
              >
                <InputLabel>Вчитель</InputLabel>
                <Select
                  value={this.state.teacher}
                  onChange={handleChangeTeacher}
                  label="Вчитель"
                >
                  {teachers.map(function (el) {
                    return (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name + " " + el.surname + " " + el.lastName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <FormControl
                required
                variant="outlined"
                style={{ width: "100%" }}
              >
                <InputLabel>Група</InputLabel>
                <Select
                  value={this.state.group}
                  onChange={handleChangeGroup}
                  label="Група"
                >
                  {groups.map(function (el) {
                    return (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <FormControl
                required
                variant="outlined"
                style={{ width: "100%" }}
              >
                <InputLabel>Предмет</InputLabel>
                <Select
                  value={this.state.subject}
                  onChange={handleChangeSubject}
                  label="Предмет"
                >
                  {subjects.map(function (el) {
                    return (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item lg={3} md={4} xl={2} xs={6}>
              <FormControl
                required
                variant="outlined"
                style={{ width: "100%" }}
              >
                <InputLabel>№ Пари</InputLabel>
                <Select
                  multiple
                  value={this.state.number}
                  onChange={handleChangeMultipleNumber}
                  //input={<Input />}
                  label="№ Пари"
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid> */}

            {/* <Grid item lg={3} md={4} xl={2} xs={6}>
              <FormControl
                required
                variant="outlined"
                style={{ width: "100%" }}
              >
                <InputLabel>Дні тижню</InputLabel>
                <Select
                  multiple
                  value={this.state.daysOfWeek}
                  onChange={handleChangeMultiple}
                  //input={<Input />}
                  label="Дні тижню"
                >
                  <MenuItem value={1}>ПН</MenuItem>
                  <MenuItem value={2}>ВТ</MenuItem>
                  <MenuItem value={3}>СР</MenuItem>
                  <MenuItem value={4}>ЧТ</MenuItem>
                  <MenuItem value={5}>ПТ</MenuItem>
                  <MenuItem value={6}>СБ</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <Typography variant="h6" gutterBottom>
                № Пар
              </Typography>
              {numbers.map(function (el) {
                console.log(number,el)
                if (number.includes(el)) {
                  return (
                    <FormControlLabel
                      onChange={handleChangeNumb}
                      control={
                        <Checkbox checked value={el} color="primary" />
                      }
                      label={el}
                    />
                  );
                } else {
                  return (
                    <FormControlLabel
                      onChange={handleChangeNumb}
                      control={
                        <Checkbox value={el} color="primary" />
                      }
                      label={el}
                    />
                  );
                }
              })}
            </Grid>
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <Typography variant="h6" gutterBottom>
                Дні тижню
              </Typography>
              {days.map(function (el) {
                if (daysOfWeek.includes(el[1])) {
                  return (
                    <FormControlLabel
                      onChange={handleChangeS}
                      control={
                        <Checkbox checked value={el[1]} color="primary" />
                      }
                      label={el[0]}
                    />
                  );
                } else {
                  return (
                    <FormControlLabel
                      onChange={handleChangeS}
                      control={
                        <Checkbox value={el[1]} color="primary" />
                      }
                      label={el[0]}
                    />
                  );
                }
              })}
            </Grid>
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="outlined"
                  format="dd.MM.yyyy"
                  margin="normal"
                  label="Дата початку"
                  value={this.state.dateFrom}
                  onChange={handleDateFromChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="outlined"
                  format="dd.MM.yyyy"
                  margin="normal"
                  label="Дата кінцю"
                  value={this.state.dateTo}
                  onChange={handleDateToChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={3} md={4} xl={2} xs={6}>
              <RadioGroup
                style={{ width: "100%" }}
                className="ml-2"
                value={this.state.isGroup}
                onChange={handleChangeRadio}
              >
                <FormControlLabel
                  value="group"
                  control={<Radio color="primary" />}
                  label="Група"
                />
                <FormControlLabel
                  value="subgroup"
                  control={<Radio />}
                  label="Підгрупи"
                />
              </RadioGroup>
            </Grid>
            {this.state.isGroup == "subgroup" ? (
              <React.Fragment>
                <Grid item lg={3} md={4} xl={2} xs={6}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel>Аудиторія для 1 підгрупи</InputLabel>
                    <Select
                      value={this.state.teacher}
                      onChange={handleChangeTeacher}
                      label="Аудиторія для 1 підгрупи"
                    >
                      {subjects.map(function (el) {
                        return (
                          <MenuItem key={el.id} value={el.id}>
                            {el.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>{" "}
                <Grid item lg={3} md={4} xl={2} xs={6}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel>Аудиторія для 2 підгрупии</InputLabel>
                    <Select
                      value={this.state.teacher}
                      onChange={handleChangeTeacher}
                      label="Аудиторія для 2 підгрупи"
                    >
                      <MenuItem value={2}>ПН</MenuItem>
                      <MenuItem value={3}>ВТ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item lg={3} md={4} xl={2} xs={6}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel>Аудиторія</InputLabel>
                  <Select
                    value={this.state.auditory}
                    onChange={handleChangeAud}
                    label="Аудиторія"
                  >
                    {auditories.map(function (el) {
                      return (
                        <MenuItem key={el.id} value={el.id}>
                          {el.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            style={{ width: "100%" }}
            className="d-flex justify-content-end"
          >
            <Button
              variant="contained"
              className="mt-4"
              color="primary"
              startIcon={<DoneIcon />}
              onClick={save}
            >
              Зберегти
            </Button>
          </Grid>
        </React.Fragment>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: get(state, "changeTimetable.list.teachers"),
    loading: get(state, "changeTimetable.list.loading"),
    groups: get(state, "changeTimetable.list.groups"),
    subjects: get(state, "changeTimetable.list.subjects"),
    auditories: get(state, "changeTimetable.list.auditories"),
    failed: get(state, "changeTimetable.list.failed"),
    succes: get(state, "changeTimetable.list.succes"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTeachers: () => {
      dispatch(getListActions.getTeachers());
    },
    getGroups: (model) => {
      dispatch(getListActions.getGroups(model));
    },
    getSubjects: (model) => {
      dispatch(getListActions.getSubjects(model));
    },
    getAuditoriums: (model) => {
      dispatch(getListActions.getAuditoriums(model));
    },
    save: (model) => {
      dispatch(getListActions.save(model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTimetable);
