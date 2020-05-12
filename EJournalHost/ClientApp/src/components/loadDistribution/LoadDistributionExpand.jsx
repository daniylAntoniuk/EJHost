import React from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Growl } from "primereact/growl";
import { Input } from "reactstrap";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [group, setGroup] = React.useState(0);
  const { data } = props;
  const { groups } = props;
  const [success, setSuccess] = React.useState(false);
  const [growl, setGrowl] = React.useState();
  const handleChange = (panel, groupId) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded === true) {
      setGroup(groupId);
      props.getData({ groupId });
    }
  };
  const handleChangeSelect = (groupId,subjectId) => (event) => {
    //console.log("ev", event.target.value);
    props.changeTeacher({groupId,subjectId,teacherId:event.target.value})
    growl.show({
      severity: "success",
      summary: "Успіх",
      detail: "Данні збережено",
    });
  };
  const select = (row) => {
    if (row.selectedTeacherId === null) {
      return (
        <option disabled selected value>
          Оберіть вчителя
        </option>
      );
    }
  };
  const loadData = () => {
    if (data.subjects != undefined && data.group === group.toString()) {
      return (
        <React.Fragment>
          {data.subjects.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChangeSelect}
                  >
                      {row.teachers.map(function(el){
                          return (<MenuItem value={el.id}>{el.name}</MenuItem>)
                      })}

                  </Select> */}
                <Input onChange={handleChangeSelect(data.group,row.id)} type="select">
                  {select(row)}
                  {row.teachers.map(function (el) {
                    if (el.id === row.selectedTeacherId) {
                      return (
                        <option selected key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    }
                  })}
                </Input>
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <div
          className="d-flex mt-3 justify-content-center"
          style={{ width: "200%" }}
        >
          <div
            className="d-flex justify-content-center spinner-border text-primary"
            role="status"
          >
            <span className="sr-only">Завантаження...</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      {groups.map(function (el) {
        return (
          <React.Fragment>
            <Growl className="mt-5" ref={(el) => setGrowl(el)} />

            <ExpansionPanel
              key={el.id}
              expanded={expanded === `panel${el.id}`}
              onChange={handleChange(`panel${el.id}`, el.id)}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>{el.name}</Typography>
                <Typography className={classes.secondaryHeading}>
                  Група
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Предмет</TableCell>
                      <TableCell>Вчитель</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{loadData()}</TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </React.Fragment>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {    
    successChange: get(state, "loadDistributionData.list.successChange"),
    data: get(state, "loadDistributionData.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (filter) => {
      dispatch(getListActions.getData(filter));
    },
    changeTeacher: (filter) => {
        dispatch(getListActions.changeTeacher(filter));
      },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlledExpansionPanels);
