import React from 'react';

const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
const StudentsView = React.lazy(() => import('../views/managerViews/students/StudentsView'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/manager', exact: true, name: 'Login', component: Login },
  { path: '/manager/students', exact: true, component: StudentsView },
];

export default routes;