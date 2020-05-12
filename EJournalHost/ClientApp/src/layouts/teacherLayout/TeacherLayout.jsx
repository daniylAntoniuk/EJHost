import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import get from "lodash.get";
import {serverUrl} from '../../config';
import { logout } from '../../views/defaultViews/LoginPage/reducer';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../navs/_teacherNavs';
// routes config
import routes from '../../routes/teacherRoutes';


//const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const TeacherNavbar = React.lazy(() => import('./TeacherNavbar'));

class TeacherLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/')
  }
  

  render() {
    const {login} = this.props;
    console.log(login);
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
        if (roles[i] === 'Curator')
          isAccess = true;
        else if(roles[i] === 'Teacher')
          isAccess = true;
      }
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <TeacherNavbar onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/teacher" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        {/* <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: get(state, 'login')
  };
}

export default connect(mapStateToProps, { logout }) (TeacherLayout);

