import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as getStudentsBySpecialityListActions from './reducer';
import * as getSpecialitiesListActions from './reducer';
import * as getAllStudentsBySpecialitiesListActions from './reducer';
import * as getGroupsBySpecialityListActions from './reducer';
import * as getStudentsByGroupListActions from './reducer';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import get from "lodash.get";
import Loader from "../../../components/Loader";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import Pagination from '@material-ui/lab/Pagination';

const StudentCardList = React.lazy(() => import('../../../components/StudentCardList'));

const styles = theme => ({
    cardHeight: {
      color: '#009688'
    },
    root: {
        flexGrow: 1,
    },
    accent: {
        color: '#009688'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    }    
  })

class StudentsView extends React.Component {
    state = {
        groupId: 0,
        specialityId: 0,
        isLoading: false,
        page: ''
    };

    componentDidMount = () => {
        this.props.getSpecialities();
        this.props.getAllStudentsBySpecialities();
    }

    changeSpec = (event) => {
        const specialityId = event.target.value;
        this.setState({ specialityId: specialityId });
        console.log('specId', specialityId);
        this.props.getGroups({ specialityId });
        this.props.getStudents({ specialityId });
    }

    changeGroup = (event) => {
        const groupId = event.target.value;
        this.setState({ groupId: groupId });
        this.props.getStudentsByGroup({ groupId });
    }

    handleChange = (event) => {
        const page = event.target.value;
        this.setState({page: page});
    };

    render(){
        const { isLoading } = this.state;
        const { classes, listStudents, specialities, groups, loading, page } = this.props;
        console.log('loading', isLoading, specialities);
        if(loading != true){
            return(
                <React.Fragment>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={3}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">Спеціальність</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={this.state.specialityId}
                                            onChange={this.changeSpec}                    
                                        >{
                                            specialities.map(item => {
                                                return (
                                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                )
                                            })
                                        }
                                        </Select>
                                    <FormHelperText className={classes.accent}>Оберіть спеціальність</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">Група</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={this.state.groupId}     
                                            onChange={this.changeGroup}               
                                        >
                                        {
                                            groups.map(item => {
                                                return (
                                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                )
                                            })
                                        }
                                        </Select>
                                    <FormHelperText className={classes.accent}>Оберіть групу</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <StudentCardList studentList={listStudents}/>
                            </Grid>
                        </Grid>
                    </div>
                    
                </React.Fragment>
            );
        }
        else{
            return(
                <Loader/>
            )
        }
    }
}

const mapStateToProps = state => {
    console.log('map state', state);
    return {
      listStudents: get(state, 'studentsView.list.students'),
      specialities: get(state, 'studentsView.list.specialities'),
      groups: get(state, 'studentsView.list.groups'),
      loading: get(state, 'studentsView.list.loading')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudents: filter => {
            dispatch(getStudentsBySpecialityListActions.getStudentsBySpeciality(filter));
        },
        getAllStudentsBySpecialities: () => {
            dispatch(getAllStudentsBySpecialitiesListActions.getAllStudentsBySpecialities());
        },
        getGroups: filter => {
            dispatch(getGroupsBySpecialityListActions.getGroupsBySpeciality(filter));
        },
        getSpecialities: () => {
            dispatch(getSpecialitiesListActions.getSpecialities());
        },
        getStudentsByGroup: filter => {
            dispatch(getStudentsByGroupListActions.getStudentsByGroup(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentsView));