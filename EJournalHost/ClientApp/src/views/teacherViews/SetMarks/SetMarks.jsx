import React from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/uk";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Table } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from "@material-ui/core/Radio";
import { Growl } from "primereact/growl";
import { withStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Input } from "reactstrap";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Loader from"../../../components/Loader";
import "./style.css";
class HomePage extends React.Component {
  state = {
    date: null,
    subject: "",
    lessonId: 0,
  };
  componentDidMount() {
    const { date } = this.state;
    this.props.getData({ date });
  }
  handleDateChange = (date) => {
    this.setState({
      date: date,
      lessonId: 0,
    });
    this.props.getData({ date });
  };
  exit = () => {
    this.setState({
      lessonId: 0,
    });
  };
  render() {
    const { data, students,loading } = this.props;
    const { lessonId } = this.state;
    const marks = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];
    const markTypes = [
      "1",
      "3",
      "4",      
    ];
    const GreenRadio = withStyles({
      root: {
        color: green[400],
        "&$checked": {
          color: green[600],
        },
      },
      checked: {},
    })((props) => <Radio color="default" {...props} />);
    const RedRadio = withStyles({
      root: {
        color: red[400],
        "&$checked": {
          color: red[600],
        },
      },
      checked: {},
    })((props) => <Radio color="default" {...props} />);
    const handleLessonChange = (e, LessonId) => {
      this.setState({
        lessonId: LessonId,
      });
      this.props.getStudents({ LessonId });
    };
    const handleSelectChange = (e, LessonId,MarkType,StudentId) => {     
      if(MarkType!=undefined) {
        this.props.changeMark({ Mark:e.target.value,LessonId,MarkType,StudentId });
      }else{
        this.growl.show({
          severity: "error",
          summary: "Помилка",
          detail: "Оберіть тип оцінки",
        });
      }
    };
    
    const handleIsPresentChange = (event,LessonId,StudentId) => {
      this.props.changeIsPresent({isPresent:event.target.value,LessonId,StudentId});
    };
    if(loading===true){
      return(<Loader/>)
    }
    else if (lessonId != 0&&students.students!=undefined&&loading===false) {
      return (
        <React.Fragment>
          <Growl className="mt-5" ref={(el) => (this.growl = el)} />
          <React.Fragment>
            <div className="d-flex flex-row pb-3 pt-3">
              <IconButton
                onClick={this.exit}
                color="primary"
                component="span"
                className="ml-2 mr-5"
              >
                <NavigateBeforeIcon />
              </IconButton>
              <TextField
                className="mr-4"
                id="standard-basic"
                onBlur={(e)=> {
                  this.props.changeTopic({topic:e.target.value,lessonId});
                }}
                defaultValue={students.topic}
                label="Тема уроку"
              />
              <TextField id="standard-basic"
              onBlur={(e)=> {
                this.props.changeHomework({homework:e.target.value,lessonId});
              }}
               defaultValue={students.homework} label="Домашнє завдання" />
            </div>
            <Paper className="mt-3">
              <Table>
                <thead>
                  <tr class="crd">
                    <th className="font-weight-bold">Ім'я</th>
                    <th className="font-weight-bold">Присутність</th>
                    <th className="font-weight-bold">Оцінка</th>
                    <th className="font-weight-bold">Тип оцінки</th>
                  </tr>
                </thead>
                <tbody>
                  {students.students.map(function (el) {
                    let val;
                    let select;
                    if(el.markType!=null){
                      select=el.markType;
                    }
                    const handleSelectChange2 = (e) => {      
                      select=e.target.value;
                    };
                    if (el.isPresent == "True") {
                      val = "true";
                    } else if (el.isPresent == "False") {
                      val = "false";
                    }
                    
                    //console.log(val);
                    if (val != "false") {
                      return (
                        <tr key={el.id}>
                          <th className="txt font-weight-bold" scope="row">
                            {`${el.name} ${el.lastName}`}
                          </th>
                          <td>
                            <RadioGroup
                              className="d-flex flex-row"
                              aria-label="gender"
                              name="gender1"
                              value={val}
                              onChange={(e) => handleIsPresentChange(e,lessonId,el.id)}
                            >
                              <FormControlLabel
                                value="true"
                                control={
                                  <Tooltip title="Присутній" arrow>
                                    <GreenRadio />
                                  </Tooltip>
                                }
                              />
                              <FormControlLabel
                                value="false"
                                control={
                                  <Tooltip title="Не присутній" arrow>
                                    <RedRadio />
                                  </Tooltip>
                                }
                              />

                            </RadioGroup>
                          </td>
                          <td>
                            <Input
                            onChange={(e) => handleSelectChange(e,lessonId,select,el.id)}
                              //onChange={handleChangeSelect(data.group, row.id)}
                              type="select"
                              className="control-wrk font-weight-bold"
                            >
                              <option disabled selected value={0}></option>
                              {marks.map(function (elem) {
                                if (elem == el.mark) {
                                  return (
                                    <option selected value={elem}>
                                      {elem}
                                    </option>
                                  );
                                } else {
                                  return <option value={elem}>{elem}</option>;
                                }
                              })}
                            </Input>
                          </td>
                          <td>
                            <Input
                            onChange={(e) => handleSelectChange2(e)}
                              //onChange={handleChangeSelect(data.group, row.id)}
                              type="select"
                              className="mark font-weight-bold select"
                            >
                              <option disabled selected value={0}></option>
                              {markTypes.map(function (elem) {
                                if(elem==="1"){
                                  if (elem == el.markType) {
                                    return (
                                      <option selected value={elem}>
                                        За роботу на уроці
                                      </option>
                                    );
                                  } else {
                                    return <option value={elem}>За роботу на уроці</option>;
                                  }

                                }
                                if(elem==="3"){
                                  if (elem == el.markType) {
                                    return (
                                      <option selected value={elem}>
                                        За КР
                                      </option>
                                    );
                                  } else {
                                    return <option value={elem}>За КР</option>;
                                  }
                                }
                                if(elem==="4"){
                                  if (elem == el.markType) {
                                    return (
                                      <option selected value={elem}>
                                        За Тему
                                      </option>
                                    );
                                  } else {
                                    return <option value={elem}>За Тему</option>;
                                  }
                                }
                              })}
                              {/* <option disabled selected value={0}></option>
                              <option value={1}>За роботу на уроці</option>
                              <option value={3}>За К.Р.</option>
                              <option value={4}>За Тему</option> */}
                              {/* {marks.map(function (elem) {
                                if (elem == el.mark) {
                                  return (
                                    <option selected value={elem}>
                                      {elem}
                                    </option>
                                  );
                                } else {
                                  return <option value={elem}>{elem}</option>;
                                }
                              })} */}
                            </Input>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={el.id}>
                          <th className="txt font-weight-bold" scope="row">
                            {`${el.name} ${el.lastName}`}
                          </th>
                          <td>
                            <RadioGroup
                              className="d-flex flex-row"
                              aria-label="gender"
                              name="gender1"
                              value={val}
                              onChange={(e) => handleIsPresentChange(e,lessonId,el.id)}
                            >
                              <FormControlLabel
                                value="true"
                                control={
                                  <Tooltip title="Присутній" arrow>
                                    <GreenRadio />
                                  </Tooltip>
                                }
                              />
                              <FormControlLabel
                                value="false"
                                control={
                                  <Tooltip title="Не присутній" arrow>
                                    <RedRadio />
                                  </Tooltip>
                                }
                              />

                            </RadioGroup>
                          </td>
                          <td>
                            <Input
                              disabled
                              
                              type="select"
                              className="control-wrk-dis font-weight-bold"
                            >
                              <option disabled selected value={0}></option>
                            </Input>
                          </td>
                          <td>
                            <Input
                              disabled
                              //onChange={handleChangeSelect(data.group, row.id)}
                              type="select"
                              className="mark-dis font-weight-bold select"
                            >
                              <option disabled selected value={0}></option>
                            </Input>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </Table>
            </Paper>
          </React.Fragment>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="d-flex flex-row pb-3 pt-3">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
              <KeyboardDatePicker
                label="Дата"
                className="mt-2"
                format="dd.MM.yyyy"
                value={this.state.date}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Paper className="mt-3">
            <Table borderless>
              <thead>
                <tr class="crd">
                  <th className="font-weight-bold ">№ Пари</th>
                  <th className="font-weight-bold">Предмет</th>
                  <th className="font-weight-bold">Група</th>
                  <th className="font-weight-bold">Час</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map(function (el) {
                  return (
                    <tr key={el.id}>
                      <th className="txt font-weight-bold ml-4" scope="row">
                        {el.lessonNumber}
                      </th>
                      <td>{el.subject}</td>
                      <td>{el.group}</td>
                      <td>{el.lessonTimeGap}</td>
                      <td>
                        <IconButton
                          onClick={(e) => handleLessonChange(e, el.id)}
                          color="primary"
                          component="span"
                        >
                          <NavigateNextIcon />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Paper>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    errors: get(state, "setMarks.list.errors"),
    data: get(state, "setMarks.list.data"),
    students: get(state, "setMarks.list.students"),
    loading: get(state, "setMarks.list.loading"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (filter) => {
      dispatch(getListActions.getData(filter));
    },
    getStudents: (filter) => {
      dispatch(getListActions.getStudents(filter));
    },
    changeTopic: (filter) => {
      dispatch(getListActions.changeTopic(filter));
    },
    changeHomework: (filter) => {
      dispatch(getListActions.changeHomework(filter));
    },
    changeMark: (filter) => {
      dispatch(getListActions.changeMark(filter));
    },
    changeIsPresent: (filter) => {
      dispatch(getListActions.changeIsPresent(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
