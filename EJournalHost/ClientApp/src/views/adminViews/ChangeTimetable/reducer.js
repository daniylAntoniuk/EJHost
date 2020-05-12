import ChangeTimetableService from './ChangeTimetableService';
import update from '../../../helpers/update';
export const CHANGE_TIMETABLE_STARTED = "CHANGE_TIMETABLE_STARTED";
export const CHANGE_TIMETABLE_SUCCESS = "CHANGE_TIMETABLE_SUCCESS";
export const CHANGE_TIMETABLE_SUCCESS_TEACHERS = "CHANGE_TIMETABLE_SUCCESS_TEACHERS";
export const CHANGE_TIMETABLE_SUCCESS_GROUPS = "CHANGE_TIMETABLE_SUCCESS_GROUPS";
export const CHANGE_TIMETABLE_SUCCESS_SUBJECTS = "CHANGE_TIMETABLE_SUCCESS_SUBJECTS";
export const CHANGE_TIMETABLE_SUCCESS_AUD = "CHANGE_TIMETABLE_SUCCESS_AUD";
export const CHANGE_TIMETABLE_FAILED = "CHANGE_TIMETABLE_FAILED";


const initialState = {
    list: {
        data: [],
        teachers:[],
        groups:[],
        subjects:[],
        auditories:[],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getTeachers = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ChangeTimetableService.getTeachers()
            .then((response) => {
                dispatch(getListActions.successTeachers(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}
export const getGroups = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ChangeTimetableService.getGroups(model)
            .then((response) => {
                dispatch(getListActions.successGroups(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}
export const getSubjects = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ChangeTimetableService.getSubjects(model)
            .then((response) => {
                dispatch(getListActions.successSubjects(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}
export const getAuditoriums = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ChangeTimetableService.getAuditoriums(model)
            .then((response) => {
                //console.log("RES",response);
                dispatch(getListActions.successAud(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response.data));
            });
    }
}
export const save = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ChangeTimetableService.save(model)
            .then((response) => {
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response.data));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: CHANGE_TIMETABLE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: CHANGE_TIMETABLE_SUCCESS,
            payload: data
        }
    },  
    successTeachers: (data) => {
        return {
            type: CHANGE_TIMETABLE_SUCCESS_TEACHERS,
            payload: data.data
        }
    },  
    successGroups: (data) => {
        return {
            type: CHANGE_TIMETABLE_SUCCESS_GROUPS,
            payload: data.data
        }
    },
    successSubjects: (data) => {
        return {
            type: CHANGE_TIMETABLE_SUCCESS_SUBJECTS,
            payload: data.data
        }
    },
    successAud: (data) => {
        return {
            type: CHANGE_TIMETABLE_SUCCESS_AUD,
            payload: data.data
        }
    },
    failed: (error) => {
        return {           
            type: CHANGE_TIMETABLE_FAILED,
            errors: error
        }
    }
  }

export const changeTimetableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case CHANGE_TIMETABLE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case CHANGE_TIMETABLE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case CHANGE_TIMETABLE_SUCCESS_TEACHERS: {
        newState = update.set(state, 'list.loading', false);
        newState = update.set(newState, 'list.failed', false);
        //newState = update.set(newState, 'list.success', true);
        newState = update.set(newState, 'list.teachers', action.payload);         
        break;
    }
    case CHANGE_TIMETABLE_SUCCESS_GROUPS: {
        newState = update.set(state, 'list.loading', false);
        newState = update.set(newState, 'list.failed', false);
        //newState = update.set(newState, 'list.success', true);
        newState = update.set(newState, 'list.groups', action.payload);         
        break;
    }
    case CHANGE_TIMETABLE_SUCCESS_SUBJECTS: {
        newState = update.set(state, 'list.loading', false);
        newState = update.set(newState, 'list.failed', false);
        //newState = update.set(newState, 'list.success', true);
        newState = update.set(newState, 'list.subjects', action.payload);         
        break;
    }
    case CHANGE_TIMETABLE_SUCCESS_AUD: {
        newState = update.set(state, 'list.loading', false);
        newState = update.set(newState, 'list.failed', false);
        //newState = update.set(newState, 'list.success', true);
        newState = update.set(newState, 'list.auditories', action.payload);         
        break;
    }
      case CHANGE_TIMETABLE_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          newState = update.set(newState, "list.errors", action.errors);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}