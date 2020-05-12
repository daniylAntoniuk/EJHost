import React, { Component, Suspense } from 'react';
import SideBar from "./StudentSideBar";
import {Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes/adminRoutes";
import { connect } from "react-redux";
import get from "lodash.get";
import {serverUrl} from '../../config';
import { logout } from '../../views/defaultViews/LoginPage/reducer';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

const StudentNavbar = React.lazy(() => import('./StudentNavbar'));
class StudentLayout extends React.Component {
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //   }

    signOut(e) {
      e.preventDefault()
      this.props.logout();
      this.props.history.push('/')
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
render() {
    const { login } = this.props;
    //console.log(login);
    let isAccess = false;
    if(login.isAuthenticated===undefined){
        return (
            <Redirect to="/" />  
          );
    }
    if(login.isAuthenticated)
    {
      const { roles } = login.user;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'Student')
          isAccess = true;
      }
    }
    const content = (
      <div className="app">
         <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <StudentNavbar onLogout={e=>this.signOut(e)}
                            image={`${serverUrl}UsersImages/50_${login.user.image}`}/>
          </Suspense>
        </AppHeader>
        <SideBar></SideBar>
      </div>
        
    )
    return (
      isAccess ? 
      content
        : <Redirect to="/" />  
    );
  }
}
const mapStateToProps = (state) => {
    return {
      login: get(state, 'login')
    };
  }
  
  export default connect(mapStateToProps, { logout }) (StudentLayout);

