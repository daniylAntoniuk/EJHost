import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    accent: {
        color: '#009688'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
})

class SpecialitiesSelect extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {specialityId: ''}
    }    

    handleChange(e) {
        this.setState({speciality: e.target.value});
    }

    menuItem = () => {
        const { specialitiesList } = this.props;
        return (specialitiesList.map(function (el) {
            return (
                <MenuItem key = {el.id}>
                    {el.name}
                </MenuItem>
            );
        }))
    }

    render(){
        const { classes, children, specialitiesList , ...attributes } = this.props;
        console.log('spec', specialitiesList);
        return(
            <React.Fragment>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Спеціальність</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            onChange={this.handleChange}                    
                        >
                            {this.menuItem()}
                        </Select>
                    <FormHelperText className={classes.accent}>Оберіть спеціальність</FormHelperText>
                </FormControl>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SpecialitiesSelect);