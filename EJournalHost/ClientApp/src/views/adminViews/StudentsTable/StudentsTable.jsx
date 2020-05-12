import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSpecialitiesListActions from './reducer';
import * as getGroupListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBDataTable } from 'mdbreact';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import './StudentsTableStyle.css';
class StudentsTable extends Component {
  state = {
    groupId: 0,
    specialityId: 0,
  };

  componentDidMount = () => {
    const paramGr = this.props.match.params.groupId;
    if (paramGr !== undefined) {
      let temp = paramGr.split('=').splice(1, 1).toString();
      if (temp !== "null") {
        this.setState({ groupId: temp });
        console.log("sret");
      }
    }
    const { groupId } = this.state;
    this.props.getStudents({ groupId });
    console.log("get stud",groupId);
    this.props.getSpecialities();
  }
  changeSpec = (event) => {
    const specialityId = event.target.value;
    this.setState({ specialityId: specialityId });
    this.props.getGroups({ specialityId });
  }
  changeGroup = (event) => {
    const groupId = event.target.value;
    this.setState({ groupId: groupId });
    this.props.getStudents({ groupId });
  }
  render() {
    const { listStudents, specialities, groups } = this.props;
    console.log("RENDER", listStudents);
    return (
      <React.Fragment>
        <FormControl className="dropW mx-2 mt-3">
          <InputLabel id="slabel">Оберіть спеціальність</InputLabel>
          <Select
            labelId="slabel"
            value={this.state.specialityId}
            onChange={this.changeSpec}
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
        <FormControl className="dropW mx-2 mt-3">
          <InputLabel id="glabel">Оберіть групу</InputLabel>
          <Select
            labelId="glabel"
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
        <MDBDataTable
          striped
          bordered
          hover
          data={listStudents} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    listStudents: get(state, 'students.list.data'),
    specialities: get(state, 'students.list.specialities'),
    groups: get(state, 'students.list.groups'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: filter => {
      dispatch(getListActions.getStudents(filter));
    },
    getSpecialities: () => {
      dispatch(getSpecialitiesListActions.getSpecialities());
    },
    getGroups: filter => {
      dispatch(getGroupListActions.getGroups(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable);
