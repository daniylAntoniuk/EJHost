import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {Redirect, Route, Switch } from "react-router-dom";
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import get from "lodash.get";
import {serverUrl} from '../../config';
import { logout } from '../../views/defaultViews/LoginPage/reducer';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/logo3big.png'
import sygnet from '../../assets/logo3big.png'
import "./sideBarStyle.css";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class TeacherNavbar extends Component {

  // signOut(e) {
  //   e.preventDefault()
  //   this.props.history.push('/login')
  // }
  render() {
    const { login } = this.props;
    // console.log(login);
    // let isAccess = false;
    // if(login.isAuthenticated===undefined){
    //     return (
    //         <Redirect to="/login" />  
    //       );
    // }
    // if(login.isAuthenticated)
    // {
    //   const { roles } = login.user;
    //   for (let i = 0; i < roles.length; i++) {
    //     if (roles[i] === 'Curator')
    //       isAccess = true;
    //     else if(roles[i] === 'Teacher')
    //       isAccess = true;
    //   }
    // }
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 60, height: 40, alt: 'Logo' }}
          minimized={{ src: sygnet, width: 60, height: 40, alt: 'Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav> */}
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={`${serverUrl}UsersImages/50_${login.user.image}`} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem> */}
              {/* <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              <DropdownItem href="/#/teacher/profile"><i className="fa fa-user"></i>Мій профіль</DropdownItem>
              {/* <DropdownItem divider /> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: get(state, 'login')
  };
}

TeacherNavbar.propTypes = propTypes;
TeacherNavbar.defaultProps = defaultProps;

//export default TeacherNavbar;
export default connect(mapStateToProps, { logout }) (TeacherNavbar);
