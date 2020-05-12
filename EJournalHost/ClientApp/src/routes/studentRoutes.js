import React from 'react';

const Home = React.lazy(() => import('../views/studentViews/home/HomePage'));
const Marks = React.lazy(() => import('../views/studentViews/marks/Marks'));
const Timetable = React.lazy(() => import('../views/studentViews/timetable/Timetable'));
const MyProfile = React.lazy(() => import('../views/studentViews/profile/MyProfile'));
const Homework = React.lazy(() => import('../views/studentViews/homework/Homework'));
const News = React.lazy(() => import('../views/studentViews/news/News'));
const Error = React.lazy(() => import('../views/studentViews/Error/Error404'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/student', exact: true, name: 'Home', component: Home },
  { path: '/student/marks', exact: true, name: 'Marks', component: Marks },
  { path: '/student/timetable', exact: true, name: 'Timetable', component: Timetable },
  { path: '/student/profile', exact: true, name: 'My profile', component: MyProfile },
 // { path: '/student/homework/:subject/:date?', exact: true, name: 'Homework', component: Homework },
  { path: '/student/homework', exact: true, name: 'Homework', component: Homework },
  { path: '/student/news', exact: true, name: 'News', component: News },
  { path: '/student/404', exact: true, name: '404', component: Error },
];

export default routes;