import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import LoadDistributionExpand from "../../../components/loadDistribution/LoadDistributionExpand";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Loader from"../../../components/Loader";
class LoadDistribution extends React.Component {
  state = {
    group: "",
    speciality: "0",
  };
  componentDidMount() {
    this.props.getGroups({speciality:this.state.speciality});
  }

  render() {
    const { groups,loading } = this.props;
    const { speciality } = this.state;
    const handleChange = (event) => {
      console.log(event.target.value);
      this.setState({speciality:event.target.value});
      this.props.getGroups({speciality:event.target.value});
    };
    //console.log(groups);
    if (groups != null && loading ==false) {
      return (
        <React.Fragment>
          <div className="mt-4">
          <TextField
            id="outlined-select-currency"
            style={{minWidth:"180px"}}
            select
            required
            className="mb-4"
            label="Оберіть спеціальність"
            value={speciality}
            onChange={handleChange}
          >
              <MenuItem value={0}>Всі</MenuItem>
              {groups.specialities.map(function(el){
                return(
                  <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                )
              })}
            </TextField>
            <LoadDistributionExpand groups={groups.groups} />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <Loader/>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    groups: get(state, "loadDistribution.list.groups"),
    loading: get(state, "loadDistribution.list.loading"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (model) => {
      dispatch(getListActions.getGroups(model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadDistribution);
