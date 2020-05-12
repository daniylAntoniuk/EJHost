import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from "../../assets/logo3big.png";
import logoFull from "../../assets/logo3full.png";
import "./layoutStyle.css";
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminNavbar extends Component {
  render() {

    // eslint-disable-next-line
    const { children, image, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logoFull, height: 40, alt: "Ejournal Logo" }}
          minimized={{ src: logo, height: 40, alt: "Ejournal Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
        <MDBDropdown className="mr-3">
            <MDBDropdownToggle className="dopdown-toggle" nav>
              <img
                src={image}
                className="rounded-circle z-depth-0"
                alt=""
                id="profileImage"
              />
            </MDBDropdownToggle>
            <MDBDropdownMenu id="dropMenu1" className="dropdown-default" right>
              <MDBDropdownItem href="/#/admin/profile">
                <i className="ml-1 icon-user"></i> Мій профіль
              </MDBDropdownItem>
              <MDBDropdownItem href="/#/" onClick={e => this.props.onLogout(e)}>
                <i className="ml-1 icon-logout"></i> Вихід
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

AdminNavbar.propTypes = propTypes;
AdminNavbar.defaultProps = defaultProps;

export default AdminNavbar;
