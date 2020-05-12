import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import { Grid } from "@material-ui/core";
import NewsModal from "../../../components/news/NewsModal";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./NewsStyle.css"
import * as getListActions2 from "../LoadDistribution/reducer";
class News extends React.Component {
  state = {
    group: "",
  };
  componentDidMount() {
    this.props.getGroups({speciality:""});
    this.props.getNews();
  }
  load = () => {
    const { data } = this.props;
    if (data.news != undefined) {
      return (
        <React.Fragment>
          {data.news.map(function (el) {
            return (
              <Grid lg={4} md={6} xl={3} xs={12} item>
                <NewsModal key={el.id} el={el} />
              </Grid>
            );
          })}
        </React.Fragment>
      );
    }
  };
  loadByGroup = () => {
    const { dataGroups } = this.props;
    if (dataGroups.news != undefined) {
      return (
        <React.Fragment>
          {dataGroups.news.map(function (el) {
            return (
              <Grid lg={4} md={6} xl={3} xs={12} item>
                <NewsModal key={el.id} el={el} />
              </Grid>
            );
          })}
        </React.Fragment>
      );
    }
  };
  render() {
    //const {data}= this.props;
    //console.log(data);
    const { groups } = this.props;
    const {
      group,
    } = this.state;
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
              this.props.getGroupNews({group:e.target.value});
            }}
            style={{minWidth:"170px"}}
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
    return (
      <React.Fragment>
        <ExpansionPanel className="mt-3">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Новини</Typography>
            <Typography className="ml-4 secondaryHeading">
                  Перші 6 новин
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid className="mt-3" container spacing={2}>
              {this.load()}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className="mt-3">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Новини групи</Typography>
            <Typography className="ml-4  secondaryHeading">
                  Перші 10 новин
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="d-flex flex-column">
            {loadGroups()}
            <Grid className="mt-3" container spacing={2}>
            {this.loadByGroup()}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "adminNews.list.data"),
    dataGroups: get(state, "adminNews.list.dataGroups"),
    groups: get(state, "loadDistribution.list.groups"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNews: () => {
      dispatch(getListActions.getNews());
    },
    getGroupNews: (model) => {
      dispatch(getListActions.getGroupNews(model));
    },
    getGroups: (model) => {
      dispatch(getListActions2.getGroups(model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
