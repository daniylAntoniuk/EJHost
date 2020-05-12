import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SchoolIcon from "@material-ui/icons/School";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { Pie, Line } from "react-chartjs-2";
import get from "lodash.get";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Link,
  Grid,
} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import "./HomePageStyle.css";

function LoadTimetable(data, date) {
  if (data.timetable != undefined || date != undefined) {
    return data.timetable.map(function (el) {
      if (el.day == date) {
        if (el.topic != null) {
          return (
            <div>
              <Typography className="text-color" variant="h4" gutterBottom>
                {el.subjectName}
              </Typography>
              <div
                className="d-flex flex-row justify-content-start"
                style={{ width: "100%" }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  className="mr-2 text-color"
                >
                  Тема:
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {el.topic}
                </Typography>
              </div>

              <Typography variant="h6" gutterBottom>
                {el.teacherName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {el.lessonTimeGap}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {el.auditoriumNumber}
              </Typography>

              <hr />
            </div>
          );
        } else {
          return (
            <div>
              <Typography className="text-color" variant="h4" gutterBottom>
                {el.subjectName}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {el.teacherName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {el.lessonTimeGap}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {el.auditoriumNumber}
              </Typography>
              <hr />
            </div>
          );
        }
      }
    });
  } else {
    return (
      <div>
        <Skeleton animation="wave" height={15} width="15%" />
        <Skeleton animation="wave" height={10} width="25%" />
        <Skeleton animation="wave" height={10} width="25%" />
        <Skeleton animation="wave" height={10} width="20%" />
        <hr />
      </div>
    );
  }
}
function LoadMarks(data) {
  if (data.marks != undefined) {
    return data.marks.map(function (el) {
      if (el.value != 0) {
        return (
          <div>
            <div className="mt-1 d-flex flex-row">
              <div className="d-flex flex-column">
                <h2>{el.subject}</h2>
                <p className="text-muted">{el.date}</p>
              </div>
              <div
                style={{ width: "100%" }}
                className="d-flex justify-content-end align-items-center"
              >
                <div className="mark text-center mr-4">{el.value}</div>
              </div>
            </div>
            <Divider></Divider>
          </div>
        );
      }
    });
  }
}
class HomePage extends React.Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    const { data } = this.props;

    const pie = {
      labels: ["Пропущено %", "Відвідано %"],
      datasets: [
        {
          data: [data.countOfDays, 100 - data.countOfDays],
          backgroundColor: ["#FF6384", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#FFCE56"],
        },
      ],
    };
    let line = {};
    if (data.averageMarks != undefined) {
      line = {
        labels: [
          "Вересень",
          "Жовтень",
          "Листопад",
          "Грудень",
          "Січень",
          "Лютий",
          "Березень",
          "Квітень",
          "Травень",
          "Червень",
        ],
        datasets: [
          {
            label: "Успішність",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#FFCE56",
            borderColor: "#FFCE56",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#FFCE56",

            pointHoverBorderColor: "#FFCE56",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
              data.averageMarks[0],
              data.averageMarks[1],
              data.averageMarks[2],
              data.averageMarks[3],
              data.averageMarks[4],
              data.averageMarks[5],
              data.averageMarks[6],
              data.averageMarks[7],
              data.averageMarks[8],
              data.averageMarks[9],
            ],
          },
        ],
      };
    }
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
      },
      maintainAspectRatio: false,
    };
    console.log(data);
    return (
      <Grid className="mt-4" container>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Card className=" mr-3">
            <form>
              <CardHeader
                avatar={<AssessmentIcon></AssessmentIcon>}
                title="Успішність"
              />

              <CardContent>
                {data.averageMarks == null ? (
                  <Skeleton
                    animation="wave"
                    height={248}
                    width="100%"
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  <div>
                    <Typography
                      className="text-color"
                      variant="h4"
                      gutterBottom
                    >
                      {data.averageMark}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Середня оцінка
                    </Typography>
                    <div className="chart-wrapper">
                      <Line data={line} options={options} />
                    </div>
                  </div>
                )}
              </CardContent>
            </form>
          </Card>
          <Card className="mt-3 mb-3 mr-3">
            <form>
              <CardHeader
                avatar={<FaceIcon></FaceIcon>}
                title="Відвідуваність"
              />

              <CardContent>
                {data.countOfDays == null ? (
                  <div className="d-flex justify-content-center align-items-center text-center">
                    <div className="d-flex flex-column">
                      <Skeleton
                        animation="wave"
                        height={15}
                        width="100%"
                        style={{ marginBottom: 2 }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Typography
                      className="text-color"
                      variant="h4"
                      gutterBottom
                    >
                      {100 - data.countOfDays}%
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Відвідано
                    </Typography>
                    <div className="chart-wrapper">
                      <Pie data={pie} />
                    </div>
                  </div>
                )}
              </CardContent>
            </form>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Card className="mt-3  mr-3" className="max-height">
            <form>
              <CardHeader
                avatar={<SchoolIcon></SchoolIcon>}
                subheader="Нещодавні оцінки"
                title="Оцінки"
              />

              <CardContent>
                {data.marks == null ? (
                  <div>
                  <div>
                    <div className="mt-1 d-flex flex-row">
                      <div className="d-flex flex-column">
                        <Skeleton animation="wave" height={20} width="150px" />
                        <Skeleton
                          animation="wave"
                          height={10}
                          width="100%"
                          className="mt-1"
                        />
                      </div>
                      <div
                        
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <Divider></Divider>
                  </div>
                  <div>
                  <div className="mt-1 d-flex flex-row">
                    <div className="d-flex flex-column">
                      <Skeleton animation="wave" height={20} width="150px" />
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="100%"
                        className="mt-1"
                      />
                    </div>
                    <div
                      
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <Divider></Divider>
                </div>
                </div>
                ) : (
                  LoadMarks(data)
                )}
              </CardContent>

              <CardActions>
                <div className="d-flex flex-column">
                  <Link href="/#/student/marks">
                    <Button size="small" color="primary">
                      Більше інформації
                    </Button>
                  </Link>
                </div>
              </CardActions>
            </form>
          </Card>
          <Card  className="mt-3">            
            <CardContent className="card-bg-color">
              <div className="m-3 border-wh p-3">

            <a className="link" href="/#/student/homework">                    
                    <h2 className="mt-5 ml-2 mb-5">Виконуйте домашні завдання <ArrowForwardIosIcon className="animate"/></h2>
            </a>
              </div>
            
            </CardContent>            
          </Card>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    errors: get(state, "studentHome.list.errors"),
    data: get(state, "studentHome.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (filter) => {
      dispatch(getListActions.getData(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
