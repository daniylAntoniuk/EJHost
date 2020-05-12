import React, { useState } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  FormHelperText
} from '@material-ui/core';

class Password extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    oldPassword:'',
    error:''       
  }
  onSubmitForm = (e) => {
    e.preventDefault();
    const { confirmPassword, password,oldPassword } = this.state;
    let mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-=+!@#\$%\^&\*])(?=.{8,})");

     if (password === ''||confirmPassword === ''||oldPassword==='') {
      this.setState({error:"Введіть всі данні"});
    }
    else if(!mediumRegex.test(password)){
              this.setState({error:"Оберіть складніший пароль"});
            }
      else if (password !== confirmPassword) {
        this.setState({error:"Паролі не збігаються"});
       }
       else{
      this.setState({ isLoading: true });
      this.setState({error:""});
      const model = {
        confirmPassword: confirmPassword,
        password: password,
        oldPassword:oldPassword
        };
        this.props.changePassword({model});
      }  
  }
  render(){
    const {errors,allDone}= this.props;
    
    const {error}= this.state;
      return (
        <Card className="mt-3 mr-3">
          <form onSubmit={this.onSubmitForm}>
            <CardHeader              
              title="Зміна пароля"
              
            />
            <Divider />
            <CardContent>
            <TextField
                fullWidth
                error={errors}
                required
                onChange={(e) => { this.setState({oldPassword: e.target.value})}}
                label="Старий пароль"
                name="oldpassword"           
                type="password"
                variant="outlined"
              />
              <FormHelperText error>{errors}</FormHelperText>
              <TextField
                fullWidth
                style={{ marginTop: '1rem' }}
                error={error}
                required
                onChange={(e) => { this.setState({password: e.target.value})}}
                label="Пароль"
                name="password"           
                type="password"
                variant="outlined"
              />
              <TextField
                onChange={(e) => {this.setState({confirmPassword: e.target.value})}}
                fullWidth
                required
                error={error}
                label="Підтвердіть пароль"
                name="confirm"
                style={{ marginTop: '1rem' }}
                type="password"
                variant="outlined"
              />
              <FormHelperText error>{error}</FormHelperText>
            </CardContent>
            <Divider />
            <CardActions>
              <div className="d-flex flex-column">         
              <FormHelperText>{allDone}</FormHelperText>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
              >
                Змінити
              </Button>
              
              
              </div>
            </CardActions>
          </form>
        </Card>
      );
    
  
}
};
const mapStateToProps = state => {
  return {
    errors: get(state, 'password.list.errors'),
    allDone: get(state, 'password.list.data')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      changePassword: filter => {
        dispatch(getListActions.changePassword(filter));
    }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Password);

