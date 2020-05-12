import React from 'react';
import Grid from '@material-ui/core/Grid';
import StudentCard from '../StudentCard/StudentCard'


export class StudentCardList extends React.Component {
    state = {}

    card = () => {
        const { studentList } = this.props;
        return (studentList.map(function (el) {
            return (
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <StudentCard key = {el.id} student={el} />
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

export default StudentCardList;