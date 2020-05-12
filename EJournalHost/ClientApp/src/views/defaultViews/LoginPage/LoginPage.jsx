import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from "react-redux";
import * as loginActions from './reducer';
import get from "lodash.get";
import Background from "../../../assets/images/back2.jpg";
import "../../../assets/css/loginStyle.css";

import {
  FormHelperText
} from '@material-ui/core';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
  } from "mdbreact";

function LoadErrors(err){
  if(typeof err!='object'){
    return(
    <FormHelperText error>{err}</FormHelperText>
    )
  }
}
class Login extends Component {

  state = {
    email: '',
    password: '',
    profileUrl: '',
    errors: {},
    done: false,
    isLoading: false,
    errorsServer: '',
    iconInput: 'eye-slash',
    typeInput: 'password'
  }

  mouseEnter = () => {
    this.setState({
      iconInput: 'eye',
      typeInput: 'text'
    });
  };

  mouseLeave = () => {
    this.setState({
      iconInput: 'eye-slash',
      typeInput: 'password'
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
  
    return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
  }

  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState(
        {
          [name]: value,
          errors
        }
      )
    }
    else {
      this.setState(
        { [name]: value })
    }
  }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);

  }
  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log("onSubmitForm", this.state);

    let errors = {};

    if (email === '') errors.email = "Поле є обов'язковим";

    if (password === '') errors.password = "Поле є обов'язковим";

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      this.setState({ isLoading: true });
      const model = {
        email: email,
        password: password
        };

      this.props.login(model, this.props.history);     
    }
    else {
      this.setState({ errors });
    }
  }
  
  render() {
    const { iconInput, typeInput } = this.state;
    const { errors, isLoading, profileUrl, visible, errorsServer } = this.state;
                     
    const form = (
   <div className="main-div background-image" style={{backgroundImage:"url("+Background+")"}}> 
<MDBContainer >
  <MDBRow style={{height: '100vh' }} className="justify-content-center align-items-center">
    <MDBCol md="5">
      <form onSubmit={this.onSubmitForm}>
        <p className="h5 text-center mb-4">Увійти</p>
        {LoadErrors(errorsServer)}
        <div className="grey-text">
          <MDBInput label="Електронна пошта" 
          icon="envelope" 
          group type="email" 
          validate error="wrong"
            success="right" 
            id="email"
            name="email"
            required
            onChange={this.handleChange}/>         
              <MDBInput
                label='Пароль'
                validate
                id="password"
                name="password"
                type={typeInput}
                icon={iconInput}
                required
                onIconMouseEnter={this.mouseEnter}
                onIconMouseLeave={this.mouseLeave}
                onChange={this.handleChange}
              />
        </div>
        <div className="text-center">
          <MDBBtn gradient="aqua" type="submit" color='primary'>Вхід</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
</div>
    );
    return (
       form
    );
  }
}

Login.propTypes =
  {
    login: PropTypes.func.isRequired
  }

function mapStateToProps(state) {
  return {
    loading: get(state, 'login.post.loading'),
    failed: get(state, 'login.post.failed'),
    success: get(state, 'login.post.success'),
    errors: get(state, 'login.post.errors')
  }
}

const mapDispatch = {
  login: (model, history) => {
      return loginActions.login(model, history);
  }
}

export default connect(mapStateToProps, mapDispatch)(Login);
