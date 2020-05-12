import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import './App.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage"));

const StudentLayout=React.lazy(()=>import("./layouts/studentLayout/StudentLayout"));

// Layouts
const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));
const TeacherLayout = React.lazy(()=> import("./layouts/teacherLayout/TeacherLayout"));
const ManagerLayout = React.lazy(() => import("./layouts/managerLayout/ManagerLayout"))


//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
class App extends Component {

  state = {
    isLoading: false,
    isError: false
  }

  render() { 
    return (
      <Router>  
      <Suspense fallback={ <div>Загрузка...</div> }>
        <Switch>
          <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
          <Route exact path="/" name="Login" render={ props => <LoginPage { ...props } /> } />
          <Route path="/student" name="Student" render={ props => <StudentLayout { ...props } /> } />
          <Route path="/teacher" name="Teacher" render={props => <TeacherLayout {...props} />}/>
          <Route path="/manager" name="Manager" render={props => <ManagerLayout {...props} />}/>

          
        </Switch>
      </Suspense>
      </Router> 
    );
  }
};

export default App;