import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getListActionsRoles from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBDataTable } from 'mdbreact';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import './TeachersTableStyle.css';
class TeachersTable extends Component {
  state = {
    rolename: '',
  };

  componentDidMount = () => {
    const {rolename}=this.state;
    this.props.getRoles();
    this.props.getTeachers({ rolename });
  }
  changeRole = (event) => {
    const rolename = event.target.value;
    this.setState({ rolename: rolename });
    this.props.getTeachers({ rolename });
  }

  render() {
    const { listTeachers, roles } = this.props;
    console.log("RENDER", listTeachers);

    return (
      <React.Fragment>
        <FormControl className="dropW mt-2 mb-4">
          <InputLabel id="rlabel">Оберіть спеціалізацію</InputLabel>
          <Select
            labelId="rlabel"
            value={this.state.rolename}
            onChange={this.changeRole}
          >
            {
              roles.map(item => {
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
          data={listTeachers} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    listTeachers: get(state, 'teachers.list.data'),
    roles: get(state, 'teachers.list.roles'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeachers: filter => {
      dispatch(getListActions.getTeachers(filter));
    },
    getRoles: () => {
      dispatch(getListActionsRoles.getRoles());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeachersTable);
