import React from 'react';
import * as getListActions from './reducer';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import get from "lodash.get";
import StudentCardCurator from '../../../components/StudentCardCurator/StudentCardCurator';
class SeeStudentsCards extends React.Component {
  state = { 
    students:null
  }
  componentDidMount = () => {
    this.props.seeStudents();
    }
        card = () => {
          const { listStudents }  = this.props;
          console.log("rizhenka");
          return (listStudents.map(function (el) {
              return (
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                      <StudentCardCurator key = {el.id} student={el} />
                  </Grid>
              );
          }))
      }
  
      render() {
          return (
              <Grid container spacing={2}>
                  {this.card()}
              </Grid>
          );
      }
}
 
const mapStateToProps = state => {
    console.log("mapStateto props", state);
      return {
          listStudents: get(state, 'seeStudentsCards.list.data'),
      };
    }
   
    const mapDispatchToProps = (dispatch) => {
      console.log("mapDispatch");
      return {
          seeStudents: () => {
          dispatch(getListActions.seeStudents());
        }
      }
    }
export default connect(mapStateToProps,mapDispatchToProps)( SeeStudentsCards );

