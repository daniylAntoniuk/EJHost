import React, { useState } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { Grid } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import NewsModal from "../../../components/news/NewsModal";
import MenuItem from "@material-ui/core/MenuItem";
import { MDBBtn } from "mdbreact";
import { Growl } from "primereact/growl";
import * as getListActions from "./reducer";
import * as getListActions2 from "../LoadDistribution/reducer";
class AddNews extends React.Component {
  state = {
    topic: "",
    content: "",
    group: "",
    topicGroup: "",
    contentGroup: "",
    success: false,
    failed: false,
  };
  componentDidMount() {
    this.props.getGroups({speciality:""});
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps !== this.props) {
      this.setState({ success: nextProps.success,failed:nextProps.failed });
    }
  };
  render() {
    const { login, groups } = this.props;
    const {
      topic,
      content,
      topicGroup,
      contentGroup,
      group,
      failed,
      success,
    } = this.state;
    const submit = () => {
      this.props.addNews({ topic, content });
    };
    const submitGroup = () => {
      if (group === "") {
        this.growl.show({
          severity: "error",
          summary: "Помилка",
          detail: "Введіть всі данні",
        });
      } else {
        this.props.addNews({ topic: topicGroup, content: contentGroup, group });
      }
    };
    const loadGroups = () => {
      if (groups != null) {
        return (
          <TextField
            id="outlined-select-currency"
            className="mt-3"
            select
            required
            label="Оберіть групу"
            value={group}
            onChange={(e) => {
              this.setState({ group: e.target.value });
            }}
            variant="outlined"
          >
            {groups.groups.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        );
      }
    };
    let date = new Date();
    let month = date.getMonth() + 1;
    if (success == true) {
      this.setState({ success: false });
      this.growl.show({
        severity: "success",
        summary: "Успіх",
        detail: "Данні збережено",
      });
    }else if(failed == true){
        this.setState({ failed: false });
        this.growl.show({
          severity: "error",
          summary: "Помилка",
          detail: "Занадто довгий текст",
        });
    }
    return (
      <React.Fragment>
        <Growl className="mt-5" ref={(el) => (this.growl = el)} />
        <ExpansionPanel className="mt-3">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Додати новину</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="d-flex flex-column">
            <form onSubmit={submit} className="d-flex flex-column">
              <TextField
                required
                multiline
                helperText="Заголовок повинен містити не більше 200 символів"
                className="mt-2"
                onChange={(e) => {
                  this.setState({ topic: e.target.value });
                }}
                label="Заголовок"
                variant="outlined"
              />
              <TextField
                multiline
                required
                className="mt-3"
                onChange={(e) => {
                  this.setState({ content: e.target.value });
                }}
                rows={4}
                helperText="Новина повинна містити не більше 500 символів"
                label="Новина"
                variant="outlined"
              />
              <Typography className="mt-3">Попередній перегляд:</Typography>
              <Grid container>
                <NewsModal
                  el={{
                    topic: topic,
                    content: content,
                    dateOfCreate:
                      date.getDate() + "." + month + "." + date.getFullYear(),
                    teacher: login.user.name,
                  }}
                />
              </Grid>
              <div className="mt-2 d-flex justify-content-end">
                <MDBBtn
                  type="submit"
                  className="blue-gradient border-0 px-5 py-2"
                >
                  Додати
                </MDBBtn>
              </div>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Додати новину для групи</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="d-flex flex-column">
            <form onSubmit={submitGroup} className="d-flex flex-column">
              <TextField
                required
                multiline
                helperText="Заголовок повинен містити не більше 200 символів"
                className="mt-2"
                onChange={(e) => {
                  this.setState({ topicGroup: e.target.value });
                }}
                label="Заголовок"
                variant="outlined"
              />
              <TextField
                multiline
                required
                 helperText="Новина повинна містити не більше 500 символів"
                className="mt-3"
                onChange={(e) => {
                  this.setState({ contentGroup: e.target.value });
                }}
                rows={4}
                label="Новина"
                variant="outlined"
              />

              {loadGroups()}
              <Typography className="mt-3">Попередній перегляд:</Typography>
              <Grid container>
                <NewsModal
                  el={{
                    topic: topicGroup,
                    content: contentGroup,
                    dateOfCreate:
                      date.getDate() + "." + month + "." + date.getFullYear(),
                    teacher: login.user.name,
                  }}
                />
              </Grid>
              <div className="mt-2 d-flex justify-content-end">
                <MDBBtn
                  type="submit"
                  className="blue-gradient border-0 px-5 py-2"
                >
                  Додати
                </MDBBtn>
              </div>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: get(state, "login"),
    success: get(state, "addNews.list.success"),
    failed: get(state, "addNews.list.failed"),
    groups: get(state, "loadDistribution.list.groups"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNews: (model) => {
      dispatch(getListActions.addNews(model));
    },
    getGroups: (model) => {
      dispatch(getListActions2.getGroups(model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
