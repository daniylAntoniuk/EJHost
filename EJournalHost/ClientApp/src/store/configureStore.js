import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory';

///reducers
import {personsChartReducer} from '../views/adminViews/PersonsChart/reducer';
import {commentsChartReducer} from '../views/adminViews/CommentsChart/reducer';
import {loginReducer} from '../views/defaultViews/LoginPage/reducer';
import {studentTableReducer} from '../views/adminViews/StudentsTable/reducer';
import {teachersTableReducer} from '../views/adminViews/TeachersTable/reducer';
import {marksTableReducer} from '../views/adminViews/MarksTable/reducer';
import {addStudentReducer} from '../views/adminViews/AddStudent/reducer';
import {timetableReducer} from '../views/studentViews/timetable/reducer';
import {changePasswordReducer} from '../components/ChangePassword/reducer';
import {changeImageReducer} from '../components/ChangeImage/reducer';
import {profileReducer} from '../components/Profile/reducer';
import {studentHomePageReducer} from '../views/studentViews/home/reducer';
import {addTeacherReducer} from '../views/adminViews/AddTeacher/reducer';
import {homeworkReducer} from '../views/studentViews/homework/reducer';
import {newsReducer} from '../views/studentViews/news/reducer';
import {GetSubjectReducer} from '../views/teacherViews/GetMarksPage/reducer';
import {getGroupsReducer} from '../views/adminViews/GetGroups/reducer';
import {loadDistributionReducer} from '../views/adminViews/LoadDistribution/reducer';
import {loadDistributionDataReducer} from '../components/loadDistribution/reducer';
import {addNewsReducer} from '../views/adminViews/AddNews/reducer';
import {groupNewsReducer} from '../components/groupNews/reducer';
import {adminNewsReducer} from '../views/adminViews/News/reducer';
import {addGroupReducer} from '../views/adminViews/AddGroup/reducer';
import {changeTimetableReducer} from '../views/adminViews/ChangeTimetable/reducer';
import {setMarksReducer} from '../views/teacherViews/SetMarks/reducer';
import {studentViewReducer} from '../views/managerViews/students/reducer';
import {seestudentscardsReducer} from '../views/teacherViews/SeeStudentsCards/reducer';
import {teacherTimetableReducer} from '../views/teacherViews/timetable/reducer';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    persons: personsChartReducer,
    comments: commentsChartReducer,
    login: loginReducer,
    students: studentTableReducer,
    teachers:teachersTableReducer,
    marks:marksTableReducer,
    timetable: timetableReducer,
    password: changePasswordReducer,
    changeImage: changeImageReducer,
    profile:profileReducer,
    studentHome:studentHomePageReducer,
    addStudent:addStudentReducer,
    addTeacher:addTeacherReducer,
    homework:homeworkReducer,
    groupNews:groupNewsReducer,
    news:newsReducer,
    getSubject:GetSubjectReducer,
    getGroups:getGroupsReducer,
    loadDistribution:loadDistributionReducer,
    loadDistributionData:loadDistributionDataReducer,
    addNews:addNewsReducer,
    adminNews:adminNewsReducer,
    getLessons:teacherTimetableReducer,
    
    seeStudentsCards:seestudentscardsReducer,
    setMarks:setMarksReducer,
    changeTimetable:changeTimetableReducer,
    addGroup:addGroupReducer,
    setMarks:setMarksReducer,
    studentsView:studentViewReducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }



  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}