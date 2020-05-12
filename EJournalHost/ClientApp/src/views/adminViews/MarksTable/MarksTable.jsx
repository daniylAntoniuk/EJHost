import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSpecListActions from './reducer';
import * as getGroupListActions from './reducer';
import * as getLessonsListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';

import './MarksTableStyle.css';
class MarksTable extends Component {
    state = {
        groupId: 0,
        specialityId: 0,
        subjectId: 0,
        rowsPerPage: 8,
        page: 0
    };
    mapBodyTable=(data)=> {
        let counter = 1;
        let countermark = 1;
        //const{page,rowsPerPage}=this.state;
        //console.log("body " + data.rows);
        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);
    
        const StyledTableRow = withStyles((theme) => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.background.default,
                },
            },
        }))(TableRow);
    
        if (data.rows != undefined) {
            return data.rows.map(item => {
    
                return (
                    <StyledTableRow key={counter}>
                        <StyledTableCell component="th" scope="row">{counter++}</StyledTableCell>
                        <StyledTableCell >{item.name}</StyledTableCell>
                        {
                            //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            item.marks.map(mark => {
                                return (
                                    <StyledTableCell key={countermark++} align="right">{mark.value}</StyledTableCell>
                                )
                            })
                        }
                    </StyledTableRow>
                )
            });
        }
    }

    mapHeadTable=(data)=> {
        //console.log("head " + data.columns);
        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);
    
        let counter = 1;
        if (data.columns != undefined) {
            return data.columns.map(function (item) {
                let al = "";
                if (counter > 2) {
                    al = "right";
                } else {
                    al = "left"
                }
                return (
                    <StyledTableCell key={counter++} align={al}>{item}</StyledTableCell>
                );
            });
        }
    }

    componentDidMount = () => {
        //const { groupId, specialityId, subjectId } = this.state;
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
        this.props.getLessons({ groupId });
    }
    changeSubj = (event) => {
        const subjectId = event.target.value;
        const { groupId } = this.state;
        this.setState({ subjectId: subjectId });
        this.props.getMarks({ groupId, subjectId });
    }
    handleChangePage = (event, newPage) => {
        this.setState({page:newPage});
    };

    
    render() {
        const { data, specialities, groups, lessons } = this.props;
        console.log("RENDER", data);

        return (
            <React.Fragment>
                <FormControl className="dropW mx-2 mt-3">
                    <InputLabel id="slabel">Speciality</InputLabel>
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
                    <InputLabel id="glabel">Griup</InputLabel>
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
                <FormControl className="dropW mx-2 mt-3">
                    <InputLabel id="llabel">Lesson</InputLabel>
                    <Select
                        labelId="llabel"
                        value={this.state.subjectId}
                        onChange={this.changeSubj}
                    >
                        {
                            lessons.map(item => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>

                <TableContainer className="mt-3" component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {this.mapHeadTable(data)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.mapBodyTable(data)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    hidden={(data.columns!==undefined)?false:true}
                    rowsPerPageOptions={8}
                    component="div"
                    count={(data.columns!==undefined)?data.columns.length-2:0}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: get(state, 'marks.list.data'),
        specialities: get(state, 'marks.list.specialities'),
        groups: get(state, 'marks.list.groups'),
        lessons: get(state, 'marks.list.lessons'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMarks: filter => {
            dispatch(getListActions.getMarks(filter));
        },
        getSpecialities: () => {
            dispatch(getSpecListActions.getSpecialities());
        },
        getGroups: filter => {
            dispatch(getGroupListActions.getGroups(filter));
        },
        getLessons: filter => {
            dispatch(getLessonsListActions.getLessons(filter));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksTable);
