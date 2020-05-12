import React from 'react';

//const Login = React.lazy(() => import('../views/defaultViews/LoginPage'));
// const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart'));
// const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));
const StudentsTable = React.lazy(() => import('../views/adminViews/StudentsTable'));
const TeachersTable = React.lazy(() => import('../views/adminViews/TeachersTable'));
const MarksTable = React.lazy(() => import('../views/adminViews/MarksTable'));
const AddStudent = React.lazy(() => import('../views/adminViews/AddStudent'));
const AddTeacher = React.lazy(() => import('../views/adminViews/AddTeacher'));
const MyProfile = React.lazy(() => import('../views/adminViews/Profile/MyProfile'));
const GetGroups = React.lazy(() => import('../views/adminViews/GetGroups'));
const AddGroup = React.lazy(() => import('../views/adminViews/AddGroup'));
const LoadDistribution = React.lazy(() => import('../views/adminViews/LoadDistribution'));
const AddNews = React.lazy(() => import('../views/adminViews/AddNews/AddNews'));
const News = React.lazy(() => import('../views/adminViews/News'));
const Error = React.lazy(() => import('../views/adminViews/Error/Error404'));
const ChangeTimetable = React.lazy(() => import('../views/adminViews/ChangeTimetable'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  //{ path: '/admin/students', exact: true, name: 'Students', component: StudentsTable },
  { path: '/admin/students/:groupId?', exact: true, name: 'Students', component: StudentsTable },
  { path: '/admin/teachers', exact: true, name: 'Teachers', component: TeachersTable },
  { path: '/admin/marks', exact: true, name: 'Marks', component: MarksTable },
  //{ path: '/admin/addstudent', exact: true, name: 'AddStudent', component: AddStudent },
  { path: '/admin/addstudent/:groupId?', exact: true, name: 'AddStudent', component: AddStudent },
  { path: '/admin/addteacher', exact: true, name: 'AddTeacher', component: AddTeacher },
  { path: '/admin/getgroups', exact: true, name: 'GetGroups', component: GetGroups },
  { path: '/admin/addgroup', exact: true, name: 'AddGroup', component: AddGroup },
  { path: '/admin/load-distribution', exact: true, name: 'LoadDistribution', component: LoadDistribution },
  { path: '/admin/add-news', exact: true, name: 'AddNews', component: AddNews },
  { path: '/admin/news', exact: true, name: 'News', component: News },
  { path: '/admin/404', exact: true, name: '404', component: Error },
  { path: '/admin/profile', exact: true, name: 'Profile', component: MyProfile },
  { path: '/admin/change-timetable', exact: true, name: 'ChangeTimetable', component: ChangeTimetable },
];

export default routes;